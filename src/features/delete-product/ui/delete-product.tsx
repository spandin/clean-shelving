import css from "./_delete-product.module.scss";

import { useNavigate } from "react-router-dom";

import { deleteProduct } from "../store/thunk";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import { useTheme } from "@/shared/lib/hooks/use-theme";
import { toastAuthErr, toastDelPromise } from "@/shared/helpers/toast";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

import { IMAGES_LIGHT, IMAGES_DARK } from "@/assets";

interface Props {
  name: string;
  id: string;
}

export function DeleteProduct({ name, id }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDark } = useTheme();

  const user = useAppSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      if (user.isAuth) {
        toastDelPromise(dispatch(deleteProduct({ id, name, user })));
        navigate("/products");
      } else {
        toastAuthErr();
      }
    } catch (e) {
      console.error(`DELETE PRODUCT:`, e);
    }
  };

  return (
    <div className={css.deleteProduct}>
      <div className={css.deleteInfo}>
        <div>
          <h3>Вы действительно хотите удалить?</h3>
          <span>Продукт - {name}</span>
        </div>

        <img
          src={
            isDark ? IMAGES_DARK.delete_product_d : IMAGES_LIGHT.delete_product
          }
        />
      </div>

      <ActionButton className={css.deleteButton} action={() => handleDelete()}>
        Удалить
      </ActionButton>
    </div>
  );
}
