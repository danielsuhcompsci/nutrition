import { TRPCError, getTRPCErrorFromUnknown } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { triggerAsyncId } from "async_hooks";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const appRouter = router({
  getById: publicProcedure
    .input(z.number().min(99_999).max(10_000_000)) // 6-7 digits long
    .query(async (opts) => {
      const { input, ctx } = opts;

      try {
        return await ctx.db.food.findFirstOrThrow({
          select: {
            description: true,
            foodNutrient: {
              select: {
                amount: true,
                nutrient: {
                  select: {
                    name: true,
                    unit_name: true,
                  },
                },
              },
            },
          },
          where: {
            fdc_id: input,
          },
        });
      } catch (error) {
        // if (error instanceof PrismaClientKnownRequestError) {
        //   throw new TRPCError({
        //     code: "NOT_FOUND",
        //     message: "Unable to find ",
        //   });
        // } else
        //     throw error;
        throw error;
      }
    }),
  getByUpc: publicProcedure
    .input(z.string().max(15).min(13))
    .query(async (opts) => {
      const { input, ctx } = opts;
    }),
  searchFood: publicProcedure

    .input(
      z.object({
        query: z.string().max(255),
        take: z.number(),
        skip: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { input, ctx } = opts;

      const data = await ctx.db.$queryRaw<
        { fdc_id: number; description: string }[]
      >`SELECT fdc_id, description FROM food 
      WHERE desc_vector @@ plainto_tsquery(${input.query}) 
      ORDER BY ts_rank("desc_vector", plainto_tsquery('english', ${
        input.query
      })) DESC 
      LIMIT ${input.take}
      OFFSET ${input.skip ?? 0};`;

      console.log(data);

      return data;
    }),
  searchFoodStrict: publicProcedure
    .input(
      z.object({
        query: z.string().max(255),
        cursor: z.number().nullish(),
        take: z.number(),
      })
    )
    .query(async (opts) => {
      const { input, ctx } = opts;

      const foods = await ctx.db.food.findMany({
        take: input.take,
        select: {
          fdc_id: true,
          description: true,
        },
        where: {
          description: {
            contains: input.query,
            mode: "insensitive",
          },
        },
        orderBy: {
          fdc_id: "asc",
        },
        ...(input.cursor && {
          cursor: {
            fdc_id: input.cursor,
          },
          skip: 1,
        }),
      });

      return {
        foods: foods,
        cursor: foods[input.take - 1].fdc_id,
      };
    }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
