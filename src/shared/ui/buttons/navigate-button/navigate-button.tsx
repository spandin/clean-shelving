import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  to: string;
  action?: () => any;
}

export default function NavigateButton({
  children,
  className,
  id,
  to,
  action,
}: Props) {
  const navigate = useNavigate();

  const handleAction = () => {
    action && action();
    navigate(to, { unstable_viewTransition: true });
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
