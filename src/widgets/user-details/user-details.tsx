import css from "./_user-details.module.scss";

import { useParams } from "react-router-dom";

import { UserData } from "@/entities/user";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { useAppSelector } from "@/shared/hooks/use-redux";

export default function UserDetails() {
  const { userId } = useParams();

  const user = useAppSelector((state) =>
    state.data.users.find((u) => u.id === userId)
  );

  return (
    <div className={css.userDetails}>
      <div className={css.detailsWrapper}>
        <div className={css.detailsHeader}>
          <HeaderInformer title="Пользователь" subtitle={user?.email} />
        </div>

        {user ? <UserData user={user} /> : "Пользователь не найден"}
      </div>
    </div>
  );
}
