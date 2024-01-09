import { registerSW } from "virtual:pwa-register";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./lib/firebase";

import Root from "./routes/root";
import Products from "./routes/products/products";
import ProductId from "./routes/products-id/product-id";
import AddProduct from "./routes/add-product/add-product";
import Profile from "./routes/profile/profile";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index path="products/" element={<Products />} />
        <Route path="products/:productId" element={<ProductId />} />
        <Route path="add/" element={<AddProduct />} />
        <Route path="profile/" element={<Profile />} />
        <Route path="user/:userId/" element={<UserId />} />
        <Route path="settings//" element={<Settings />} />
        <Route path="statistics/" element={<Statistics />} />
        <Route path="activity/" element={<Activity />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position="top-center" />
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Provider>
  </React.StrictMode>
);
