import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  action?: () => any;
}

export default function ActionButton({
  children,
  className,
  id,
  action,
}: Props) {
  const handleAction = () => {
    action && action();
  };

  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? (
    <button className={className} id={id} onTouchStart={handleAction}>
      {children}
    </button>
  ) : (
    <button className={className} id={id} onClick={handleAction}>
      {children}
    </button>
  );
}
