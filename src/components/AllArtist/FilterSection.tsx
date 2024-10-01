import Header from "../ui/Header";
import Select from "react-select";
import search_icon from "./assets/search.png";

const FilterSection = ({ query, search }: any) => {
  const credentialOption = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  return (
    <div className="flex lg:flex-row flex-col xl:gap-10 gap-3 my-10 w-full">
      <div className="flex items-center xl:gap-10 gap-2 2xl:w-[50%] lg:w-[40%]">
        <Header
          variant={{ theme: "dark", weight: "bold" }}
          className="xl:text-3xl sm:text-xl text-md"
        >
          All Artists
        </Header>
        <div className="xl:w-[50%] w-[60%] flex items-center">
          <input
            type="text"
            className="w-full placeholder-gray-400 text-gray-900 p-3 outline-none  border border-[#FF536B] rounded-full"
            placeholder="Search"
            onChange={search}
            value={query}
          />
          <img src={search_icon} alt="search icon" className="-ml-8" />
        </div>
      </div>

      <div className="2xl:w-[50%] lg:w-[60%] flex sm:flex-row flex-col sm:gap-0 gap-4 items-center justify-between">
        <Select
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: state.isFocused ? "#f78494" : "#f78494",
              borderColor: state.isFocused ? "#f78494" : "#f78494",
              borderRadius: "9999px",
              padding: "5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                borderColor: "#f78494",
              },
            }),
          }}
          className="text-black"
          placeholder="Filer by Credentials & Insignias"
          options={credentialOption}
        />

        <Select
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: state.isFocused ? "#f78494" : "#f78494",
              borderColor: state.isFocused ? "#f78494" : "#f78494",
              borderRadius: "9999px",
              padding: "5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                borderColor: "#f78494",
              },
            }),
          }}
          placeholder="Filter By Category"
          options={credentialOption}
        />

        <Select
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: state.isFocused ? "#f78494" : "#f78494",
              borderColor: state.isFocused ? "#f78494" : "#f78494",
              borderRadius: "9999px",
              padding: "5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                borderColor: "#f78494",
              },
            }),
          }}
          placeholder="Filter By style"
          options={credentialOption}
        />
      </div>
    </div>
  );
};

export default FilterSection;
