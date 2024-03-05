import css from "./_add-products-page.module.scss";

import { AddProductForm } from "@/features/add-product";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function AddProductPage() {
  return (
    <div className={css.addProduct}>
      <div className={css.addProductHeader}>
        <HeaderInformer title="Добавление" />
      </div>
      <AddProductForm />
    </div>
  );
}
