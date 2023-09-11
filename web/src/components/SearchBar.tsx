import { useState } from "react";
import { FoodItem } from "./FoodItem";
import {
  Food,
  SearchFoodStrictOutput,
  searchFood,
  searchFoodStrict,
} from "../trpc/helpers";

const SearchBar = () => {
  // const debounce = (func: Function, timeout = 500) => {
  //   let timer: any;
  //   console.log("new parent debounce created");
  //   return (...args: any) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func.apply(this, args), timeout);
  //   };
  // };
  // const processQuery = debounce(() => {
  //   if (input != "")
  //     trpc.searchBranded.query(input).then((data) => {
  //       setResults(data);
  //     });
  // });

  const [foods, setFoods] = useState<SearchFoodStrictOutput["foods"]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // searchFoodStrict({ query: input, take: 15 })
          //   .then((data) => {
          //     console.log("First", data.cursor);
          //     setFoods(data.foods);
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   });

          searchFood({
            query: input,
            take: 15,
          })
            .then((data) => {
              setFoods(data);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        <input
          className="rounded-sm text-lg px-4 py-1 h-auto text-inherit w-full"
          placeholder={"Type something in"}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>
      <div className="absolute border-slate-200 space-y-3">
        {foods.map((food, index) => {
          return (
            <FoodItem
              foodId={food.fdc_id}
              foodName={food.description ?? ""}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
