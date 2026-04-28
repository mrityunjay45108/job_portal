import { useEffect, useState } from 'react';
import {
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
  Checkbox,
  ActionIcon,
  Input,
} from '@mantine/core';
import { TablerIcon } from '@tabler/icons-react';

interface MultiSelectCreatableProps {
  options: string[];
  placeholder: string;
  icon: TablerIcon;
}

const MultiSelectCreatable = ({
  options,
  placeholder,
  icon: Icon,
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

  const values = value.slice(0, 1).map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      radius="xl"
      color="yellow"
      variant="outline"
    >
      {item}
    </Pill>
  ));

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
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput
          radius="xl"
          styles={{
            input: {
              backgroundColor: 'transparent',
              border: '1px solid #facc15', // yellow-400
            },
          }}
          onClick={() => combobox.openDropdown()}
          leftSection={
            <ActionIcon variant="transparent" color="yellow">
              <Icon size={18} />
            </ActionIcon>
          }
          rightSection={<Combobox.Chevron />}
        >
          <Pill.Group>
            {value.length > 0 ? (
              values
            ) : (
              <Input.Placeholder style={{ color: '#facc15' }}>
                {placeholder}
              </Input.Placeholder>
            )}
            <Combobox.EventsTarget>
              <PillsInput.Field />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder={`Search ${placeholder}`}
        />
        <Combobox.Options>
          {filteredOptions.length > 0 ? (
            filteredOptions
          ) : (
            <Combobox.Empty>No results</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiSelectCreatable;
