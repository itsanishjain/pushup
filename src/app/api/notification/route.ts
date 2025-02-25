import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/drizzle/schema";
import { NotificationCreateSchema } from "@/lib/types/notification-api";
import { getCookieFromHeader } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const userId = getCookieFromHeader("user_id", headers().get("cookie"));

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const notification = NotificationCreateSchema.parse(body);

    const newNotification = await db.insert(notifications).values({
      user_id: userId,
      event: notification.event,
      message: notification.message,
      status: notification.status,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error("[CREATE_NOTIFICATION]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
