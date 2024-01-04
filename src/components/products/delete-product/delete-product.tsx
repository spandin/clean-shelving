import "./_delete-products.scss";

import { useNavigate } from "react-router-dom";

import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { deletedActionsUser } from "@/store/slices/userSlice";

import { getTime } from "date-fns";

export const DeleteProduct = ({ name, id }: { name: string; id: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "data", id));

      await setDoc(doc(db, "activity", id), {
        id: id,
        actioner: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        description: `Удалил - ${name}`,
        madeOn: getTime(new Date()),
      });

      dispatch(deletedActionsUser(user));

      navigate("/products/");
    } catch (e) {
      console.log("DELETE PRODUCT: " + e);
    }
  };

  return (
    <div className="delete-product">
      <div className="delete-product__body">
        <h3>Вы действительно хотите удалить?</h3>
        <p className="delete-product__body__text">&quot;{name}&quot;</p>
      </div>

      <button onClick={() => deleteProduct()}>Удалить</button>
    </div>
  );
};
