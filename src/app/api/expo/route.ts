import { NextRequest, NextResponse } from "next/server";
import {
  NotificationRequestSchema,
  ExpoNotificationSchema,
} from "@/lib/types/notification-api";

const EXPO_API_URL = "https://exp.host/--/api/v2/push/send";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, message } = NotificationRequestSchema.parse(body);

    // Here you would fetch users with their expo tokens based on the event
    // For now using dummy data
    const userTokens = ["ExponentPushToken[xxx]"]; // This should come from your DB

    const notifications = userTokens.map((token) => ({
      to: token,
      title: event,
      body: message,
    }));

    // Send notifications to Expo
    const responses = await Promise.all(
      notifications.map((notification) =>
        fetch(EXPO_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ExpoNotificationSchema.parse(notification)),
        })
      )
    );

    return NextResponse.json({
      success: true,
      sent: notifications.length,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
