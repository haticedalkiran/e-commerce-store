import { createSlice } from "@reduxjs/toolkit";
import { mockData } from "../mock/mockData";
import { Product } from "../interfaces/product";
import { RadioItem } from "../interfaces/radioItem";
import { IdNamePair } from "../interfaces/idNamePair";

interface RecordsState {
  products: Product[];
  categoryList: {
    name: string;
    id: string;
  }[];
  brandList: {
    name: string;
    id: string;
  }[];
  priceRanges: RadioItem[];
  rating: RadioItem[];
  sort: string;
  searchText: string;

  selectedFilters: {
    category: string[];
    brand: string[];
    price: string;
    rating: string;
    sort: string;
    searchText: string;
  };
  enableClearFilter: boolean;
  view: string;
}

const initialState: RecordsState = {
  products: mockData as Product[],
  categoryList: mockData
    .map((product) => {
      return {
        name: product.categoryName,
        id: product.categoryId.toString(),
      };
    })
    .filter((category: IdNamePair, index: number, self: IdNamePair[]) => {
      return (
        index ===
        self.findIndex((t: IdNamePair) => {
          return t.id === category.id;
        })
      );
    })
    .sort((a: IdNamePair, b: IdNamePair) => {
      return a.name.localeCompare(b.name);
    }),

  brandList: mockData
    .map((product) => {
      return { name: product.brand.name, id: product.brand.id.toString() };
    })
    .filter((brand: IdNamePair, index: number, self: IdNamePair[]) => {
      return (
        index ===
        self.findIndex((t: IdNamePair) => {
          return t.id === brand.id;
        })
      );
    })
    .sort((a: IdNamePair, b: IdNamePair) => {
      return a.name.localeCompare(b.name);
    }),
  priceRanges: [
    { id: "1", name: "0-100 TL", min: 0, max: 99 },
    { id: "2", name: "100-500 TL", min: 100, max: 499 },
    { id: "3", name: "500-1000 TL", min: 500, max: 999 },
    { id: "4", name: "1000-5000 TL", min: 1000, max: 4999 },
    { id: "5", name: "5000-10000 TL", min: 5000, max: 9999 },
    { id: "6", name: "10000+ TL", min: 10000, max: 999999 },
  ],
  rating: [
    { id: "1", name: "1 star and above", min: 1 },
    { id: "2", name: "2 star and above", min: 2 },
    { id: "3", name: "3 star and above", min: 3 },
    { id: "4", name: "4 star and above", min: 4 },
    { id: "5", name: "4.5 star and above", min: 4.5 },
  ],
  sort: "default",
  searchText: "",

  selectedFilters: {
    category: [],
    brand: [],
    price: "",
    rating: "",
    sort: "default",
    searchText: "",
  },
  enableClearFilter: false,
  view: "grid",
};

export const RecordsState = createSlice({
  name: "RecordsState",
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...action.payload,
      };
      state.enableClearFilter = true;
    },
    applyFilters: (state) => {
      const { brand, category, price, sort, searchText, rating } =
        state.selectedFilters;
      let temp: Product[] = initialState.products;

      if (rating !== "") {
        initialState.rating.filter((rate: RadioItem) => {
          if (rate.id === rating) {
            //TODO: burada< rating/> yuvarlama yapıyor. filtre doğru ama uida yanlış anlaşılablir
            temp = temp.filter((product) => {
              return product.ratingScore?.averageRating >= rate.min;
            });
          }
        });
      }
      if (sort !== "default") {
        if (sort === "asc") {
          temp = [...temp].sort((a, b) => {
            return a.price.sellingPrice - b.price.sellingPrice;
          });
        } else if (sort === "desc") {
          temp = [...temp].sort((a, b) => {
            return b.price.sellingPrice - a.price.sellingPrice;
          });
        } else if (sort === "review") {
          temp = [...temp].sort((a, b) => {
            return b.ratingScore?.totalCount - a.ratingScore?.totalCount;
          });
        } else if (sort === "liked") {
          temp = [...temp].sort((a, b) => {
            return b.ratingScore?.averageRating - a.ratingScore?.averageRating;
          });
        }
      }

      if (brand.length > 0) {
        temp = temp.filter((product) =>
          brand.includes(product.brand.id.toString())
        );
      }

      if (category.length > 0) {
        temp = temp.filter((product) =>
          category.includes(product.categoryId.toString())
        );
      }

      if (price !== "" && price !== undefined) {
        initialState.priceRanges.filter((range: RadioItem) => {
          if (range.id === price) {
            temp = temp.filter((product) => {
              return (
                product.price.sellingPrice >= range.min &&
                product.price.sellingPrice <= (range?.max ?? 0)
              );
            });
          }
        });
      }

      if (searchText !== "") {
        temp = temp.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.brand.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            product.categoryName
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
        });
      }

      state.products = temp;
    },
    clearFilters: (state) => {
      state.selectedFilters = {
        category: [],
        brand: [],
        price: "",
        rating: "",
        sort: "default",
        searchText: "",
      };
      state.enableClearFilter = false;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});
export const { setFilters, applyFilters, setView, clearFilters } =
  RecordsState.actions;

export default RecordsState.reducer;
