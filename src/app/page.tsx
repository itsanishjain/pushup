"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  // Example state for creating a notification
  const [event, setEvent] = React.useState("app_opened");
  const [message, setMessage] = React.useState("");

  // This would be replaced with your API call
  const handleTriggerNotification = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event, message }),
      });
      if (res.ok) {
        alert("Notification triggered!");
      } else {
        alert("Error triggering notification");
      }
    } catch (error) {
      console.error(error);
      alert("Error triggering notification");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            href="/dashboard/notifications"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Notifications
          </Link>
          {/* Add more navigation links as needed */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Trigger Notification</h1>
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
              onChange={(e) => setEvent(e.target.value)}
            >
              <option value="app_opened">App Opened</option>
              <option value="streak_missed">Streak Missed</option>
              <option value="goal_achieved">Goal Achieved</option>
              <option value="inactive_user">Inactive User</option>
              <option value="custom_event">Custom Event</option>
            </select>
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
          <Button type="submit" className="mt-4">
            Trigger Notification
          </Button>
        </form>
      </main>
    </div>
  );
}
