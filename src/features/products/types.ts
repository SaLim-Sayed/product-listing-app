/** Category chip for sidebar / modal filters */
export type CategoryChip = {
  id: string;
  label: string;
  filterSlug: string | null;
};

/** Shape returned by https://fakestoreapi.com/products and /products/:id */
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
