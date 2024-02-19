import { Accordion, ScrollArea, Checkbox, Radio } from "@mantine/core";
import { IdNamePair } from "../../../../interfaces/idNamePair";

interface FilterAccordionProps {
  title: string;
  items: IdNamePair[];
  selectedValues: string | string[];
  onChangeCheckbox?: (value: string[]) => void;
  onChangeRadio?: (value: string) => void;
  type: "checkbox" | "radio";
  h?: number;
}

export default function FilterAccordion({
  title,
  items,
  selectedValues,
  onChangeCheckbox,
  onChangeRadio,
  type,
  h,
}: FilterAccordionProps) {
  return (
    <Accordion.Item value={title}>
      <Accordion.Control>{title}</Accordion.Control>
      <Accordion.Panel>
        <ScrollArea h={h || "unset"}>
          {type === "checkbox" ? (
            <Checkbox.Group
              value={Array.isArray(selectedValues) ? selectedValues : []}
              onChange={onChangeCheckbox}
            >
              {items.map((item, index) => (
                <Checkbox key={index} label={item.name} value={item.id} />
              ))}
            </Checkbox.Group>
          ) : (
            <Radio.Group
              value={typeof selectedValues === "string" ? selectedValues : ""}
              onChange={(e) => onChangeRadio && onChangeRadio(e)}
            >
              {items.map((item, index) => (
                <Radio key={index} label={item.name} value={item.id} />
              ))}
            </Radio.Group>
          )}
        </ScrollArea>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
