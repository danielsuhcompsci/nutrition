import { foodRouter } from "./routers/food";
import { helloRouter } from "./routers/hello";
import { publicProcedure, router, mergeRouters } from "./trpc";

// export const appRouter = router({
//   hello: helloRouter,
//   food: foodRouter,
// });

export const appRouter = mergeRouters(helloRouter, foodRouter);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
