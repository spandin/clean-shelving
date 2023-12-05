import "./_index.scss";

import { useNavigate } from "react-router-dom";

import { BsArrowLeftCircle } from "react-icons/bs";

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    <button className="button-back" onClick={() => navigate(-1)}>
      <BsArrowLeftCircle />
    </button>
  );
}
