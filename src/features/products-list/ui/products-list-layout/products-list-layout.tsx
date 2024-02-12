import css from "./_products-list-layout.module.scss";

import { ReactNode } from "react";

export function ProductsListLayout({ children }: { children: ReactNode }) {
  return <div className={css.ProductsListLayout}>{children}</div>;
}
