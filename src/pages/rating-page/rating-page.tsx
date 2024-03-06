import css from "./_rating-page.module.scss";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

import RatingList from "@/widgets/rating-list/rating-list";

export default function RatingPage() {
  return (
    <div className={css.ratingList}>
      <div className={css.listHeader}>
        <HeaderInformer title="Рейтинг" subtitle="пользователей" />
      </div>

      <RatingList />
    </div>
  );
}
