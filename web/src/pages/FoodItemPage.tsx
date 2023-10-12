import { useLoaderData, useNavigate } from "react-router-dom";
import { UserSerie } from "react-charts";
import { useEffect, useState } from "react";
import { Food } from "../trpc/helpers";
import { NutrientHorizontalBarChart } from "../components/NutrientHorizontalBarChart";
import Button from "../components/Button";
import { NutritionChartNames } from "../constants";

export type NutrientData = {
  name: string;
  amount: number;
};

const FoodItemPage = () => {
  const food: any = useLoaderData();
  const navigate = useNavigate();

  // const [data, setData] = useState<UserSerie<NutrientData>[] | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const isFood = (food: any): food is Food => {
    // console.log(food);

    return (
      (food as Food).description !== undefined &&
      (food as Food).foodNutrient !== undefined
    );
  };

  useEffect(() => {
    if (food && isFood(food)) {
      // const allNames = NutritionChartNames.macro.names
      //   .concat(NutritionChartNames.micro.minerals.names)
      //   .concat(NutritionChartNames.micro.vitamins.names);

      // const set = new Set(allNames);

      // const data: UserSerie<NutrientData>[] = [
      //   {
      //     label: "Actual",
      //     data: food.foodNutrient
      //       .filter((value) => set.has(value.nutrient.name) && value.amount)
      //       .map((value) => ({
      //         name: value.nutrient.name + "  " + value.nutrient.unit_name,
      //         amount: value.amount!,
      //       })),
      //   },
      // ];

      // console.log("Before:", food.foodNutrient);

      const filterByCalories = food.foodNutrient.filter((value) => {
        return value.nutrient.name == "Energy";
      });

      if (filterByCalories.length == 1) setCalories(filterByCalories[0].amount);

      // console.log(filterByCalories);

      // console.log(data);

      // setData(data);
    }
  }, [food]);

  if (!food || !isFood(food)) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Unable to display nutrients
      </div>
    );
  }

  const chartFor = (names: string[]) => {
    const set = new Set(names);

    const data: UserSerie<NutrientData>[] = [
      {
        label: "Actual",
        data: food.foodNutrient
          .filter(
            (value) =>
              set.has(value.nutrient.name) && value.amount && value.amount > 0
          )
          .map((value) => ({
            name: value.nutrient.name + "  " + value.nutrient.unit_name,
            amount: value.amount!,
          })),
      },
      // {
      //   label: "Recommended",
      //   data: food.foodNutrient
      //     .filter((value) => set.has(value.nutrient.name) && value.amount)
      //     .map((value) => ({
      //       name: value.nutrient.name + "  " + value.nutrient.unit_name,
      //       amount: value.amount! + Math.random() * 5 + 1,
      //     })),
      // },
    ];

    // console.log("Filtered: ", data);

    if (data[0].data.length == 0)
      return (
        <div className="flex justify-center items-center h-full text-sm">
          No data to display
        </div>
      );

    return <NutrientHorizontalBarChart data={data} />;
  };

  return (
    <div className="text-white w-screen h-screen fill-white">
      <div className="flex p-5 justify-evenly items-center">
        <Button
          onClick={() => {
            navigate("../");
          }}
        >
          Go back
        </Button>
        <div>
          <h2>Name: {food.description}</h2>

          <h2>Calories(kcal): {calories ?? "Unable to find calorie data"}</h2>
        </div>
      </div>
      {/* <div className="h-screen">
        {data && <NutrientHorizontalBarChart data={data} />}
      </div> */}
      <div className="grid grid-rows-3 gap-y-28">
        <div className="h-[40vh]">
          <h1 className="py-3 flex justify-center w-full">Macronutrients</h1>
          {chartFor(NutritionChartNames.macro.names)}
        </div>
        <div className="h-[40vh]">
          <h1 className="py-3 flex justify-center w-full">Minerals</h1>
          {chartFor(NutritionChartNames.micro.minerals.names)}
        </div>
        <div className="h-[40vh]">
          <h1 className="py-3 flex justify-center w-full ">Vitamins</h1>
          {chartFor(NutritionChartNames.micro.vitamins.names)}
        </div>
      </div>
    </div>
  );
};

export default FoodItemPage;
