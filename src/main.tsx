import { registerSW } from "virtual:pwa-register";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/app/reduxStore";
import "@/shared/api/firebase-config";

import Rootlayout from "@/app/layouts/root-layout";

import { ToastContainer } from "react-toastify";
import ProductsPage from "./pages/products-page/products-page";
import ProductDetailsPage from "./pages/product-details-page/product-details-page";
import AddProductPage from "./pages/add-product-page/add-products-page";
import ProfilePage from "./pages/profile-details-page/profile-details-page";
import UserDetailsPage from "./pages/user-details-page/user-details-page";
import SettingsPage from "./pages/settings-page/settings-page";
import RatingPage from "./pages/rating-page/rating-page";
import ActivityPage from "./pages/activity-page/activity-page";
import ErrorPage from "./pages/error-page/error-page";

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
    element: <Rootlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "activity/",
        element: <ActivityPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "add/",
        element: <AddProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/",
        element: <ProductsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile/",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "user/:userId/",
        element: <UserDetailsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "rating/",
        element: <RatingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings/",
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

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
