"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
exports.appRouter = (0, trpc_1.router)({
    getById: trpc_1.publicProcedure
        .input(zod_1.z.number().min(99999).max(10000000)) // 6-7 digits long
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { input, ctx } = opts;
        try {
            return yield ctx.db.food.findFirstOrThrow({
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
        }
        catch (error) {
            // if (error instanceof PrismaClientKnownRequestError) {
            //   throw new TRPCError({
            //     code: "NOT_FOUND",
            //     message: "Unable to find ",
            //   });
            // } else
            //     throw error;
            throw error;
        }
    })),
    getByUpc: trpc_1.publicProcedure
        .input(zod_1.z.string().max(15).min(13))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { input, ctx } = opts;
    })),
    searchFood: trpc_1.publicProcedure
        .input(zod_1.z.object({
        query: zod_1.z.string().max(255),
        take: zod_1.z.number(),
        skip: zod_1.z.number().nullish(),
    }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { input, ctx } = opts;
        const data = yield ctx.db.$queryRaw `SELECT fdc_id, description FROM food 
      WHERE desc_vector @@ plainto_tsquery(${input.query}) 
      ORDER BY ts_rank("desc_vector", plainto_tsquery('english', ${input.query})) DESC 
      LIMIT ${input.take}
      OFFSET ${(_a = input.skip) !== null && _a !== void 0 ? _a : 0};`;
        console.log(data);
        return data;
    })),
    searchFoodStrict: trpc_1.publicProcedure
        .input(zod_1.z.object({
        query: zod_1.z.string().max(255),
        cursor: zod_1.z.number().nullish(),
        take: zod_1.z.number(),
    }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { input, ctx } = opts;
        const foods = yield ctx.db.food.findMany(Object.assign({ take: input.take, select: {
                fdc_id: true,
                description: true,
            }, where: {
                description: {
                    contains: input.query,
                    mode: "insensitive",
                },
            }, orderBy: {
                fdc_id: "asc",
            } }, (input.cursor && {
            cursor: {
                fdc_id: input.cursor,
            },
            skip: 1,
        })));
        return {
            foods: foods,
            cursor: foods[input.take - 1].fdc_id,
        };
    })),
});
