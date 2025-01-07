"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const { mutate } = api.auth.register.useMutation();
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setClientError("");

    try {
      const res = mutate({ email, password });
      console.log(res);
    } catch (error: unknown) {
      setClientError(error as string);
    }
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>
    </main>
  );
}
