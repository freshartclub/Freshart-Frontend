import React, { useState } from "react";
// Import your images from the assets folder
import mainProduct from "../artworkDetails/assets/main.png";
import thumb1 from "../artworkDetails/assets/oiloncanvasofalittlegirl.jpg_1.png";
import thumb2 from "../artworkDetails/assets/oiloncanvasofalittlegirl.jpg_2.png";
import thumb3 from "../artworkDetails/assets/oiloncanvasofalittlegirl.jpg_6.png";
import thumb4 from "../artworkDetails/assets/oiloncanvasofalittlegirl.jpg_1.png";

const ProductImage = () => {
  // Define your images
  const images = [mainProduct, thumb1, thumb2, thumb3, thumb4];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center lg:ml-10 w-full md:w-[80%] ">
      {/* Main Slider Image */}
      <div className="relative w-[90vw] sm:w-[570px] max-w-xl h-[90vw] sm:h-[570px] rounded-lg shadow-lg overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Main Product"
          className="w-full h-full  object-cover"
        />
        {/* Previous Button */}
        <button
          onClick={prevImage}
          className="absolute top-[90%] left-4 sm:left-[10%] transform -translate-y-1/2 bg-gray-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-gray-600"
        >
          {"<"}
        </button>
        {/* Next Button */}
        <button
          onClick={nextImage}
          className="absolute top-[90%] right-4 sm:right-[10%] transform -translate-y-1/2 bg-gray-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-gray-600"
        >
          {">"}
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2 mt-4">
        {images.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`Thumbnail ${index + 1}`}
            className={`w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg cursor-pointer border-2 ${
              currentImageIndex === index ? "border-green-500 opacity-100" : "opacity-50"
            }`}
            onClick={() => setCurrentImageIndex(index)} // Click to set the current image
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;