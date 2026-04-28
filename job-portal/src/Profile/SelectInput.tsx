import { useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox, Button } from '@mantine/core';
import { fields } from "../Data/MainProfileData"; 

// 1. Internal SelectInput Component (For better organization)
interface SelectInputProps {
  label: string;
  placeholder: string;
  options: string[];
  value?: string;
  leftSection?: any;
}

const SelectInput = ({ label, placeholder, options, value, leftSection: Icon }: SelectInputProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState(options);
  const [selectedValue, setSelectedValue] = useState<string | null>(value || null);
  const [search, setSearch] = useState(value || '');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const displayOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} className="hover:bg-mine-shaft-800 transition-colors">
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
          setSelectedValue(search);
          setSearch(search);
        } else {
          setSelectedValue(val);
          setSearch(val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={label}
          leftSection={Icon && <Icon size={18} stroke={1.5} className="text-mine-shaft-300" />}
          rightSection={<Combobox.Chevron />}
          value={search}
          autoComplete="off"
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(selectedValue || '');
          }}
          placeholder={placeholder}
          variant="filled"
          className="w-full"
        />
      </Combobox.Target>

      <Combobox.Dropdown className="bg-mine-shaft-900 border-mine-shaft-700">
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {displayOptions.length > 0 ? displayOptions : (
              <div className="p-2 text-sm text-mine-shaft-400">Nothing found</div>
            )}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create" className="text-bright-sun-400">
                + Create "{search}"
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

// 2. Main ProfileEdit Component
const ProfileEdit = () => {
  return (
    <div className="p-6 bg-mine-shaft-950 rounded-xl space-y-6">
      <div className="text-2xl font-bold text-white mb-4">Edit Profile</div>
      
      {/* Row 1: Job Title & Company */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SelectInput {...fields[0]} />
        </div>
        <div className="flex-1">
          <SelectInput {...fields[1]} />
        </div>
      </div>

      {/* Row 2: Location */}
      <div className="w-full">
        <SelectInput {...fields[2]} />
      </div>

      {/* Row 3: Additional Fields (4 & 5) */}
      <div className="flex flex-col md:flex-row gap-4">
        {fields[3] && (
           <div className="flex-1">
             <SelectInput {...fields[3]} />
           </div>
        )}
        {fields[4] && (
           <div className="flex-1">
             <SelectInput {...fields[4]} />
           </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button color="brightSun.4" variant="filled" fullWidth size="lg" className="rounded-lg">
            Save Changes
        </Button>
        <Button color="red.7" variant="outline" fullWidth size="lg" className="rounded-lg">
            Discard
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;