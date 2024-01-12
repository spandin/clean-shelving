import Informer from "@/shared/components/common/informer/informer";
import { ProductType } from "@/types/types";
import { DocumentData } from "firebase/firestore";

import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

interface IProps {
  product: ProductType | DocumentData;
}

export default function ProductHeader({ product }: IProps) {
  return (
    <div className="product-id__wrapper__header">
      <Informer title={`${product.name}`} subtitle={product.category} />

      <div className="product-id__wrapper__header__buttons">
        <button className="circle_button">
          <BsPencilSquare />
        </button>
        <button className="circle_button">
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
}
