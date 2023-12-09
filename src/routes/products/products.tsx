
import "./_products.scss";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";

export default function Products() {
  
  return (
    <div className="products">
      <ProductsHeader />

      <div className="products__grid">
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
      </div>
    </div>
  );
}
