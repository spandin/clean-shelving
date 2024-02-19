import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  to: string;
  action?: any;
}

export default function NavigateButton({
  children,
  className,
  id,
  to,
  action,
}: Props) {
  const navigate = useNavigate();

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  ) ? (
    <button
      className={className}
      id={id}
      onTouchEnd={() => {
        navigate(to, { unstable_viewTransition: true }), action;
      }}
    >
      {children}
    </button>
  ) : (
    <button
      className={className}
      id={id}
      onClick={() => {
        navigate(to, { unstable_viewTransition: true }), action;
      }}
    >
      {children}
    </button>
  );
}
