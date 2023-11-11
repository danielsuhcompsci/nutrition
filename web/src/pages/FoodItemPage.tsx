import { useLoaderData, useNavigate } from "react-router-dom";
import { UserSerie } from "react-charts";
import { useEffect, useState } from "react";
import { Food } from "../trpc/helpers";
import { NutrientHorizontalBarChart } from "../components/NutrientHorizontalBarChart";
import Button from "../components/Button";
import { NutritionChartNames, recommendedIntakesAdultMale } from "../constants";
import { Chart, ChartProps } from "react-chartjs-2";
import "chart.js/auto";

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

  const config: ChartProps = {
    type: "doughnut",
    data: {
      labels: ["Protein", "Fats", "Carbs", "Fiber"],
      datasets: [
        {
          label: "Macronutrients",
          data: [
            "Protein",
            "Lipids",
            "Carbohydrates",
            "Fiber, total dietary",
          ].map((value) => {
            const findIndex = food.foodNutrient.findIndex(
              (nutrient) => nutrient.nutrient.name === value
            );
            return findIndex === -1 ? 0 : food.foodNutrient[findIndex].amount;
          }),
          // backgroundColor: [
          //   "rgb(255, 99, 132)",
          //   "rgb(255, 205, 86)",
          //   "rgb(54, 162, 235)",
          // ],
        },
      ],
    },
    options: {
      responsive: true,
      color: "white",
    },
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
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col justify-evenly items-center m-20 p-5 rounded-2xl text-black bg-slate-200">
          <h2>
            <span className="font-bold">Name: </span>
            {food.description}
          </h2>

          <h2>
            <span className="font-bold">Calories(kcal)</span>:{" "}
            {calories ?? "Unable to find calorie data"}
          </h2>
        </div>
        <div className="px-15 py-20 flex justify-center items-center">
          <Chart
            data={config.data}
            type={config.type}
            options={config.options}
          />
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
