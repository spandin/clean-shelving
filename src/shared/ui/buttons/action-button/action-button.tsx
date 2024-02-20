import { ReactNode } from "react";

import { isMobile } from "@/shared/helpers/mobile-check";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  action: () => any;
}

export default function ActionButton({
  children,
  className,
  id,
  action,
}: Props) {
  const handleAction = () => {
    action();
  };

  return isMobile ? (
    <button className={className} id={id} onTouchEnd={handleAction}>
      {children}
    </button>
  ) : (
    <button className={className} id={id} onClick={handleAction}>
      {children}
    </button>
  );
}
