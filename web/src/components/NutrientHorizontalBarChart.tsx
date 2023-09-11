import { useMemo } from "react";
import { AxisOptions, Chart, ChartOptions, UserSerie } from "react-charts";
import { NutrientData } from "../pages/FoodItemPage";

export type NutrientHorizontalBarChartProps = {
  data: UserSerie<NutrientData>[];
};

export const NutrientHorizontalBarChart = ({
  data,
}: NutrientHorizontalBarChartProps) => {
  const primaryAxis = useMemo(
    (): AxisOptions<NutrientData> => ({
      getValue: (data) => data.name,
      position: "left",
    }),
    []
  );

  const secondaryAxis = useMemo(
    (): AxisOptions<NutrientData>[] => [
      {
        getValue: (data) => data.amount,
        position: "bottom",
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data: data,
        primaryAxis: primaryAxis,
        secondaryAxes: secondaryAxis,
        dark: true,
        primaryCursor: false,
        secondaryCursor: {
          // value: (value: number) => value * 1000,
          // onChange(value) {
          //   console.log(value);
          // },
        },
        // padding: {
        //   bottom: 100,
        //   left: 10,
        //   right: 10,
        //   top: 10,
        // },
      }}
    />
  );
};
