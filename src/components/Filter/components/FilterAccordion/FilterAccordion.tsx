import {
  Accordion,
  AccordionControl,
  Checkbox,
  Radio,
  Text,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../../store/records.state";

interface FilterAccordionProps {
  title?: string;
  filterlist?: { id: string; name: string }[];
  expanded?: boolean;
  isCheckbox?: boolean;
  onChange?: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function FilterAccordion({
  title = "Category",
  expanded,
  isCheckbox = true,
  onChange,
  filterlist = [
    { id: "1", name: "Filter 1" },
    { id: "2", name: "Filter 2" },
  ],
}: FilterAccordionProps) {
  const dispatch = useDispatch();

  const filterChangeHandler = (value: any) => {
    dispatch(setFilters({ [title]: value }));
  };

  return (
    <Accordion multiple bg={"white"} radius="md" px={"md"}>
      <Accordion.Item value="2">
        <AccordionControl>{title}</AccordionControl>
        <Accordion.Panel>
          {isCheckbox ? (
            <>
              <Checkbox.Group onChange={filterChangeHandler}>
                {filterlist.map((item, index) => (
                  <Checkbox value={item.id} key={index} label={item.name} />
                ))}
              </Checkbox.Group>
            </>
          ) : (
            <Radio.Group onChange={filterChangeHandler}>
              {filterlist.map((item, index) => (
                <Radio value={item.id} key={index} label={item.name} />
              ))}
            </Radio.Group>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
