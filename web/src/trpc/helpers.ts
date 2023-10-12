import trpc, { RouterOutput, RouterInput } from "./client";

export type Food = RouterOutput["getById"];

export const getFoodById = async (fdc_id: number): Promise<Food> => {
  return await trpc.getById.query(fdc_id);
};

export type SearchFoodStrictInput = RouterInput["searchFoodStrict"];
export type SearchFoodStrictOutput = RouterOutput["searchFoodStrict"];
export type SearchFoodInput = RouterInput["searchFood"];
export type SearchFoodOutput = RouterOutput["searchFood"];

export const searchFoodStrict = async (
  input: SearchFoodStrictInput
): Promise<SearchFoodStrictOutput> => {
  try {
    return await trpc.searchFoodStrict.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchFood = async (
  input: SearchFoodInput
): Promise<SearchFoodOutput> => {
  try {
    return await trpc.searchFood.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getIdByUpc = async (
  input: RouterInput["getIdByUpc"]
): Promise<RouterOutput["getIdByUpc"]> => {
  try {
    return await trpc.getIdByUpc.query(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
