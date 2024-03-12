import css from "./_profile-details.module.scss";

import { useAppSelector } from "@/shared/hooks/use-redux";

import { BsGear } from "react-icons/bs";

import { UserData } from "@/entities/user";

import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function ProfileDetails() {
  const { id } = useAppSelector((state) => state.user);

  const profileInfo = useAppSelector((state) =>
    state.data.users.find((u) => u.id === id)
  );

  return (
    <div className={css.profileDetails}>
      <div className={css.detailsWrapper}>
        <div className={css.detailsHeader}>
          <HeaderInformer title="Профиль" />
          <NavigateButton
            icon={<BsGear />}
            className="circle_button"
            to={"/settings/"}
          />
        </div>

        {profileInfo ? (
          <UserData user={profileInfo} />
        ) : (
          "Пользователь не найден"
        )}
      </div>
    </div>
  );
}
