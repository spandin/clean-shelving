import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  to: string;
}

export default function CustomLink({ children, className, id, to }: Props) {
  const navigate = useNavigate();
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  ) ? (
    <Link
      className={className}
      id={id}
      to={to}
      onTouchCancel={() => navigate(to)}
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