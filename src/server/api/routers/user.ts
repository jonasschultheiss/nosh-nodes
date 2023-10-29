import { clerkClient, currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(12),
        firstName: z.string().min(1).max(25),
        lastName: z.string().min(1).max(25),
        yearsAtWork: z.number().int().min(0).max(99),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        return new TRPCError({ code: TRPC_ERROR_CODES_BY_KEY.UNAUTHORIZED });
      }

      await clerkClient.users.updateUser(user.id, {
        ...input,
        publicMetadata: { yearsAtWork: input.yearsAtWork },
      });
    }),
});
