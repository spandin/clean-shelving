import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import ButtonBack from "../../common/button-back";

export default function ProductHeader() {
  return (
    <div className="product-id__wrapper__header">
      <div className="product-id__wrapper__header__informer">
        <ButtonBack />
        <div className="product-id__wrapper__header__informer__col">
          <span>Nestle Decaration 75g</span>
          <span>Продукты</span>
        </div>
      </div>

      <div className="product-id__wrapper__header__buttons">
        <button>
          <BsPencilSquare />
        </button>
        <button>
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
}
