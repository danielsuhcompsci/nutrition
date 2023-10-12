import { LoaderFunctionArgs } from "react-router-dom";
import {
  Food,
  SearchFoodOutput,
  getFoodById,
  searchFood,
} from "../trpc/helpers";

export const foodLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Food> => {
  if (!params.fdc_id) {
    throw new Error("no fdc_id found in URL");
  }

  return await getFoodById(parseInt(params.fdc_id));
};
