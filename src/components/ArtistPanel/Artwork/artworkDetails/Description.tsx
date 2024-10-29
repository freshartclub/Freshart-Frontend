const Description = () => {
  return (
    <div className="space-y-6 mt-4  ">
      {/* Specifications Section */}
      <div>
        <h2 className="font-bold text-lg md:text-xl mb-4 text-[#1C252E]">
          Specifications
        </h2>
        <div className="flex flex-col space-y-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 text-[#1C252E]">
          {/* Specification Item */}
          <div className="flex justify-between">
            <span>Category</span>
            <span>Illustration</span>
          </div>
          <div className="flex justify-between">
            <span>Tags</span>
            <span>art, nude, artist</span>
          </div>
          <div className="flex justify-between">
            <span>Serial number</span>
            <span>358607726380311</span>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <span>United States</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div>
        <h2 className="font-bold text-lg md:text-xl mb-4 text-[#1C252E]">
          Product details
        </h2>
        <ul className="list-disc pl-4 text-sm md:text-base text-[#1C252E]">
          <li>The foam sockliner feels soft and comfortable.</li>
          <li>Pull tab</li>
          <li>Not intended for use as Personal Protective Equipment</li>
          <li>
            Colour Shown: White/Black/Oxygen Purple/Action Grape
            <li> Style: 921826-109</li>
          </li>
          <li>Country/Region of Origin: China</li>
        </ul>
      </div>

      {/* Benefits Section */}
      <div>
        <h2 className="font-bold text-lg md:text-xl mb-4 text-[#1C252E]">
          Benefits
        </h2>
        <ul className="list-disc pl-4 text-sm md:text-base text-[#1C252E]">
          <li>
            Mesh and synthetic materials on the upper keep the fluid look of the
            OG while adding comfort and durability.
          </li>
          <li>
            Originally designed for performance running, the full-length Max Air
            unit adds soft, comfortable cushioning underfoot.
          </li>
          <li>The foam midsole feels springy and soft.</li>
          <li>The rubber outsole adds traction and durability.</li>
        </ul>
      </div>

      {/* Delivery and Returns Section */}
      <div className="text-[#1C252E]">
        <h2 className="font-bold text-lg md:text-xl mb-4 text-[#1C252E]">
          Delivery and returns
        </h2>
        <p className="mb-2">
          Your order of $200 or more gets free standard delivery.
        </p>
        <ul className="list-disc pl-4 text-sm md:text-base">
          <li>Standard delivered in 4-5 Business Days</li>
          <li>Express delivered in 2-4 Business Days</li>
        </ul>
        <p className="mt-2">
          Orders are processed and delivered Monday-Friday (excluding public
          holidays).
        </p>
      </div>
    </div>
  );
};

export default Description;
