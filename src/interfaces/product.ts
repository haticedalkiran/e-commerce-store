export interface Product {
  id: number;
  name: string;
  images: string[];
  imageAlt: string;
  brand: {
    id: number;
    name: string;
  };
  ratingScore: {
    averageRating: number;
    totalCount: number;
  };
  categoryId: number;
  categoryName: string;
  price: {
    sellingPrice: number;
    originalPrice: number;
    discountedPrice: number;
    buyingPrice: number;
  };
}
