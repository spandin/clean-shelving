import { registerSW } from "virtual:pwa-register";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./lib/firebase";

import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Products from "./routes/products/products";
import ProductId from "./routes/products-id/product-id";
import AddProduct from "./routes/add-product/add-product";
import User from "./routes/user/user";
import UserId from "./routes/user-id/user-id";
import Statistics from "./routes/statistics/statistics";
import Activity from "./routes/activity/activity";
import Settings from "./routes/settings/settings";
import { ToastContainer } from "react-toastify";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("У вас старая версия приложения. Обновить?")) {
      updateSW(true);
    }
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
        element: <ProductId />,
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
    <ToastContainer position="top-center" />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
