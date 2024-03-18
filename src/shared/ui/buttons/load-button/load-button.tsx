import css from "./_load-button.module.scss";

import { Ring } from "@uiball/loaders";

import { useTheme } from "@/shared/hooks/use-theme";

interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function LoadButton({
  className,
  disabled,
  isLoading,
  onClick,
  text,
}: Props) {
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
