import css from "./_similar-list.module.scss";

import { ProductType } from "@/shared/types/types";

import { SimilarCard } from "@/entities/similar";

export default function SimilarList({ items }: { items: ProductType[] }) {
  return (
    <div className={css.similarList}>
      <h3>Схожие продукты</h3>

      {items.map((item) => {
        return <SimilarCard item={item} />;
      })}
    </div>
  );
}
