import { useAppSelector } from "./redux-hooks";

export function useAuth() {
  const { email, id } = useAppSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    id,
  };
}
