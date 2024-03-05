import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { isMobile } from "@/shared/helpers/mobile-check";

interface Props {
  icon?: ReactNode;
  text?: ReactNode;
  className?: string;
  id?: string;
  to: string;
  action?: () => any;
}

export default function NavigateButton({
  icon,
  text,
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

  return isMobile ? (
    <button className={className} id={id} onTouchEnd={handleAction}>
      {icon}
      {text}
    </button>
  ) : (
    <button className={className} id={id} onClick={handleAction}>
      {icon}
      {text}
    </button>
  );
}
