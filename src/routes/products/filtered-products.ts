import { findInArrayBy, isExported, isNotExported } from "@/lib/sort";
import { ProductType } from "@/types/types";

export const FilteredProducts = (
  products: ProductType[],
  category?: string,
  exported?: string | boolean
) => {
  switch (category) {
    case "Все":
      if (exported === "Все") {
        return products;
      } else if (exported === true) {
        return isExported(products);
      } else {
        return isNotExported(products);
      }

    case "Продукты":
      if (exported === "Все") {
        return findInArrayBy(products, "Продукты");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Продукты"));
      } else {
        return isNotExported(findInArrayBy(products, "Продукты"));
      }

    case "Химия":
      if (exported === "Все") {
        return findInArrayBy(products, "Химия");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Химия"));
      } else {
        return isNotExported(findInArrayBy(products, "Химия"));
      }

    case "Алкоголь":
      if (exported === "Все") {
        return findInArrayBy(products, "Алкоголь");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Алкоголь"));
      } else {
        return isNotExported(findInArrayBy(products, "Алкоголь"));
      }

    case "Косметика":
      if (exported === "Все") {
        return findInArrayBy(products, "Косметика");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Косметика"));
      } else {
        return isNotExported(findInArrayBy(products, "Косметика"));
      }

    case "Другое":
      if (exported === "Все") {
        return findInArrayBy(products, "Другое");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Другое"));
      } else {
        return isNotExported(findInArrayBy(products, "Другое"));
      }

    default:
      return products;
  }
};
