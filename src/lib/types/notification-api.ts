import { z } from "zod";

// Define possible notification events
export const NotificationEventEnum = z.enum([
  "app_opened",
  "streak_missed",
  "goal_achieved",
  "inactive_user",
  "custom_event",
]);

export const ExpoPushTokenSchema = z.object({
  token: z.string().startsWith("ExponentPushToken["),
});

export const UserNotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expoPushToken: z.string(),
  event: NotificationEventEnum,
  lastActive: z.date(),
});

export const NotificationRequestSchema = z.object({
  event: NotificationEventEnum,
  message: z.string(),
});

export const ExpoNotificationSchema = z.object({
  to: z.string(),
  title: z.string(),
  body: z.string(),
});

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

export type NotificationRequest = z.infer<typeof NotificationRequestSchema>;
export type ExpoNotification = z.infer<typeof ExpoNotificationSchema>;
export type UserNotification = z.infer<typeof UserNotificationSchema>;
