import css from "./_delete-product.module.scss";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";

import { toastAuthErr, toastDelPromise } from "@/shared/helpers/toast";

import { deleteProduct } from "../store/thunk";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

interface Props {
  name: string;
  id: string;
}

export function DeleteProduct({ name, id }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      <div>
        <h3>Вы действительно хотите удалить?</h3>
        <p>&quot;{name}&quot;</p>
      </div>

      <ActionButton className={css.deleteButton} action={() => handleDelete()}>
        Удалить
      </ActionButton>
    </div>
  );
}
