import "./_product-id.scss";

import ProductHeader from "./components/product-header";
import ProductBody from "./components/product-body";
import ProductFooter from "./components/product-footer";

export default function ProductId() {
  return (
    <div className="product-id">
      <div className="product-id__wrapper">
        <ProductHeader />
        <ProductBody />
      </div>
      <ProductFooter />
    </div>
  );
}
