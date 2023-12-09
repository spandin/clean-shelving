import "./_index.scss";

import { useNavigate } from "react-router-dom";

import { BsArrowLeftCircle } from "react-icons/bs";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="back_button" onClick={() => navigate(-1)}>
      <BsArrowLeftCircle />
    </button>
  );
}
