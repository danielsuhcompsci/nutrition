import { useEffect, useRef, useState } from "react";
import { FoodItem } from "./FoodItem";
import {
  SearchFoodOutput,
  searchFood,
  searchFoodStrict,
} from "../trpc/helpers";
import { AiOutlineLoading } from "react-icons/ai";
import { IconContext } from "react-icons";
import Button from "./Button";

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

  const [foods, setFoods] = useState<SearchFoodOutput | null>(null);
  const [input, setInput] = useState("");
  const [skip, setSkip] = useState(0);
  const take = 15;
  const loadingIndicatorRef = useRef(null);
  const [haveSearched, setHaveSearched] = useState(false);
  const [isStrict, setStrict] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, _) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(haveSearched);
            // console.log("intersected");
            if (haveSearched) {
              setIsLoading(true);
              searchFood({ query: input, take, skip })
                .then((data) => {
                  setFoods((f) => {
                    if (f) return [...f, ...data];
                    else return data;
                  });
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.error(err);
                  // throw err;
                });
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const current = loadingIndicatorRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [input, skip, haveSearched]);

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);

          if (!isStrict) {
            searchFood({
              query: input,
              take,
              skip,
            })
              .then((data) => {
                setFoods(data);
                // console.log("searched foods");
                setHaveSearched(true);
                setIsLoading(false);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            searchFoodStrict({ query: input, take, skip })
              .then((data) => {
                setFoods(data);
                setHaveSearched(true);
                setIsLoading(false);
              })
              .catch((err) => console.error(err));
          }

          setSkip(skip + take);
          // searchFoodStrict({ query: input, take: 15 })
          //   .then((data) => {
          //     console.log("First", data.cursor);
          //     setFoods(data.foods);
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   });
        }}
      >
        <div className="flex">
          <input
            className="rounded-sm text-lg px-4 py-1 h-auto text-inherit bg-slate-500 w-full"
            placeholder={"Type something in!"}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            className="border-0"
            onClick={() => {
              setSkip(0);
              setFoods(null);
              setHaveSearched(false);
            }}
          >
            Clear
          </Button>
          <Button
            className="border-0"
            onClick={() => {
              setStrict(!isStrict);
            }}
          >
            {isStrict ? "Text Search" : "Exact Match"}
          </Button>
        </div>
      </form>
      <div className="absolute w-full border-slate-200 space-y-5 h-auto">
        {haveSearched ? (
          foods && foods.length > 0 ? (
            foods.map((food, index) => {
              return (
                <FoodItem
                  foodId={food.fdc_id}
                  foodName={food.description ?? ""}
                  index={index}
                  key={index}
                />
              );
            })
          ) : (
            <div className="border-red-100 bg-red-500 rounded-lg flex justify-center items-center text-2xl absolute w-full h-auto">
              No results found
            </div>
          )
        ) : (
          <></>
        )}

        <div
          ref={loadingIndicatorRef}
          className={"flex justify-center items-center"}
        >
          <IconContext.Provider
            value={{
              className: !isLoading ? "hidden " : "" + "animate-spin",
            }}
          >
            <AiOutlineLoading />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
