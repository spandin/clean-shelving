import { findInArrayBy, isExported, isNotExported } from "@/lib/sort";
import { ProductType } from "@/types/types";

export const FilteredProducts = (
  products: ProductType[],
  category: string,
  exported: string | boolean
) => {
  switch (category) {
    case "all":
      if (exported === "all") {
        return products;
      } else {
        return isNotExported(products);
      }

    case "products":
      if (exported === "all") {
        return findInArrayBy(products, "Продукты");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Продукты"));
      } else {
        return isNotExported(findInArrayBy(products, "Продукты"));
      }

    case "chemistry":
      if (exported === "all") {
        return findInArrayBy(products, "Химия");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Химия"));
      } else {
        return isNotExported(findInArrayBy(products, "Химия"));
      }

    case "alcohol":
      if (exported === "all") {
        return findInArrayBy(products, "Алкоголь");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Алкоголь"));
      } else {
        return isNotExported(findInArrayBy(products, "Алкоголь"));
      }

    case "cosmetic":
      if (exported === "all") {
        return findInArrayBy(products, "Косметика");
      } else if (exported === true) {
        return isExported(findInArrayBy(products, "Косметика"));
      } else {
        return isNotExported(findInArrayBy(products, "Косметика"));
      }

    case "other":
      if (exported === "all") {
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
