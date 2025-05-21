import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { aiRouter } from "./routers/ai";
import { documentRouter } from "./routers/document";

export const appRouter = createTRPCRouter({
  document: documentRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
