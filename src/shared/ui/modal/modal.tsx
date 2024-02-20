import "./_modal.scss";

export const Modal = ({
  active,
  setActive,
  children,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? (
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
