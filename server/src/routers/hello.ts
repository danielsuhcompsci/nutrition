import { router } from "../trpc";
import { publicProcedure } from "../trpc";

export const helloRouter = router({
  hello: publicProcedure.query((opts) => {
    return "Hello!";
  }),
});
