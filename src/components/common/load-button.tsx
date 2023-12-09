import { Ring } from "@uiball/loaders";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoadButton = ({ disabled, isLoading, onClick, text }: any) => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");

  return (
    <button onClick={onClick} disabled={disabled ? false : true}>
      {isLoading ? (
        <Ring size={30} color={theme.matches ? "#121212" : "#ffffff"} />
      ) : (
        text
      )}
    </button>
  );
};
