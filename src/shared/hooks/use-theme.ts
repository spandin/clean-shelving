export function useTheme() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");

  return {
    isDark: theme.matches,
    isLight: !theme.matches,
    theme: theme,
  };
}
