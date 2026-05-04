// import { useState } from 'react';
// import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
// import { IconCheck } from "@tabler/icons-react";

// interface SelectInputProps {
//   label: string;
//   placeholder: string;
//   options: string[];
//   value?: string;
//   leftSection?: any;
//   description?: string;
//   required?: boolean;
//   creatable?: boolean;
//   onChange?: (value: string) => void;
// }

// const SelectInput = ({ 
//   label, 
//   placeholder, 
//   options, 
//   value, 
//   leftSection: Icon,
//   description,
//   required = false,
//   creatable = true,
//   onChange
// }: SelectInputProps) => {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [data, setData] = useState(options);
//   const [selectedValue, setSelectedValue] = useState<string | null>(value || null);
//   const [search, setSearch] = useState(value || '');

//   const exactOptionMatch = data.some((item) => item === search);
//   const filteredOptions = exactOptionMatch
//     ? data
//     : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

//   const handleOptionSubmit = (val: string) => {
//     if (val === '$create') {
//       const newOption = search;
//       setData((current) => [...current, newOption]);
//       setSelectedValue(newOption);
//       setSearch(newOption);
//       onChange?.(newOption);
//     } else {
//       setSelectedValue(val);
//       setSearch(val);
//       onChange?.(val);
//     }
//     combobox.closeDropdown();
//   };

//   return (
//     <Combobox
//       store={combobox}
//       withinPortal={false}
//       onOptionSubmit={handleOptionSubmit}
//     >
//       <Combobox.Target>
//         <InputBase
//           withAsterisk={required}
//           label={label}
//           description={description}
//           leftSection={Icon && <Icon size={18} stroke={1.5} className="text-gray-500" />}
//           rightSection={<Combobox.Chevron />}
//           value={search}
//           autoComplete="off"
//           onChange={(event) => {
//             combobox.openDropdown();
//             combobox.updateSelectedOptionIndex();
//             setSearch(event.currentTarget.value);
//           }}
//           onClick={() => combobox.openDropdown()}
//           onFocus={() => combobox.openDropdown()}
//           onBlur={() => {
//             combobox.closeDropdown();
//             setSearch(selectedValue || '');
//           }}
//           placeholder={placeholder}
//           className="w-full"
//           classNames={{
//             input: "bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-gray-900",
//             label: "text-gray-700 font-medium mb-1",
//             description: "text-gray-500 text-xs"
//           }}
//         />
//       </Combobox.Target>

//       <Combobox.Dropdown className="bg-white border border-gray-200 shadow-lg rounded-lg">
//         <Combobox.Options>
//           <ScrollArea.Autosize mah={200} type="scroll" className="[&::-webkit-scrollbar]:w-1.5">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((item) => (
//                 <Combobox.Option 
//                   value={item} 
//                   key={item} 
//                   className="hover:bg-gray-50 text-gray-700 cursor-pointer px-3 py-2 text-sm"
//                   active={selectedValue === item}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{item}</span>
//                     {selectedValue === item && (
//                       <IconCheck size={14} className="text-blue-600" />
//                     )}
//                   </div>
//                 </Combobox.Option>
//               ))
//             ) : (
//               <div className="p-3 text-sm text-gray-500 text-center">No options found</div>
//             )}
//             {creatable && !exactOptionMatch && search.trim().length > 0 && (
//               <Combobox.Option 
//                 value="$create" 
//                 className="text-blue-600 hover:bg-blue-50 cursor-pointer px-3 py-2 text-sm border-t border-gray-100"
//               >
//                 + Create "{search}"
//               </Combobox.Option>
//             )}
//           </ScrollArea.Autosize>
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//   );
// };

// export default SelectInput;



// src/Profile/SelectInput.tsx
import { Select } from "@mantine/core";

interface SelectInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string | null) => void;
  data: string[];
  required?: boolean;
  disabled?: boolean;
}

const SelectInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  data, 
  required = false, 
  disabled = false 
}: SelectInputProps) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data={data}
      required={required}
      disabled={disabled}
      radius="md"
      size="md"
      className="w-full"
    />
  );
};

export default SelectInput;