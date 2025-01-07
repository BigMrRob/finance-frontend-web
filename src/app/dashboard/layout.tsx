// File: src/app/dashboard/layout.tsx

import "@/styles/globals.css"; // Ensure Tailwind + shadcn styles are included

// Example shadcn-ui components (adjust imports to match your setup)
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Navigation or Header */}
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        <Button variant="secondary" size="sm">
          Log Out
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Finance App. All rights reserved.
      </footer>
    </div>
  );
}
