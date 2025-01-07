// File: src/app/(auth)/register/page.tsx

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

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");

  const { mutate } = api.auth.register.useMutation({
    onError: (error) => {
      setClientError(error.message ?? "An error occurred");
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message ?? "An error occurred during registration",
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration successful!",
        description: "Welcome to our platform.",
      });
      router.push("/dashboard");
    },
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setClientError("");

    mutate({ email, password });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Start managing your finances today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                placeholder="john@apple.com"
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
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login here
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
