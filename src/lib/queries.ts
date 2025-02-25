import { db } from "@/lib/db";
import { users, notifications } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

const QUERIES = {
  // User queries
  getUserCountByEvent: async (event: string) => {
    console.log(event);
    try {
      const count = await db.query.notifications.findMany({
        with: {
          user: true,
        },
        where: eq(notifications.event_type, event),
      });
      console.log(count);
      return count.length;
    } catch (error) {
      console.error(error);
      return 0;
    }
  },

  getUser: async (userId: string) => {
    return await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  },

  getAllUsers: async () => {
    return await db.query.users.findMany({
      orderBy: desc(users.created_at),
    });
  },

  getActiveUsers: async () => {
    return await db.query.users.findMany({
      where: eq(users.is_active, 1),
    });
  },

  // Notification queries
  getUserNotifications: async (userId: string) => {
    return await db.query.notifications.findMany({
      where: eq(notifications.user_id, userId),
      orderBy: desc(notifications.created_at),
    });
  },

  getUnreadNotifications: async (userId: string) => {
    return await db.query.notifications.findMany({
      where: eq(notifications.user_id, userId),
      orderBy: desc(notifications.created_at),
    });
  },

  getNotificationsByEvent: async (event: string) => {
    return await db.query.notifications.findMany({
      where: eq(notifications.event_type, event),
      orderBy: desc(notifications.created_at),
    });
  },

  // Platform specific queries
  getUsersByPlatform: async (platform: string) => {
    return await db.query.users.findMany({
      where: eq(users.platform, platform),
    });
  },

  // Combined queries
  getUserWithNotifications: async (userId: string) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    const notificationsResponse = await db.query.notifications.findMany({
      where: eq(notifications.user_id, userId),
      orderBy: desc(notifications.created_at),
    });

    return { user, notifications: notificationsResponse };
  },
};

export default QUERIES;
export type Queries = {
  [K in keyof typeof QUERIES]: Awaited<ReturnType<(typeof QUERIES)[K]>>;
};
