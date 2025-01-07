import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
const NEST_URL = env.NEXT_PUBLIC_NEST_URL;
export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        const res = await axios.post(
          `${NEST_URL}/auth/register`,
          { email, password },
          { withCredentials: true },
        );
        return res;
      } catch (err) {
        console.log(err);
        throw new Error("Registration failed", { cause: err });
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
      const { email, password } = input;

      try {
        const res: { data: { accessToken: string } } = await axios.post(
          `${NEST_URL}/auth/login`,
          { email, password },
          { withCredentials: true },
        );
        return res.data.accessToken;
      } catch (err) {
        console.log(err);
      }
    }),
});
