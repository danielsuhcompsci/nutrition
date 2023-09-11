import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AxisOptions, Chart, UserSerie } from "react-charts";
import { useEffect, useMemo, useState } from "react";
import { getFoodById } from "../trpc/helpers";
import { Food } from "../trpc/helpers";
import { versions } from "process";
import { NutrientHorizontalBarChart } from "../components/NutrientHorizontalBarChart";

export type NutrientData = {
  name: string;
  amount: number;
};

const NutritionChartNames = {
  macro: {
    names: [
      "Water",
      "Protein",
      "Lipids",
      "Fatty acids, total monounsaturated",
      "Fatty acids, total polyunsaturated",
      "Fatty acids, total saturated",
      "Fatty acids, total trans",
      "Carbohydrates",
      "Carbohydrate, by difference",
      "Carbohydrate, by summation",
      "Carbohydrate, other",
      "Sugars, Total",
      "Sugars, added",
      "Cholesterol",
      "Fiber, soluble",
      "Fiber, insoluble",
      "Fiber, total dietary",
      // "Soluble dietary fiber (SDFP+SDFS)",
      // "Insoluble dietary fiber (IDF)",
      "Ash",
      // "Energy",
    ],
  },
  micro: {
    minerals: {
      names: [
        "Iron, Fe",
        "Iron, heme",
        "Iron, non-heme",
        "Potassium, K",
        "Copper, Cu",
        "Magnesium, Mg",
        "Calcium, Ca",
        "Fluoride, F",
        "Phosphorus, P",
        "Sodium, Na",
        "Sulfur, S",
        "Zinc, Zn",
      ],
    },
    vitamins: {
      names: [
        "Vitamin A, RAE",
        "Vitamin A, RE",
        "Vitamin B-12",
        "Vitamin B-6",
        "Vitamin C, total ascorbic acid",
        "Vitamin C, added",
        "Vitamin D (D2 + D3), International Units",
        "Vitamin D4",
        "Vitamin E",
        "Vitamin E, added",
        // "Vitamin E (label entry primarily)",
        "Vitamin K (Dihydrophylloquinone)",
        "Vitamin K (phylloquinone)",
        "Vitamin K (Menaquinone-4)",
        "Vitamins and Other Components", // ?
        "Riboflavin",
        "Riboflavin, intrinsic",
        "Folate, total",
        "Niacin",
        "Thiamin",
        "Thiamin, added",
        "Flavonoids, total",
        "Leucine", // amino acid
        "Lycopene", // phytochemical from tomatoes
      ],
    },
  },
  other: {
    names: [
      "Silicon, Si",
      "Other carotenoids",
      "Lactic acid",
      "Sorbitol",
      "Polyphenols, total",
      "Zeaxanthin",
      "Nitrates",
      "Citric Acid",
      "Carotene, alpha",
      "Carotene, beta",
      "Carotene",
      "Caffeine",
      "Fructose",
      "Galactose",
      "Glucose",
      "Lead, Pb",
      "Total sugar alcohols",
    ],
  },
};

export const FoodItemPage = () => {
  const food = useLoaderData();

  const [data, setData] = useState<UserSerie<NutrientData>[] | null>(null);

  const isFood = (food: any): food is Food => {
    console.log(food);

    return (
      (food as Food).description !== undefined &&
      (food as Food).foodNutrient !== undefined
    );
  };

  useEffect(() => {
    if (food && isFood(food)) {
      const allNames = NutritionChartNames.macro.names
        .concat(NutritionChartNames.micro.minerals.names)
        .concat(NutritionChartNames.micro.vitamins.names);

      const set = new Set(allNames);

      const data: UserSerie<NutrientData>[] = [
        {
          label: "Actual",
          data: food.foodNutrient
            .filter((value) => set.has(value.nutrient.name))
            .map((value) => ({
              name: value.nutrient.name + "  " + value.nutrient.unit_name,
              amount: value.amount ?? 0,
            })),
        },
      ];

      // console.log(data);

      setData(data);
    }
  }, [food]);

  if (!food || !isFood(food)) {
    return <div>Unable to display nutrients</div>;
  }

  const chartFor = (names: string[]) => {
    const set = new Set(names);

    const data: UserSerie<NutrientData>[] = [
      {
        label: "Actual",
        data: food.foodNutrient
          .filter((value) => set.has(value.nutrient.name))
          .map((value) => ({
            name: value.nutrient.name + "  " + value.nutrient.unit_name,
            amount: value.amount ?? 0,
          })),
      },
    ];

    console.log("Filtered: ", data);

    if (data[0].data.length == 0) return <div>No data to display</div>;

    return <NutrientHorizontalBarChart data={data} />;
  };

  return (
    <div className="text-white w-screen h-screen fill-white">
      <h2>{food.description}</h2>
      {/* <div className="h-screen">
        {data && <NutrientHorizontalBarChart data={data} />}
      </div> */}
      <div className="grid grid-rows-3 h-screen">
        <div className="h-full">
          {data && chartFor(NutritionChartNames.macro.names)}
        </div>
        <div className="h-full">
          {data && chartFor(NutritionChartNames.micro.minerals.names)}
        </div>
        <div className="h-full">
          {data && chartFor(NutritionChartNames.micro.vitamins.names)}
        </div>
      </div>
    </div>
  );
};
