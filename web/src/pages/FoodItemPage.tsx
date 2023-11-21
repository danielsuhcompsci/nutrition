import { useLoaderData, useNavigate } from "react-router-dom";
import { UserSerie } from "react-charts";
import { useEffect, useState } from "react";
import { Food } from "../trpc/helpers";
import { NutrientHorizontalBarChart } from "../components/NutrientHorizontalBarChart";
import Button from "../components/Button";
import { NutritionChartNames, recommendedIntakesAdultMale } from "../constants";
import Doughnut from "../components/Doughnut";

export type NutrientData = {
  name: string;
  amount: number;
};

const FoodItemPage = () => {
  const isFood = (food: any): food is Food => {
    // console.log(food);

    return (
      (food as Food).description !== undefined &&
      (food as Food).foodNutrient !== undefined
    );
  };

  const food: any = useLoaderData();
  const navigate = useNavigate();

  // const [data, setData] = useState<UserSerie<NutrientData>[] | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  useEffect(() => {
    if (food && isFood(food)) {
      const filterByCalories = food.foodNutrient.filter((value) => {
        return value.nutrient.name == "Energy";
      });

      if (filterByCalories.length == 1) setCalories(filterByCalories[0].amount);
    }
  }, [food]);

  if (!food || !isFood(food)) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Unable to display nutrients
      </div>
    );
  }

  const macroNames = [
    "Protein",
    "Lipids",
    "Carbohydrates",
    "Fiber, total dietary",
  ];

  const doughnutChartNames = ["Protein", "Fats", "Carbs", "Fiber"];

  const getMacroValue = (name: string) => {
    const findIndex = food.foodNutrient.findIndex(
      (nutrient) => nutrient.nutrient.name === name
    );
    return (
      findIndex === -1 ? 0 : food.foodNutrient[findIndex].amount
    ) as number;
  };

  const getMacroValues = () => {
    return macroNames.map((name) => getMacroValue(name));
  };

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
      {
        label: "Recommended",
        data: food.foodNutrient
          .filter((value) => set.has(value.nutrient.name) && value.amount)
          .map((value) => {
            return {
              name: value.nutrient.name + "  " + value.nutrient.unit_name,
              amount: recommendedIntakesAdultMale[value.nutrient.name]
                ? recommendedIntakesAdultMale[value.nutrient.name].amount ?? 0
                : 0,
            };
          }),
      },
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
      <div className="flex p-5 justify-left items-center">
        <Button
          onClick={() => {
            navigate("../");
          }}
        >
          Go back
        </Button>
      </div>
      <div className="">
        <div className="flex flex-col justify-evenly items-center md:m-5 p-5 rounded-2xl text-black bg-slate-200">
          <h2>
            <span className="font-bold">Name: </span>
            {food.description}
          </h2>
          <h2>
            <span className="font-bold">Publication Date: </span>
            {food.publication_date ?? "No date found"}
          </h2>
          <h2>
            <span className="font-bold">UPC: </span>
            {food.brandedFood[0]?.gtin_upc ?? "No UPC found"}
          </h2>
          <h2>
            <span className="font-bold">Serving Size: </span>
            {food.brandedFood[0]?.serving_size ?? "(no size found)"}{" "}
            {food.brandedFood[0]?.serving_size_unit ?? "(no unit found)"}
          </h2>
          <h2>
            <span className="font-bold">Calories(kcal)</span>:{" "}
            {calories ?? "Unable to find calorie data"}
          </h2>
        </div>
        <div className="md:flex md:flex-row md:justify-evenly">
          <div className="flex flex-col items-center justify-center pt-5">
            {macroNames.map((name) => {
              return (
                <div>
                  <span className="font-bold">{name}:</span>{" "}
                  {getMacroValue(name)} G
                </div>
              );
            })}
            <p className="italic text-xs mt-2">
              Note, 0 value may just indicate invalid data
            </p>
          </div>
          <div className="px-15 py-5 flex justify-center items-center">
            <Doughnut labels={doughnutChartNames} data={getMacroValues()} />
          </div>
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
