// File: src/app/dashboard/page.tsx

"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: logout } = api.auth.logout.useMutation({
    onSuccess: () => {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    },
  });

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={() => logout()}>
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
          <CardDescription>Manage your finances effortlessly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-500">
            This is your overview. Use the navigation or shortcuts to explore
            your account details, budgets, and more.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
