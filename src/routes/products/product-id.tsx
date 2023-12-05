import "./_product-id.scss";

import ProductHeader from "../../components/products/id/product-header";
import ProductBody from "../../components/products/id/product-body";
import ProductFooter from "../../components/products/id/product-footer";

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
