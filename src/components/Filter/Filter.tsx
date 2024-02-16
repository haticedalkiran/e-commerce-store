import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionControl,
  Checkbox,
  Radio,
  ScrollArea,
} from "@mantine/core";
import { setFilters } from "../../store/records.state";

export default function Filter() {
  const dispatch = useDispatch();
  const { brandList, categoryList, priceRanges, rating, selectedFilters } =
    useSelector((state: any) => state.records);

  const filterChangeHandler = (value: any, name: string) => {
    dispatch(setFilters({ [name]: value }));
  };
  return (
    <>
      <Accordion
        multiple
        bg={"white"}
        radius="md"
        px={"md"}
        defaultValue={["1", "2", "3", "4"]}
      >
        <Accordion.Item value="1">
          <AccordionControl>brand</AccordionControl>
          <Accordion.Panel>
            <ScrollArea h={250}>
              <Checkbox.Group
                value={selectedFilters.brand}
                onChange={(e) => filterChangeHandler(e, "brand")}
              >
                {brandList.map((item: any, index: string) => (
                  <Checkbox key={index} label={item.name} value={item.id} />
                ))}
              </Checkbox.Group>
            </ScrollArea>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <AccordionControl>category</AccordionControl>
          <Accordion.Panel>
            <ScrollArea h={250}>
              <Checkbox.Group
                value={selectedFilters.category}
                onChange={(e) => filterChangeHandler(e, "category")}
              >
                {categoryList.map((item: any, index: string) => (
                  <Checkbox key={index} label={item.name} value={item.id} />
                ))}
              </Checkbox.Group>
            </ScrollArea>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <AccordionControl>price range</AccordionControl>
          <Accordion.Panel>
            <Radio.Group
              value={selectedFilters.price}
              onChange={(e) => filterChangeHandler(e, "price")}
            >
              {priceRanges.map((item: any, index: string) => (
                <Radio value={item.id} key={index} label={item.name} />
              ))}
            </Radio.Group>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="4">
          <AccordionControl>rating</AccordionControl>
          <Accordion.Panel>
            <Radio.Group
              value={selectedFilters.rating}
              onChange={(e) => filterChangeHandler(e, "rating")}
            >
              {rating.map((item: any, index: string) => (
                <Radio value={item.id} key={index} label={item.name} />
              ))}
            </Radio.Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
