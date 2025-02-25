"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NotificationEventEnum,
  NotificationRequestSchema,
} from "@/lib/types/notification-api";
import type { z } from "zod";

interface NotificationFormProps {
  events: z.infer<typeof NotificationEventEnum>[];
  initialUserCount: number;
}

export default function NotificationForm({
  events,
  initialUserCount,
}: NotificationFormProps) {
  const [event, setEvent] = React.useState<
    z.infer<typeof NotificationEventEnum>
  >(events[0]);
  const [message, setMessage] = React.useState("");
  const [userCount, setUserCount] = React.useState(initialUserCount);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUserCount = async () => {
      const res = await fetch(`/api/user/count?event=${event}`);
      if (res.ok) {
        const data = await res.json();
        setUserCount(data.count);
      }
    };
    fetchUserCount();
  }, [event]);

  const handleTriggerNotification = async () => {
    try {
      setIsLoading(true);
      const payload = NotificationRequestSchema.parse({ event, message });
      const res = await fetch("/api/expo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`Notification sent to ${userCount} users!`);
      } else {
        alert("Error triggering notification");
      }
    } catch (error) {
      console.error(error);
      alert("Error triggering notification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        handleTriggerNotification();
      }}
    >
      <div className="flex flex-col">
        <label htmlFor="event" className="mb-1 font-medium">
          Event Type
        </label>
        <select
          id="event"
          className="p-2 border rounded"
          value={event}
          onChange={(e) =>
            setEvent(e.target.value as z.infer<typeof NotificationEventEnum>)
          }
        >
          {events.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-600">
          This will notify {userCount} users
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="mb-1 font-medium">
          Message
        </label>
        <Input
          id="message"
          placeholder="Enter notification message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? "Sending..." : "Trigger Notification"}
      </Button>
    </form>
  );
}
