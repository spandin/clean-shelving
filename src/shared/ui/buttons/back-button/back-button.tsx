import "./_back-button.scss";

import { useNavigate } from "react-router-dom";

import { BsArrowLeftCircle } from "react-icons/bs";
import ActionButton from "../action-button/action-button";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <ActionButton className="backButton" action={() => navigate(-1)}>
      <BsArrowLeftCircle />
    </ActionButton>
  );
}
