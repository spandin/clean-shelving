import "./_settings.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@/app/slices/userSlice";

import Informer from "@/widgets/informer/informer";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="settings">
      <div className="settings__header">
        <Informer title="Настройки" />
      </div>
      <div className="settings__footer">
        <button
          onClick={() => {
            dispatch(removeUser()), navigate("/profile/");
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
