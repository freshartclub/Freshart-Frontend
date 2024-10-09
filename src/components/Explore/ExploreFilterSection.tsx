// import Button from "../ui/Button";
// import Header from "../ui/Header";
// import P from "../ui/P";
// import bg_img from "./assets/bg_image.png";
// import cart from "./assets/cart.png";
// import Select from "react-select";

// const ExploreFilterSection = ({
//   setColumnsCount,
//   selectedSize,
//   setSelectedSize,
// }: any) => {
//   const columnOptions = [
//     { value: 4, label: "4 Columns" },
//     { value: 5, label: "5 Columns" },
//     { value: 6, label: "6 Columns" },
//     { value: 7, label: "7 Columns" },
//     { value: 8, label: "8 Columns" },
//   ];

//   const colorOption = [
//     { value: "color1", label: "Color1" },
//     { value: "color2", label: "Color2" },
//     { value: "color3", label: "Color3" },
//   ];

//   const emotionOption = [
//     { value: "color1", label: "Color1" },
//     { value: "color2", label: "Color2" },
//     { value: "color3", label: "Color3" },
//   ];

//   const showOption = [
//     { value: "color1", label: "Color1" },
//     { value: "color2", label: "Color2" },
//     { value: "color3", label: "Color3" },
//   ];

//   const handleSizeChange = (size: string) => {
//     console.log("inside the function");
//     setSelectedSize(size);
//     console.log(size, "should filter the images");
//   };

//   return (
//     <div className="flex flex-wrap 2xl:gap-20 xl:gap-10 lg:gap-7 gap-4 md:smy-10 mb-3">
//       <Button
//         variant={{ rounded: "full", weight: "600" }}
//         className="bg-[#FF536B] flex gap-2 mt-7 items-center justify-center"
//       >
//         <img src={bg_img} alt="image_icon" />
//         <P variant={{ size: "small", theme: "light", weight: "medium" }}>
//           Slideshow
//         </P>
//       </Button>
//       <div>
//         <Header
//           variant={{ size: "md", theme: "dark", weight: "semiBold" }}
//           className="mb-2 "
//         >
//           Column
//         </Header>
//         <div className="flex gap-3 items-center">
//           <Select
//             styles={{
//               control: (provided, state) => ({
//                 ...provided,
//                 boxShadow: state.isFocused ? "#f78494" : "#f78494",
//                 borderColor: state.isFocused ? "#f78494" : "#f78494",
//                 borderRadius: "9999px",
//                 padding: "3px",
//                 textAlign: "center",
//                 display: "flex",
//                 alignItems: "center",
//                 "&:hover": {
//                   borderColor: "#f78494",
//                 },
//               }),
//             }}
//             options={columnOptions}
//             onChange={(option: any) => setColumnsCount(option.value)}
//           />

//           <div>
//             <img src={cart} alt="cart" />
//           </div>
//         </div>
//       </div>

//       <div>
//         <Header
//           variant={{ size: "md", theme: "dark", weight: "semiBold" }}
//           className="mb-2"
//         >
//           Filter Option
//         </Header>
//         <div className="flex flex-wrap gap-3 items-center">
//           <Select
//             styles={{
//               control: (provided, state) => ({
//                 ...provided,
//                 boxShadow: state.isFocused ? "#f78494" : "#f78494",
//                 borderColor: state.isFocused ? "#f78494" : "#f78494",
//                 borderRadius: "9999px",
//                 padding: "3px",
//                 textAlign: "center",
//                 display: "flex",
//                 alignItems: "center",
//                 "&:hover": {
//                   borderColor: "#f78494",
//                 },
//               }),
//             }}
//             options={colorOption}
//           />

//           <Select
//             styles={{
//               control: (provided, state) => ({
//                 ...provided,
//                 boxShadow: state.isFocused ? "#f78494" : "#f78494",
//                 borderColor: state.isFocused ? "#f78494" : "#f78494",
//                 borderRadius: "9999px",
//                 padding: "3px",
//                 textAlign: "center",
//                 display: "flex",
//                 alignItems: "center",
//                 "&:hover": {
//                   borderColor: "#f78494",
//                 },
//               }),
//             }}
//             options={emotionOption}
//           />

//           <Select
//             styles={{
//               control: (provided, state) => ({
//                 ...provided,
//                 boxShadow: state.isFocused ? "#f78494" : "#f78494",
//                 borderColor: state.isFocused ? "#f78494" : "#f78494",
//                 borderRadius: "9999px",
//                 padding: "3px",
//                 textAlign: "center",
//                 display: "flex",
//                 alignItems: "center",
//                 "&:hover": {
//                   borderColor: "#f78494",
//                 },
//               }),
//             }}
//             options={showOption}
//           />

//           <div>
//             <Button
//               variant={{ fontWeight: "500", theme: "dark", rounded: "full" }}
//             >
//               Surprise Me!
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div>
//         <Header
//           variant={{ size: "md", theme: "dark", weight: "semiBold" }}
//           className="mb-2"
//         >
//           Size
//         </Header>

//         <div className="flex justify-center gap-4">
//           {["s", "m", "l", "xl"].map((size) => (
//             <button
//               key={size}
//               className={`p-2 border ${
//                 selectedSize === size ? "bg-gray-400" : "bg-white"
//               }`}
//               onClick={() => handleSizeChange(size)}
//             >
//               {size.toUpperCase()}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <Header
//           variant={{ size: "md", theme: "dark", weight: "semiBold" }}
//           className="mb-2"
//         >
//           Orientation
//         </Header>
//         <div className="flex gap-2 item-center justify-center">
//           <div className="bg-[#E1E1E1] w-8 py-">
//             <P
//               variant={{
//                 size: "small",
//                 theme: "light",
//                 weight: "semiBold",
//               }}
//               className="bg-[#102030] m-2 py-4 px-1 text-center"
//             ></P>
//           </div>
//           <div className="bg-[#E1E1E1] w-12">
//             <P
//               variant={{
//                 size: "small",
//                 theme: "light",
//                 weight: "semiBold",
//               }}
//               className="bg-[#102030] m-2 py-4 px-1 text-center"
//             ></P>
//           </div>
//           <div className="bg-[#E1E1E1] w-12">
//             <P
//               variant={{
//                 size: "small",
//                 theme: "light",
//                 weight: "semiBold",
//               }}
//               className="bg-[#102030] mx-2 my-4 py-2 text-center"
//             ></P>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreFilterSection;

import { useState } from "react";
import Button from "../ui/Button";
import P from "../ui/P";
import Header from "../ui/Header";
import cart from "./assets/cart.png";
import filter_icon from "./assets/filter_icon.png";
import bg_img from "./assets/bg_image.png";
import SelectOption from "../ui/SelectOption";

const ExploreFilterSection = ({
  setColumnsCount,
  selectedSize,
  setSelectedSize,
}: any) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columnOptions = [
    { value: 4, label: "4 Columns" },
    { value: 5, label: "5 Columns" },
    { value: 6, label: "6 Columns" },
    { value: 7, label: "7 Columns" },
    { value: 8, label: "8 Columns" },
  ];

  const colorOption = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  const emotionOption = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  const showOption = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  const handleSizeChange = (size: string) => {
    console.log("inside the function");
    setSelectedSize(size);
    console.log(size, "should filter the images");
  };

  return (
    <div className="flex flex-wrap 2xl:gap-20 xl:gap-3 lg:gap-4 gap-4 md:my-10 mb-3">
      <Button
        variant={{ rounded: "full", weight: "600" }}
        className="bg-[#FF536B] flex gap-2 mt-7 items-center justify-center"
      >
        <img src={bg_img} alt="image_icon" />
        <P variant={{ size: "small", theme: "light", weight: "medium" }}>
          Slideshow
        </P>
      </Button>

      <div className="block lg:hidden mt-7">
        <Button
          variant={{ rounded: "full", theme: "dark" }}
          className="flex items-center justify-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <img src={filter_icon} alt="Filter Icon" />
        </Button>
      </div>

      {(isFilterOpen || window.innerWidth >= 1024) && (
        <div className="flex 2xl:gap-20 xl:gap-5 lg:gap-4 gap-4 flex-wrap">
          <div>
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-2"
            >
              Column
            </Header>
            <div className="flex gap-3 items-center">
              <SelectOption
                options={columnOptions}
                onChange={(option) => setColumnsCount(option.value)}
              />
              <div>
                <img src={cart} alt="cart" />
              </div>
            </div>
          </div>

          {/* Filter Options Section */}
          <div>
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-2"
            >
              Filter Option
            </Header>
            <div className="flex flex-wrap gap-3 items-center">
              <SelectOption options={colorOption} onChange={(option) => {}} />
              <SelectOption options={emotionOption} onChange={(option) => {}} />
              <SelectOption options={showOption} onChange={(option) => {}} />

              <Button
                variant={{ fontWeight: "500", theme: "dark", rounded: "full" }}
              >
                Surprise Me!
              </Button>
            </div>
          </div>

          {/* Size Section */}
          <div>
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-2"
            >
              Size
            </Header>
            <div className="flex justify-center gap-4">
              {["s", "m", "l", "xl"].map((size) => (
                <button
                  key={size}
                  className={`p-2 border ${
                    selectedSize === size ? "bg-gray-400" : "bg-white"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation Section */}
          <div>
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-2"
            >
              Orientation
            </Header>
            <div className="flex gap-2 item-center justify-center">
              <div className="bg-[#E1E1E1] w-8 py-">
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] m-2 py-4 px-1 text-center"
                ></P>
              </div>
              <div className="bg-[#E1E1E1] w-12">
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] m-2 py-4 px-1 text-center"
                ></P>
              </div>
              <div className="bg-[#E1E1E1] w-12">
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] mx-2 my-4 py-2 text-center"
                ></P>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreFilterSection;
