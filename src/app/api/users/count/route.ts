import { NextRequest, NextResponse } from "next/server";
import { NotificationEventEnum } from "@/lib/types/notification-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const event = searchParams.get("event");

  if (!event) {
    return NextResponse.json({ error: "Event is required" }, { status: 400 });
  }

  try {
    NotificationEventEnum.parse(event);

    // Here you would query your database to get the actual count
    // For now returning dummy data
    const count = Math.floor(Math.random() * 100) + 1;

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }
}
