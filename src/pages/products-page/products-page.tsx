import css from "./_products-page.module.scss";
import { BsPlusCircle } from "react-icons/bs";

import { filtrationSwitch } from "@/features/filter-products";

import { useAppSelector } from "@/shared/hooks/use-redux";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";
import FilterButton from "@/shared/ui/buttons/filter-button/filter-button";
import { ProductsList } from "@/widgets/products-list/products-list";

export default function ProductsPage() {
  const { exported, category } = useAppSelector((state) => state.data.filter);
  const { products } = useAppSelector((state) => state.data);

  return (
    <div className={css.products}>
      <div className={css.productsHeader}>
        <HeaderInformer
          title={`${category} ${
            exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
          } `}
          subtitle={`${
            filtrationSwitch(products, category, exported).length
          } продуктов`}
        />

        <div className={css.headerButtons}>
          <NavigateButton
            icon={<BsPlusCircle />}
            className="circle_button"
            to={"/add/"}
          />

          <FilterButton />
        </div>
      </div>

      <ProductsList />
    </div>
  );
}
