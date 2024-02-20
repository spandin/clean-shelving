import "./_modal.scss";

import { isMobile } from "@/shared/helpers/mobile-check";

export const Modal = ({
  active,
  setActive,
  children,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return isMobile ? (
    <div
      className={active ? "modal active" : "modal"}
      onTouchStart={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
