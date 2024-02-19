import {
  ActionIcon,
  Box,
  ButtonGroup,
  Flex,
  Group,
  Text,
  TextInput,
  Select,
  Button,
} from "@mantine/core";
import { IconLayoutList, IconLayoutGrid } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setFilters,
  setView,
} from "../../../../store/records.state";
import { RootState } from "../../../../store/store";

export default function SortHeader() {
  const { view, enableClearFilter, selectedFilters, products } = useSelector(
    (state: RootState) => state.records
  );

  const dispatch = useDispatch();

  const handleView = (e: string) => {
    view !== e && dispatch(setView(e));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Box bg={"white"} p="md" mb={"md"}>
      <Flex justify={"space-between"} align="center">
        <Group>
          <Box>
            <Text size="lg">Products</Text>
            <Text size="sm">{products.length} products found</Text>
          </Box>
          {enableClearFilter && (
            <Button onClick={handleClearFilters}>Clear Filters </Button>
          )}
        </Group>

        <Flex gap={"lg"}>
          <Group>
            <Text>Sort By:</Text>
            <Select
              defaultValue={"default"}
              value={selectedFilters.sort}
              data={[
                { label: "Default", value: "default" },
                { label: "Ascending Price", value: "asc" },
                { label: "Descending Price", value: "desc" },
                { label: "Most Reviewed", value: "review" },
                { label: "Most Liked", value: "liked" },
              ]}
              onChange={(e) => dispatch(setFilters({ sort: e }))}
            />
          </Group>
          <Group>
            <Text>View:</Text>
            <ButtonGroup>
              <ActionIcon
                variant={view === "list" ? "" : "default"}
                onClick={() => handleView("list")}
                mr={"sm"}
              >
                <IconLayoutList />
              </ActionIcon>
              <ActionIcon
                variant={view === "grid" ? "" : "default"}
                onClick={() => handleView("grid")}
              >
                <IconLayoutGrid />
              </ActionIcon>
            </ButtonGroup>
          </Group>
        </Flex>
      </Flex>
    </Box>
  );
}
