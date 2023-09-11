import React from "react";
import ReactDOM from "react-dom/client";
import SearchPage from "./pages/SearchPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FoodItemPage } from "./pages/FoodItemPage.tsx";
import { foodLoader } from "./loaders/foodLoader.tsx";
import ScannerPage from "./pages/ScannerPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/food/:fdc_id",
    element: <FoodItemPage />,
    loader: foodLoader,
  },
  {
    path: "/scanner",
    element: <ScannerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
