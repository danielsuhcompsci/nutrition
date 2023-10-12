import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import env from "../env";
import { AppRouter } from "../../../server/dist/appRouter";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
//     👆 **type-only** import

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV
        ? "http://localhost:4000"
        : "http://server-lb-1629167841.us-east-2.elb.amazonaws.com:4000",
      //   fetch(url, options) {
      //     return fetch(url, {
      //       ...options,
      //       credentials: "include",
      //     });
      //   },
    }),
  ],
});

export default trpc;
