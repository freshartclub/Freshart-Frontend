import compare from "./assets/compare.png";
import favorite from "./assets/favorite.png";
import share from "./assets/share.png";

const ProductInfo = () => {
  return (
    <div className="flex flex-col space-y-3 p-4 md:p-6 lg:p-8">
      <p className="text-[#00B8D9] font-bold text-xs sm:text-sm uppercase">
        NEW ARRIVAL
      </p>
      <h5 className="text-lg sm:text-xl font-bold  text-[#1C252E]">
        Midnight 3d creative
      </h5>
      <p className="text-[#1C252E] text-sm sm:text-base">
        Upload by{" "}
        <b className="border-b-[1px] border-black text-[#1C252E]">
          Andrew Martin
        </b>
      </p>

      <p className="text-sm sm:text-md text-[#1C252E]">Creation year: 2024</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span className="text-[#919EAB] text-xl sm:text-2xl font-bold line-through">
          $93.10
        </span>
        <span className="text-[#1C252E] text-xl sm:text-2xl font-bold">
          $63.61
        </span>
      </div>

      <p className="text-[#637381] text-sm sm:text-base">
        Featuring the original ripple design inspired by Japanese bullet trains,
        the Nike Air Max 97 lets you push your style full-speed ahead.
      </p>

      <hr />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <p className="font-bold text-[#1C252E] text-sm">Color</p>
        <div className="space-x-4 flex items-center">
          <button className="w-6 h-6 rounded-full bg-green-500"></button>
          <button className="w-4 h-4 rounded-full bg-[#00B8D9]"></button>
          <button className="w-4 h-4 rounded-full bg-[#003768]"></button>
          <button className="w-4 h-4 rounded-full bg-[#FFAB00]"></button>
          <button className="w-6 h-6 rounded-full bg-purple-500"></button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label
          htmlFor="size"
          className="block text-[#1C252E] font-bold text-sm"
        >
          Size
        </label>
        <div>
          <select id="size" className="border rounded-md p-2 w-full sm:w-auto">
            <option>10.5</option>
            <option>11</option>
            <option>12</option>
          </select>
          <p className="text-[#1C252E] mt-2 border-b border-black font-semibold">
            Size Chart
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <label
          htmlFor="theme"
          className="block text-[#1C252E] font-bold text-sm mt-4"
        >
          Theme
        </label>
        <p className="text-sm text-[#1C252E] mt-4">Dark</p>
      </div>

      <hr />

      <div className="flex flex-col  sm:flex-row space-y-0 sm:space-y-0 sm:space-x-4 mt-4 sm:items-center justify-center  text-[#637381] font-semibold">
        <div className="flex  flex-row items-center">
          <img src={compare} alt="Compare" />
          <button className="px-4 py-2">Compare</button>
        </div>
        <div className="flex items-center">
          <img src={favorite} alt="Favorite" />
          <button className="px-4 py-2">Favorite</button>
        </div>
        <div className="flex items-center">
          <img src={share} alt="Share" />
          <button className="px-4 py-2">Share</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
