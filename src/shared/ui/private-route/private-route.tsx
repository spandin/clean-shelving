import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/shared/hooks/use-redux";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuth);
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="sign-in/" />;
};
