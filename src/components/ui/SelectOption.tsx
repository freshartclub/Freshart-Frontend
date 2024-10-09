import Select from "react-select";

const SelectOption = ({
  options,
  onChange,
  placeholder,
}: {
  options: any;
  onChange: (option: any) => void;
  placeholder?: string;
}) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={{
        control: (provided, state) => ({
          ...provided,
          boxShadow: state.isFocused ? "#f78494" : "#f78494",
          borderColor: state.isFocused ? "#f78494" : "#f78494",
          borderRadius: "9999px",
          padding: "3px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          "&:hover": {
            borderColor: "#f78494",
          },
        }),
      }}
    />
  );
};

export default SelectOption;
