import { useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';

interface SelectInputProps {
  label: string;
  placeholder: string;
  options: string[];
}

const SelectInput = ({ label, placeholder, options }: SelectInputProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState(options);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const displayOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current) => [...current, search]);
          setValue(search);
          setSearch(search);
        } else {
          setValue(val);
          setSearch(val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
          variant="filled"
        />
      </Combobox.Target>

      {/* FIXED: Added back the opening Combobox.Dropdown tag */}
      <Combobox.Dropdown className="bg-mine-shaft-900 border-mine-shaft-700">
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {displayOptions}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create" className="text-bright-sun-400">
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;