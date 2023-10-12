import { PiBowlFoodFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export type FoodItemProps = {
  index: number;
  foodId: number;
  foodName: string;
};

export const FoodItem = ({ foodId, foodName, index }: FoodItemProps) => {
  return (
    <Link
      to={`/food/${foodId}`}
      className="text-inherit hover:text-inherit"
      key={index}
    >
      <div
        className={`flex justify-center items-center p-3 hover:bg-slate-500`}
      >
        <p className="text-sm">{foodName}</p>
      </div>
    </Link>
  );
};
