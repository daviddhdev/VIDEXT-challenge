import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { documents } from "~/server/db/schema";

export const documentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.insert(documents).values({
          name: input.name,
          content: input.content,
        });
        return result;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("UNIQUE constraint failed")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `A document with the name "${input.name}" already exists`,
          });
        }
        throw error;
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.documents.findMany({
      orderBy: (documents, { desc }) => [desc(documents.createdAt)],
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.documents.findFirst({
        where: (documents, { eq }) => eq(documents.id, input.id),
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(documents).where(eq(documents.id, input.id));
    }),
  update: publicProcedure
    .input(z.object({ id: z.number(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(documents)
        .set({ content: input.content })
        .where(eq(documents.id, input.id));
    }),
});
