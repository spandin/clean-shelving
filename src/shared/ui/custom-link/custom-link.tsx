import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { isMobile } from "@/shared/helpers/mobile-check";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  to: string;
}

export default function CustomLink({ children, className, id, to }: Props) {
  const navigate = useNavigate();

  return isMobile ? (
    <Link
      className={className}
      id={id}
      to={to}
      onTouchEnd={() => navigate(to, { unstable_viewTransition: true })}
      preventScrollReset
      unstable_viewTransition
    >
      {children}
    </Link>
  ) : (
    <Link
      className={className}
      id={id}
      to={to}
      preventScrollReset
      unstable_viewTransition
    >
      {children}
    </Link>
  );
}
