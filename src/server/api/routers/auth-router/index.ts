import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { nestLogin } from "./nest-login";

const NEST_URL = env.NEXT_PUBLIC_NEST_URL;

interface NestAuthResponse {
  data: {
    accessToken: string;
  };
}

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const res = await axios.post<NestAuthResponse>(
          `${NEST_URL}/auth/register`,
          input,
          { withCredentials: true },
        );
        return res.data;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Registration failed",
        });
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await nestLogin(input.email, input.password);
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }
    }),

  logout: publicProcedure.mutation(async () => {
    try {
      await axios.post(
        `${NEST_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to logout",
      });
    }
  }),
});
