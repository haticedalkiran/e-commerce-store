import { Box, Button, Card, Flex, Image, Rating, Text } from "@mantine/core";
import { useSelector } from "react-redux";

interface ProductCardProps {
  product: any; //todo
}

export default function ProductCard({ product }: ProductCardProps) {
  const view = useSelector((state: any) => state.records.view);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      styles={{
        root: {
          flexDirection: view === "list" ? "row" : "column",
        },
        section: {
          flex: 1,
        },
      }}
    >
      <Card.Section>
        <Image
          src={"https://cdn.dsmcdn.com" + product.images[0]}
          height={200}
          alt={product.imageAlt}
        />
      </Card.Section>

      <Box flex={view === "list" ? "2" : "1"}>
        <Text fw={500} lineClamp={2}>
          <b> {product.brand.name}</b> {product.name}
        </Text>
        {product.ratingScore && (
          <Flex align={"center"}>
            <Rating
              size="xs"
              value={product.ratingScore?.averageRating}
              readOnly
            />
            <Text> {"(" + product.ratingScore?.totalCount + ")"} </Text>
          </Flex>
        )}

        <Text> {product.price.sellingPrice} TL</Text>
        <Button fullWidth mt="md" variant="outline">
          Add to cart
        </Button>
      </Box>
    </Card>
  );
}
