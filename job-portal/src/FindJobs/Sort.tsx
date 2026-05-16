// import { useState } from "react";
import { Combobox, useCombobox, Button, Text, Group } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";

const options = ["Most Recent", "Salary (High to Low)", "Salary (Low to High)"];

interface SortProps {
  setSortBy: (value: string) => void;
  currentSort: string;
}

const Sort = ({ setSortBy, currentSort }: SortProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Group justify="flex-end">
      <Combobox
        store={combobox}
        onOptionSubmit={(value) => {
          setSortBy(value);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button
            variant="outline"
            color="blue"
            radius="xl"
            size="md"
            onClick={() => combobox.toggleDropdown()}
            rightSection={<IconArrowsSort size={16} />}
            className="border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          >
            Sort: {currentSort}
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown className="bg-white border-gray-200 shadow-lg">
          <Combobox.Options>
            {options.map((item) => (
              <Combobox.Option
                value={item}
                key={item}
                className="hover:bg-blue-50 data-[selected]:bg-blue-100 text-gray-700 cursor-pointer"
              >
                <Text size="sm">{item}</Text>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Group>
  );
};

export default Sort;
