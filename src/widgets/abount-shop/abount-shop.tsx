import css from "./_abount-shop.module.scss";

import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

import IMAGES from "@/assets/images/images";

export function AbountShop() {
  const navigate = useNavigate();

  const productsLenght = useAppSelector((state) => state.data.products.length);
  const usersLenght = useAppSelector((state) => state.data.users.length);

  return (
    <div className={css.abountShop}>
      <div className={css.abountShopWrapper}>
        <img src={IMAGES.registration} />
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

          <button
            id={css.go_to_list}
            onClick={() =>
              navigate("products/", { unstable_viewTransition: true })
            }
          >
            Перейти к списку
          </button>
        </div>
      </div>
    </div>
  );
}
