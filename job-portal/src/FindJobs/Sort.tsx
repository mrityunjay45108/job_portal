import { useState } from 'react';
import {
  Combobox,
  useCombobox,
  Button,
  Text,
  Group,
  Box,
} from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const options = [
  'Relevance',
  'Most Recent',
  'Salary (Low to High)',
  'Salary (High to Low)',
];

const Sort = () => {
  const [selectedItem, setSelectedItem] = useState('Relevance');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    // SAME horizontal padding as above filter row
    <Box px="md">
      <Group justify="flex-end">
        <Combobox
          store={combobox}
          onOptionSubmit={(value) => {
            setSelectedItem(value);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <Button
              variant="outline"
              color="yellow"
              radius="xl"              // 🔥 curved border
              px="md"
              onClick={() => combobox.toggleDropdown()}
              rightSection={<IconAdjustments size={18} />}
            >
              {selectedItem}
            </Button>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {options.map((item) => (
                <Combobox.Option value={item} key={item}>
                  <Text size="sm">{item}</Text>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Group>
    </Box>
  );
};

export default Sort;
