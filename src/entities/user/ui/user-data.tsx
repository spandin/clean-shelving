import css from "./_user-data.module.scss";

import type { UserData } from "@/shared/types/types";

export function UserData({ user }: { user: UserData }) {
  return (
    <div className={css.userData}>
      <ul className={css.dataTabs}>
        <li className={css.dataTab}>
          <input type="radio" name="tabs" id="tab-1" defaultChecked />
          <label htmlFor="tab-1">Информация</label>
          <div className={css.tabContent}>
            <div id={css.user_avatar}>{user.name?.charAt(0)} </div>

            <div className={css.userInfo}>
              <h2>{user.name}</h2>
              <p>{user.role}</p>
            </div>

            <div className={css.userActions}>
              <div className={css.actionsCol}>
                <span>ДОБ:</span>
                <span>{user.actions && user.actions.added}</span>
              </div>

              <div className={css.actionsCol}>
                <span>ОБН:</span>
                <span>{user.actions && user.actions.updated}</span>
              </div>

              <div className={css.actionsCol}>
                <span>УДЛ:</span>
                <span>{user.actions && user.actions.deleted}</span>
              </div>
            </div>
          </div>
        </li>
        <li className={css.dataTab}>
          <input type="radio" name="tabs" id="tab-2" />
          <label htmlFor="tab-2">Активность</label>
          <div className={css.tabContent}>Функция в разработке</div>
        </li>
      </ul>
    </div>
  );
}
