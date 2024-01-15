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
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/app/reduxStore";
import "@/shared/api/firebase-config";

import Rootlayout from "@/app/layouts/rootLayout";

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
      <Route path="/" element={<Rootlayout />}>
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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
