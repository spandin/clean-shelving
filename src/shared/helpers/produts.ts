import { ProductType } from "@/shared/types/types";

export const isExported = (array: ProductType[]): ProductType[] =>
  array.filter((product) => product.actions.exported.isExported === true);

export const isNotExported = (array: ProductType[]): ProductType[] =>
  array.filter((product) => product.actions.exported.isExported === false);

export const findInArrayBy = (
  array: ProductType[],
  by: string
): ProductType[] =>
  array.filter((product) =>
    Object.values(product).some((value) => ("" + value).indexOf(by) !== -1)
  );
