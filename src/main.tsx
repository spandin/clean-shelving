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
import "./app/firebase-config";

import Root from "./app/root";

import { ToastContainer } from "react-toastify";
import Products from "./pages/products/products";
import ProductId from "./pages/products-id/product-id";
import AddProduct from "./pages/add-product/add-product";
import Profile from "./pages/profile/profile";
import UserId from "./pages/user-id/user-id";
import Settings from "./pages/settings/settings";
import Rating from "./pages/rating/rating";
import Activity from "./pages/activity/activity";

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
        <Route path="rating/" element={<Rating />} />
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
