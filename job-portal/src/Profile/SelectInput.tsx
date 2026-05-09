
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