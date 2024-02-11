import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

export default function ProductFooter() {
  return (
    <div className="product-id__footer">
      <button className="circle_button">
        <BsPencilSquare />
      </button>
      <button className="circle_button">
        <BsTrash3 />
      </button>
    </div>
  );
}
