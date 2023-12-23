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
      className={active ? "Modal active" : "Modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "Modal__content active" : "Modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
