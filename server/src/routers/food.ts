import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const foodRouter = router({
  getById: publicProcedure
    .input(z.number().min(99_999).max(10_000_000)) // 6-7 digits long
    .query(async (opts) => {
      const { input, ctx } = opts;

      try {
        return await ctx.db.food.findFirstOrThrow({
          select: {
            description: true,
            publication_date: true,
            brandedFood: {
              select: {
                serving_size: true,
                serving_size_unit: true,
                gtin_upc: true,
              },
            },
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
  getIdByUpc: publicProcedure
    .input(z.string().max(15).min(10))
    .query(async (opts) => {
      const { input, ctx } = opts;

      return await ctx.db.$queryRaw<
        {
          fdc_id: number;
        }[]
      >`SELECT DISTINCT ON (gtin_upc) fdc_id FROM branded_food WHERE gtin_upc = ${input} ORDER BY gtin_upc, modified_date DESC NULLS LAST`;
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

      // Selected the id and description from food, based on the description vector column (generated as tsvector of description),
      // ordered by relevance (although ordering can be iffy)
      const data = await ctx.db.$queryRaw<
        { fdc_id: number; description: string | null }[]
      >`SELECT fdc_id, description FROM food
      WHERE desc_vector @@ plainto_tsquery(${input.query})
      ORDER BY ts_rank("desc_vector", plainto_tsquery('english', ${
        input.query
      })) DESC
      LIMIT ${input.take}
      OFFSET ${input.skip ?? 0};`;

      return data;
    }),
  searchFoodStrict: publicProcedure
    .input(
      z.object({
        query: z.string().max(255),
        take: z.number(),
        skip: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { input, ctx } = opts;

      // Search with basic ILIKE (Postgres)
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
        skip: input.skip ?? 0,
      });

      return foods;
    }),
});
