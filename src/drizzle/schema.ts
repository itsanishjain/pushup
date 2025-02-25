import { sql, relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  email: text("email").unique(),
  last_login: integer("last_login"),
  is_active: integer("is_active").default(1),
  expo_push_token: text("expo_push_token"),
  platform: text("platform"),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Notifications table to store notification events and statuses
export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }), // foreign key to users
  event_type: text("event_type"), // e.g., "app_opened", "streak_missed"
  message: text("message"),
  status: text("status"), // e.g., "pending", "sent", "failed"
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// create a relation between users and notifications
export const userRelations = relations(users, ({ many }) => ({
  notifications: many(notifications),
}));

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.user_id],
    references: [users.id],
  }),
}));
