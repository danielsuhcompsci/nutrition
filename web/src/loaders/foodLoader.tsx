import { LoaderFunctionArgs } from "react-router-dom";
import { Food, getFoodById } from "../trpc/helpers";

export const foodLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Food> => {
  if (!params.fdc_id) {
    throw new Error("no fdc_id found in URL");
  }

  console.log(params.fdc_id);

  return await getFoodById(parseInt(params.fdc_id));
};
