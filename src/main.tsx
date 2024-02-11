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
import ProductsPage from "./pages/products/products-page";
import ProductPage from "./pages/product/product-page";
import AddProductPage from "./pages/add-product/add-products-page";
import ProfilePage from "./pages/profile/profile-page";
import UserPage from "./pages/user/user-page";
import SettingsPage from "./pages/settings/settings-page";
import RatingPage from "./pages/rating/rating-page";
import ActivityPage from "./pages/activity/activity-page";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("У вас старая версия приложения. Обновить?")) {
      updateSW(true);
    }
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index path="products/" element={<ProductsPage />} />
      <Route path="products/:productId" element={<ProductPage />} />
      <Route path="add/" element={<AddProductPage />} />
      <Route path="profile/" element={<ProfilePage />} />
      <Route path="user/:userId/" element={<UserPage />} />
      <Route path="settings//" element={<SettingsPage />} />
      <Route path="rating/" element={<RatingPage />} />
      <Route path="activity/" element={<ActivityPage />} />
    </Route>
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
