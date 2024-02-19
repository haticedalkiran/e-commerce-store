import { Container, Grid, Text } from "@mantine/core";
import Filter from "./components/Filter/Filter";
import ProductCard from "./components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useEffect } from "react";
import { applyFilters } from "./store/records.state";
import SortHeader from "./components/Filter/components/SortHeader/SortHeader";
import { Product } from "./interfaces/product";

export default function Layout() {
  const { products, selectedFilters, view } = useSelector(
    (state: RootState) => state.records
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyFilters());
  }, [selectedFilters]);
  return (
    <Container fluid>
      <SortHeader />
      <Grid gutter={"lg"}>
        <Grid.Col span={4}>
          <Filter />
        </Grid.Col>
        <Grid.Col span={8}>
          {products.length === 0 && (
            <Text mt={"md"}>
              No products found. Please search with different keywords.
            </Text>
          )}
          {view === "grid" ? (
            <Grid>
              {products.map((product: Product) => (
                <Grid.Col span={4} key={product?.id}>
                  <ProductCard product={product} />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Grid>
              {products.map((product: Product) => (
                <Grid.Col span={12} key={product?.id}>
                  <ProductCard product={product} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
