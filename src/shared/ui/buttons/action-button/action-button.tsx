import { ReactNode } from "react";

import { isMobile } from "@/shared/helpers/pwa";

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
  return isMobile ? (
    <button className={className} id={id} onTouchEnd={() => action()}>
      {children}
    </button>
  ) : (
    <button className={className} id={id} onClick={() => action()}>
      {children}
    </button>
  );
}
