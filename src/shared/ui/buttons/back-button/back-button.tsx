import "./_back-button.scss";

import { BsArrowLeftCircle } from "react-icons/bs";

import NavigateButton from "../navigate-button/navigate-button";

export default function BackButton() {
  return (
    <NavigateButton className="back_button" to={-1}>
      <BsArrowLeftCircle />
    </NavigateButton>
  );
}
