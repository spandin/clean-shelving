import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import { DocumentData } from "firebase/firestore";

interface IProps {
  product: DocumentData;
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
