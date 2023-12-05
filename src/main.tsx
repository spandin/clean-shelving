import React from "react";
import ReactDOM from "react-dom/client";

import { registerSW } from "virtual:pwa-register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Products from "./routes/products/products";
import ProductsId from "./routes/products/products-id";
import AddProduct from "./routes/products/add-product";
import User from "./routes/users/user";
import UserId from "./routes/users/user-id";
import Settings from "./routes/users/settings";
import Statistics from "./routes/features/statistics";
import Activity from "./routes/features/activity";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("У вас старая версия приложения. Обновить?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    prompt("Вы офлайн!");
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products/",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductsId />,
      },
      {
        path: "add/",
        element: <AddProduct />,
      },
      {
        path: "user/",
        element: <User />,
      },
      {
        path: "user/:userId",
        element: <UserId />,
      },
      {
        path: "settings/",
        element: <Settings />,
      },
      {
        path: "statistics/",
        element: <Statistics />,
      },
      {
        path: "activity/",
        element: <Activity />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
