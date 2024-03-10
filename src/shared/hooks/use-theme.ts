import { useAppSelector } from "./use-redux";

export function useTheme() {
  const theme = useAppSelector((state) => state.settings.theme);
  const isDark = theme === "dark" && true;

  return {
    isDark,
    theme: theme,
  };
}
