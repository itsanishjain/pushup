import { NextRequest, NextResponse } from "next/server";
import { Expo } from "expo-server-sdk";

import { NotificationRequestSchema } from "@/lib/types/notification-api";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Create a new Expo SDK client
const expo = new Expo({ useFcmV1: true });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, message } = NotificationRequestSchema.parse(body);

    // Get active users with expo tokens
    const activeUsers = await db.query.users.findMany({
      where: eq(users.is_active, 1),
    });

    console.log(activeUsers);

    const userTokens = activeUsers
      .map((user) => user.expo_push_token)
      .filter((token) => token && Expo.isExpoPushToken(token)) as string[];

    // Construct messages
    const messages = userTokens.map((token) => ({
      to: token,
      sound: "default",
      title: event,
      body: message,
      data: { event },
    }));

    // Split messages into chunks
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    // Send notifications
    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending notification chunk:", error);
      }
    }

    // Get receipts
    const receiptIds = tickets
      .filter((ticket) => ticket.status === "ok")
      .map((ticket) => ticket.id);

    const receiptChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    // Process receipts
    for (let chunk of receiptChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const [receiptId, receipt] of Object.entries(receipts)) {
          if (receipt.status === "error") {
            console.error(
              `Error for receipt ${receiptId}:`,
              receipt.message,
              receipt.details?.error
            );
          }
        }
      } catch (error) {
        console.error("Error checking receipts:", error);
      }
    }

    return NextResponse.json({
      success: true,
      sent: tickets.length,
      receipts: receiptIds.length,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
