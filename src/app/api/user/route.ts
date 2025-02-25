import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { UserCreateSchema, UpdateUserSchema } from "@/lib/types/user-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = UserCreateSchema.parse(body);

    const newUser = await db.insert(users).values({
      id: userId,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, expoPushToken, platform } = UpdateUserSchema.parse(body);

    const updatedUser = await db
      .update(users)
      .set({
        expo_push_token: expoPushToken,
        platform: platform,
      })
      .where(eq(users.id, userId));

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
