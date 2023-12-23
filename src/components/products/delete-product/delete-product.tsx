import { useNavigate } from "react-router-dom";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteProduct = ({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "data", id));
      navigate("/");
    } catch (error) {
      console.log("DELETE PRODUCT: " + error);
    }
  };

  return (
    <div className="delete-product">
      <div className="delete-product__body">
        <h3>Вы действительно хотите удалить?</h3>
        <p className="delete-product__body__text">&quot;{name}&quot;</p>
      </div>

      <button value="Удалить" onClick={() => deleteProduct()} />
    </div>
  );
};
