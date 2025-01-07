// File: src/app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// shadcn-ui components (e.g., Card, Input, Label, Button)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");

  // Access the tRPC login mutation
  const { mutate } = api.auth.login.useMutation({
    onError: (error) => {
      setClientError(error.message);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message ?? "Invalid credentials",
      });
    },
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "Login successful.",
      });
      router.push("/dashboard");
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setClientError("");
    mutate({ email, password });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please enter your credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {clientError && (
              <p className="text-sm font-medium text-red-600">{clientError}</p>
            )}

            <Button type="submit" variant="default" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register here
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
