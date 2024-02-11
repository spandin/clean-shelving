import { ProductType } from "@/types/types";

export default function findSimilarProducts(
  products: ProductType[],
  searchTerm: string,
  setSimilarItems: React.Dispatch<React.SetStateAction<ProductType[]>>
) {
  const findAndSetState = () => {
    const foundItem = products.filter(
      (item: { code: { toString: () => string } }) =>
        item.code.toString() === searchTerm
    );

    if (foundItem) {
      setSimilarItems(foundItem);
    } else {
      setSimilarItems([]);
    }
  };
  return findAndSetState();
}
