import { NextRequest, NextResponse } from "next/server";
import QUERIES from "@/lib/queries";
import { NotificationEventEnum } from "@/lib/types/notification-api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const event = searchParams.get("event");

    if (
      !event ||
      !Object.values(NotificationEventEnum.enum).includes(event as any)
    ) {
      return NextResponse.json(
        { error: "Invalid event parameter" },
        { status: 400 }
      );
    }

    const count = await QUERIES.getUserCountByEvent(event);
    return NextResponse.json({ count });
  } catch (error) {
    console.error("[GET_USER_COUNT]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
