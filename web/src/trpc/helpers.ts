import trpc, { type RouterOutput, type RouterInput } from "./client";

export type Food = RouterOutput["food"]["getById"];

export const getFoodById = async (fdc_id: number): Promise<Food> => {
  return await trpc.food.getById.query(fdc_id);
};

export type SearchFoodStrictInput = RouterInput["food"]["searchFoodStrict"];
export type SearchFoodStrictOutput = RouterOutput["food"]["searchFoodStrict"];
export type SearchFoodInput = RouterInput["food"]["searchFood"];
export type SearchFoodOutput = RouterOutput["food"]["searchFood"];

export const searchFoodStrict = async (
  input: SearchFoodStrictInput
): Promise<SearchFoodStrictOutput> => {
  try {
    return await trpc.food.searchFoodStrict.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchFood = async (
  input: SearchFoodInput
): Promise<SearchFoodOutput> => {
  try {
    return await trpc.food.searchFood.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getIdByUpc = async (
  input: RouterInput["food"]["getIdByUpc"]
): Promise<RouterOutput["food"]["getIdByUpc"]> => {
  try {
    return await trpc.food.getIdByUpc.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
