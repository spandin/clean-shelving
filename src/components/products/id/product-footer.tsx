import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

export default function ProductFooter() {
  return (
    <div className="product-id__footer">
      <button>
        <BsPencilSquare />
      </button>
      <button>
        <BsTrash3 />
      </button>
    </div>
  );
}
