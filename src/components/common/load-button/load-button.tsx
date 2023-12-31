import { Ring } from "@uiball/loaders";

import { useTheme } from "@/hooks/use-theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoadButton = ({ disabled, isLoading, onClick, text }: any) => {
  const { isDark } = useTheme();

  return (
    <button onClick={onClick} disabled={disabled ? false : true}>
      {isLoading ? (
        <Ring size={30} color={isDark ? "#121212" : "#ffffff"} />
      ) : (
        text
      )}
    </button>
  );
};
