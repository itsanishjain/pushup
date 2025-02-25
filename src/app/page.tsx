import { Suspense } from "react";
import NotificationForm from "@/components/NotificationForm";
import { db } from "@/lib/db"; // Assuming you have this setup
import { NotificationEventEnum } from "@/lib/types/notification-api";
import Link from "next/link";

async function getUserCountByEvent(event: string) {
  // This would be your actual DB query
  // For now returning dummy data
  return 10;
}

export default async function DashboardPage() {
  // Fetch initial data
  const events = Object.values(NotificationEventEnum.enum);
  const initialUserCount = await getUserCountByEvent(events[0]);

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
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationForm
            events={events}
            initialUserCount={initialUserCount}
          />
        </Suspense>
      </main>
    </div>
  );
}
