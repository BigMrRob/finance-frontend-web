"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");

  // 1. Access the tRPC login mutation
  const { mutate } = api.auth.login.useMutation({
    onError: (error) => {
      // 2. If an error occurs (e.g., invalid credentials), show it in the UI
      setClientError(error.message);
    },
    onSuccess: (data) => {
      // 3. If successful, you might store a token in state, redirect, etc.
      console.log("Login successful!", data);
    },
  });

  // 4. Handle form submission
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setClientError("");

    mutate({ email, password });
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {clientError && <p style={{ color: "red" }}>{clientError}</p>}

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
