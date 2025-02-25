import { z } from "zod";

// Define possible notification events
export const NotificationEventEnum = z.enum([
  "app_opened",
  "streak_missed",
  "goal_achieved",
  "inactive_user",
  "custom_event",
]);

export const NotificationCreateSchema = z.object({
  userId: z.string(),
  event: NotificationEventEnum, // Use enum for predefined events
  message: z.string(),
  status: z.enum(["unread", "read"]).default("unread"),
});

export type NotificationCreate = z.infer<typeof NotificationCreateSchema>;

export const NotificationResponseSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  event: NotificationEventEnum, // Ensure consistency with create schema
  message: z.string(),
  status: z.enum(["unread", "read"]),
  created_at: z.number(), // Assuming timestamps are stored as epoch numbers
  updated_at: z.number(),
});

export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;
