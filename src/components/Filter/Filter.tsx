import { useDispatch, useSelector } from "react-redux";
import { Accordion, TextInput } from "@mantine/core";
import { setFilters } from "../../store/records.state";
import { FilterAccordion } from "./components";
import { RootState } from "../../store/store";
import { useState } from "react";

export default function Filter() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const { brandList, categoryList, priceRanges, rating, selectedFilters } =
    useSelector((state: RootState) => state.records);

  const filterChangeHandler = (value: string | string[], name: string) => {
    dispatch(setFilters({ [name]: value }));
  };

  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value);
    dispatch(setFilters({ searchText: e.target.value }));
  };

  return (
    <Accordion
      bg={"white"}
      multiple
      defaultValue={["Search", "Category", "Brand", "Price Range", "Rating"]}
    >
      <Accordion.Item value={"Search"}>
        <Accordion.Control>{"Search by keyword"}</Accordion.Control>
        <Accordion.Panel>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInput}
          />
        </Accordion.Panel>
      </Accordion.Item>

      <FilterAccordion
        title="Brand"
        items={brandList}
        selectedValues={selectedFilters.brand}
        onChangeCheckbox={(value) => filterChangeHandler(value, "brand")}
        type="checkbox"
        h={200}
      />
      <FilterAccordion
        title="Category"
        items={categoryList}
        selectedValues={selectedFilters.category}
        onChangeCheckbox={(value) => filterChangeHandler(value, "category")}
        type="checkbox"
        h={200}
      />
      <FilterAccordion
        title="Price Range"
        items={priceRanges}
        selectedValues={selectedFilters.price}
        onChangeRadio={(value) => filterChangeHandler(value, "price")}
        type="radio"
      />
      <FilterAccordion
        title="Rating"
        items={rating}
        selectedValues={selectedFilters.rating}
        onChangeRadio={(value) => filterChangeHandler(value, "rating")}
        type="radio"
      />
    </Accordion>
  );
}
