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
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
      onTouchStart={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
