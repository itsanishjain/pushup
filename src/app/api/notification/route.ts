import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/drizzle/schema";
import { NotificationCreateSchema } from "@/lib/types/notification-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, event, message, status } =
      NotificationCreateSchema.parse(body);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newNotification = await db.insert(notifications).values({
      user_id: userId,
      event_type: event,
      message: message,
      status: status,
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
