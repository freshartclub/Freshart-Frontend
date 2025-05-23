import { useState, useEffect, useRef } from "react";
import { imageUrl } from "../utils/baseUrls";

const ArtworkPlacementStep = ({
  selectedImage,
  cropSelection,
  artwork,
  artworkPosition,
  setArtworkPosition,
  onNext,
  onPrev,
  imageSizeS,
  onClose
}) => {
  const containerRef = useRef(null);
  const artworkRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [finalImage, setFinalImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Handle artwork dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - artworkPosition.x,
      y: e.clientY - artworkPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !cropSelection || !artworkRef.current) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    console.log(newX, newY, "kuch values")

    const maxX = cropSelection.width - (artworkRef.current.offsetWidth * scale);
    const maxY = cropSelection.height - (artworkRef.current.offsetHeight * scale);

    setArtworkPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - artworkPosition.x,
      y: touch.clientY - artworkPosition.y,
    });
  };

  const height = artwork.data?.additionalInfo?.height;
  const width = artwork?.data?.additionalInfo?.width;

  const handleTouchMove = (e) => {
    if (!isDragging || !cropSelection || !artworkRef.current) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = cropSelection.width - (artworkRef.current.offsetWidth * scale);
    const maxY = cropSelection.height - (artworkRef.current.offsetHeight * scale);

    setArtworkPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Adjust scale of artwork
  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  // Generate the background image for download
  const generateBackgroundImage = () => {
    if (!selectedImage) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = `${imageUrl}/users/${selectedImage}`;

    bgImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      
      ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
      
      const dataUrl = canvas.toDataURL("image/png");
      setBackgroundImage(dataUrl);
    };
  };

  // Generate and download the composite image
  const generateImage = () => {
    if (!cropSelection || !selectedImage || !artwork) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match crop selection
    canvas.width = cropSelection.width;
    canvas.height = cropSelection.height;

    // Create background image element
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = `${imageUrl}/users/${selectedImage}`;

    bgImg.onload = () => {
      // Draw the cropped portion of the background
      ctx.drawImage(
        bgImg,
        cropSelection.x,
        cropSelection.y,
        cropSelection.width,
        cropSelection.height,
        0,
        0,
        cropSelection.width,
        cropSelection.height
      );

      // Draw the artwork on top
      const artImg = new Image();
      artImg.crossOrigin = "anonymous";
      artImg.src = `${imageUrl}/users/${artwork?.data?.media?.mainImage}`;

      artImg.onload = () => {
        const artWidth = artImg.width * scale;
        const artHeight = artImg.height * scale;

        ctx.drawImage(
          artImg,
          artworkPosition.x,
          artworkPosition.y,
          artWidth,
          artHeight
        );

        // Save the final image URL
        const dataUrl = canvas.toDataURL("image/png");
        setFinalImage(dataUrl);
      };
    };
  };

  // Download both images
  const handleDownload = () => {
    if (!finalImage || !backgroundImage) {
      generateImage();
      generateBackgroundImage();
      
      // Give time for the images to generate before downloading
      setTimeout(() => {
        downloadImages();
      }, 500);
    } else {
      downloadImages();
    }
  };

  // Function to download both images
  const downloadImages = () => {
    if (finalImage) {
      // Download composition
      const compositionLink = document.createElement("a");
      compositionLink.download = "artwork-composition.png";
      compositionLink.href = finalImage;
      compositionLink.click();
    }
    
    if (backgroundImage) {
      // Download background image
      setTimeout(() => {
        const bgLink = document.createElement("a");
        bgLink.download = "background-image.png";
        bgLink.href = backgroundImage;
        bgLink.click();
      }, 300);
    }
  };

  // Generate preview image when component mounts or relevant dependencies change
  useEffect(() => {
    if (cropSelection && selectedImage && artwork) {
      generateImage();
      generateBackgroundImage();
    }
  }, [cropSelection, selectedImage, artwork, artworkPosition, scale]);

  useEffect(() => {
    // Global event listeners for dragging
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart, cropSelection, artworkPosition]);

  // Center artwork on first load
  useEffect(() => {
    if (cropSelection && artworkRef.current && artworkPosition.x === 0 && artworkPosition.y === 0) {
      setArtworkPosition({
        x: (cropSelection.width - artworkRef.current.offsetWidth) / 2,
        y: (cropSelection.height - artworkRef.current.offsetHeight) / 2,
      });
    }
  }, [cropSelection, artworkRef.current]);

  if (!selectedImage || !cropSelection || !artwork) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Please select an image and artwork to continue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
     
      <div className="md:w-3/5 w-full h-64 sm:h-80 md:h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div
          ref={containerRef}
          className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 "
        >
          <div className="relative  w-full h-full flex items-center justify-center">
            <div className="relative ">
 <img
              src={`${imageUrl}/users/${selectedImage}`}
              alt="Background with selection"
              className="max-w-full max-h-full object-contain"
              draggable="false"
              style={{
                width: imageSizeS?.width ? `${imageSizeS.width}px` : 'auto',
                height: imageSizeS?.height ? `${imageSizeS.height}px` : 'auto'
              }}
            />
            {cropSelection && (
              <div
                className="absolute  bg-opacity-10 border border-blue-500"
                style={{
                  left: `${cropSelection.x}px`,
                  top: `${cropSelection.y}px`,
                  width: `${cropSelection.width}px`,
                  height: `${cropSelection.height}px`,
                }}
              >
                <div
                  className="absolute  cursor-move select-none "
                  ref={artworkRef}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{
                    top: artworkPosition.y,
                    left: artworkPosition.x,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {artwork?.data?.media?.mainImage && (
                    <img
                      src={`${imageUrl}/users/${artwork.data.media.mainImage}`}
                      alt="Selected artwork"
                      className="max-w-full pointer-events-none object-contain"
                      style={{
                        width: width || 'auto',
                        height: height || 'auto'
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            </div>
           
            
          </div>
        </div>

        {/* Final composition preview */}
        {finalImage && (
          <div className="mt-4 p-2">
            <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Final Composition</h5>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 p-2">
              <img
                src={finalImage}
                alt="Final composition"
                className="max-w-full h-auto rounded mx-auto"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Controls */}
      <div className="md:w-2/5 w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-4 md:mt-0">
        <div>
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Position Your Artwork</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag the artwork to position it on your background image. Adjust the size using the slider below.
          </p>
        </div>

      

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium w-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Images
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-auto">
          <button
            onClick={onPrev}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Back
          </button>

          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPlacementStep;