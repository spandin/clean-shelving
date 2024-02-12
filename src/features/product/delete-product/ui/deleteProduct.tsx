import css from "./_deleteProducts.module.scss";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";

import { toastAuthErr, toastPromise } from "@/shared/helpers/toast";

import { deleteProduct } from "../model/deleteProductAsyncThunk";

interface Props {
  name: string;
  id: string;
}

export const DeleteProduct = ({ name, id }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      if (user.isAuth) {
        toastPromise(dispatch(deleteProduct({ id, name, user })));
        navigate("/products");
      } else {
        toastAuthErr();
      }
    } catch (e) {
      console.error(`UPDATE PRODUCT:`, e);
    }
  };

  return (
    <div className={css.deleteProduct}>
      <div>
        <h3>Вы действительно хотите удалить?</h3>
        <p>&quot;{name}&quot;</p>
      </div>

      <button onClick={() => handleDelete()}>Удалить</button>
    </div>
  );
};
