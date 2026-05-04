import { useEffect, useState } from 'react';
import {
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
  Checkbox,
  ActionIcon,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface MultiSelectCreatableProps {
  options: string[];
  placeholder: string;
  icon: typeof IconSearch;
  onChange?: (value: string[]) => void;
}

const MultiSelectCreatable = ({
  options,
  placeholder,
  icon: Icon,
  onChange,
}: MultiSelectCreatableProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    setData(options);
  }, [options]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  const handleValueSelect = (val: string) => {
    setSearch('');
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.slice(0, 2).map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      radius="xl"
      className="bg-blue-100 text-blue-700 border-blue-200"
    >
      {item}
    </Pill>
  ));

  const extraCount = value.length > 2 ? `+${value.length - 2}` : null;

  const filteredOptions = data
    .filter((item) =>
      item.toLowerCase().includes(search.toLowerCase().trim())
    )
    .map((item) => (
      <Combobox.Option key={item} value={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            size="xs"
            checked={value.includes(item)}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
            color="blue"
          />
          <span className="text-gray-700">{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.DropdownTarget>
          <PillsInput
            radius="md"
            className="bg-white"
            onClick={() => combobox.openDropdown()}
            leftSection={
              <ActionIcon variant="transparent" color="blue" size="sm">
                <Icon size={16} />
              </ActionIcon>
            }
            rightSection={<Combobox.Chevron />}
          >
            <Pill.Group>
              {values}
              {extraCount && (
                <Pill radius="xl" className="bg-gray-100 text-gray-600">
                  {extraCount}
                </Pill>
              )}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  placeholder={value.length === 0 ? placeholder : ""}
                  className="text-gray-700"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown className="bg-white border-gray-200 shadow-lg">
          <Combobox.Search
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder={`Search ${placeholder}`}
            className="border-b border-gray-200 text-gray-700 placeholder:text-gray-400"
          />
          <Combobox.Options>
            {filteredOptions.length > 0 ? (
              filteredOptions
            ) : (
              <Combobox.Empty className="text-gray-500">No results found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default MultiSelectCreatable;