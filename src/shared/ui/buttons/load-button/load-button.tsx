import css from "./_load-button.module.scss";

import { Ring } from "@uiball/loaders";

import { useTheme } from "@/shared/lib/hooks/use-theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoadButton({
  className,
  disabled,
  isLoading,
  onClick,
  text,
}: any) {
  const { isDark } = useTheme();

  return (
    <button
      className={`${css.loadButton} ${className}`}
      onClick={onClick}
      disabled={disabled ? false : true}
    >
      {isLoading ? (
        <Ring size={30} color={isDark ? "#121212" : "#ffffff"} />
      ) : (
        text
      )}
    </button>
  );
}
