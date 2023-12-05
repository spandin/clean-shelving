import "./_products.scss";

import ProductCard from "../../components/products/product-card";
import ProductsHeader from "../../components/products/products-header";

export default function Products() {
  return (
    <div className="products">
      <ProductsHeader />

      <div className="products__grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
