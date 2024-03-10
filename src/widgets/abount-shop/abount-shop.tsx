import css from "./_abount-shop.module.scss";

import { useAppSelector } from "@/shared/hooks/use-redux";
import { useTheme } from "@/shared/hooks/use-theme";

import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";

import { IMAGES_DARK, IMAGES_LIGHT } from "@/assets";

export function AbountShop() {
  const { isDark } = useTheme();
  const productsLenght = useAppSelector((state) => state.data.products.length);
  const usersLenght = useAppSelector((state) => state.data.users.length);

  return (
    <div className={css.abountShop}>
      <div className={css.abountShopWrapper}>
        <img
          src={isDark ? IMAGES_DARK.abount_shop_d : IMAGES_LIGHT.abount_shop}
        />
        <div className={css.shopInfo}>
          <div>
            {" "}
            <h2>Добро пожаловать в Clean Shelving!</h2>
            <span>
              На данный момент в вашем магазине{" "}
              <span id={css.products}>{productsLenght} активных позиций</span> и{" "}
              <span id={css.users}>{usersLenght} сотрудников</span>.
            </span>
          </div>

          <NavigateButton
            text="Перейти к списку"
            id={css.go_to_list}
            to={"products/"}
          ></NavigateButton>
        </div>
      </div>
    </div>
  );
}
