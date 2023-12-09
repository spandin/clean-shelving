import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";

export default function ProductHeader() {
  return (
    <div className="product-id__wrapper__header">
      <Informer title="Название товара" subtitle="Категория" />

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
