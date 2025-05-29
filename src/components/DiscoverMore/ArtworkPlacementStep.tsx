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
  const cropAreaRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [finalImage, setFinalImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Initialize artwork position if not set
  useEffect(() => {
    if (!artworkPosition && cropSelection) {
      setArtworkPosition({
        x: cropSelection.width / 4,
        y: cropSelection.height / 4
      });
    }
  }, [artworkPosition, cropSelection, setArtworkPosition]);

  // Handle artwork dragging - Mouse Events
  const handleMouseDown = (e) => {
    if (!artworkRef.current || !cropAreaRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    
    // Get the current position of the artwork relative to the crop area
    const cropRect = cropAreaRef.current.getBoundingClientRect();
    const artworkRect = artworkRef.current.getBoundingClientRect();
    
    // Calculate offset from mouse to artwork's top-left corner
    setDragOffset({
      x: e.clientX - artworkRect.left,
      y: e.clientY - artworkRect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !cropAreaRef.current || !artworkRef.current) return;

    e.preventDefault();
    
    const cropRect = cropAreaRef.current.getBoundingClientRect();
    const artworkWidth = artworkRef.current.offsetWidth;
    const artworkHeight = artworkRef.current.offsetHeight;
    
    // Calculate new position relative to crop area
    let newX = e.clientX - cropRect.left - dragOffset.x;
    let newY = e.clientY - cropRect.top - dragOffset.y;
    
    // Apply boundaries - keep artwork within crop area
    const maxX = cropRect.width - artworkWidth;
    const maxY = cropRect.height - artworkHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    setArtworkPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle artwork dragging - Touch Events
  const handleTouchStart = (e) => {
    if (!artworkRef.current || !cropAreaRef.current) return;
    
    e.preventDefault();
    
    setIsDragging(true);
    
    const touch = e.touches[0];
    const cropRect = cropAreaRef.current.getBoundingClientRect();
    const artworkRect = artworkRef.current.getBoundingClientRect();
    
    setDragOffset({
      x: touch.clientX - artworkRect.left,
      y: touch.clientY - artworkRect.top
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !cropAreaRef.current || !artworkRef.current) return;
    
    e.preventDefault();
    
    const touch = e.touches[0];
    const cropRect = cropAreaRef.current.getBoundingClientRect();
    const artworkWidth = artworkRef.current.offsetWidth;
    const artworkHeight = artworkRef.current.offsetHeight;
    
    let newX = touch.clientX - cropRect.left - dragOffset.x;
    let newY = touch.clientY - cropRect.top - dragOffset.y;
    
    const maxX = cropRect.width - artworkWidth;
    const maxY = cropRect.height - artworkHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    setArtworkPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
    
    // Adjust position if artwork goes out of bounds after scaling
    if (artworkRef.current && cropAreaRef.current && artworkPosition) {
      const cropRect = cropAreaRef.current.getBoundingClientRect();
      const baseWidth = artworkRef.current.offsetWidth / scale; // Get original size
      const baseHeight = artworkRef.current.offsetHeight / scale;
      
      const newWidth = baseWidth * newScale;
      const newHeight = baseHeight * newScale;
      
      const maxX = cropRect.width - newWidth;
      const maxY = cropRect.height - newHeight;
      
      setArtworkPosition({
        x: Math.max(0, Math.min(artworkPosition.x, maxX)),
        y: Math.max(0, Math.min(artworkPosition.y, maxY))
      });
    }
  };

  // Get artwork dimensions
  const getArtworkDimensions = () => {
    const baseWidth = artwork?.data?.additionalInfo?.width || 150;
    const baseHeight = artwork?.data?.additionalInfo?.height || 150;
    return { width: baseWidth, height: baseHeight };
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

    bgImg.onerror = () => {
      console.error("Failed to load background image");
    };
  };

  // Generate composite image
  const generateImage = () => {
    if (!cropSelection || !selectedImage || !artwork || !artworkPosition) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = `${imageUrl}/users/${selectedImage}`;

    bgImg.onload = () => {
      const artworkImg = new Image();
      artworkImg.crossOrigin = "anonymous";
      artworkImg.src = `${imageUrl}/users/${artwork.data.media.mainImage}`;

      artworkImg.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to the crop selection size
        canvas.width = cropSelection.width;
        canvas.height = cropSelection.height;

        // Draw the cropped background
        ctx.drawImage(
          bgImg,
          cropSelection.x, cropSelection.y, cropSelection.width, cropSelection.height,
          0, 0, cropSelection.width, cropSelection.height
        );

        // Calculate artwork dimensions
        const { width: baseWidth, height: baseHeight } = getArtworkDimensions();
        const artworkWidth = baseWidth * scale;
        const artworkHeight = baseHeight * scale;

        // Draw the artwork at the specified position
        ctx.drawImage(
          artworkImg,
          artworkPosition.x,
          artworkPosition.y,
          artworkWidth,
          artworkHeight
        );

        const dataUrl = canvas.toDataURL("image/png");
        setFinalImage(dataUrl);
      };

      artworkImg.onerror = () => {
        console.error("Failed to load artwork image");
      };
    };

    bgImg.onerror = () => {
      console.error("Failed to load background image");
    };
  };

  // Download function
  const downloadImages = () => {
    if (finalImage) {
      const compositionLink = document.createElement("a");
      compositionLink.download = "artwork-composition.png";
      compositionLink.href = finalImage;
      compositionLink.click();
    }
    
    if (backgroundImage) {
      setTimeout(() => {
        const bgLink = document.createElement("a");
        bgLink.download = "background-image.png";
        bgLink.href = backgroundImage;
        bgLink.click();
      }, 300);
    }
  };

  const handleDownload = () => {
    if (!finalImage || !backgroundImage) {
      generateImage();
      generateBackgroundImage();
      setTimeout(() => {
        downloadImages();
      }, 500);
    } else {
      downloadImages();
    }
  };

  // Generate preview images when dependencies change
  useEffect(() => {
    if (cropSelection && selectedImage && artwork && artworkPosition !== null) {
      generateImage();
      generateBackgroundImage();
    }
  }, [cropSelection, selectedImage, artwork, artworkPosition, scale]);

  // Set up global event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      const handleGlobalTouchMove = (e) => handleTouchMove(e);
      const handleGlobalTouchEnd = () => handleTouchEnd();

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
      document.addEventListener("touchend", handleGlobalTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.removeEventListener("touchmove", handleGlobalTouchMove);
        document.removeEventListener("touchend", handleGlobalTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  // Loading states
  if (!selectedImage || !cropSelection) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500 dark:text-gray-400">No artwork selected</div>
      </div>
    );
  }

  const { width: baseWidth, height: baseHeight } = getArtworkDimensions();

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">
      {/* Left Side - Preview */}
      <div className="lg:w-3/5 w-full">
        <div className="relative w-full h-96 lg:h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center p-4"
          >
            {/* Background Image Container */}
            <div className="relative max-w-full max-h-full">
              <img
                src={`${imageUrl}/users/${selectedImage}`}
                alt="Background"
                className="max-w-full max-h-full object-contain select-none"
                draggable="false"
                style={{
                  width: imageSizeS?.width ? `${imageSizeS.width}px` : 'auto',
                  height: imageSizeS?.height ? `${imageSizeS.height}px` : 'auto'
                }}
              />
              
              {/* Crop Selection Overlay */}
              {cropSelection && (
                <div
                  ref={cropAreaRef}
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-10"
                  style={{
                    left: `${cropSelection.x}px`,
                    top: `${cropSelection.y}px`,
                    width: `${cropSelection.width}px`,
                    height: `${cropSelection.height}px`,
                  }}
                >
                  {/* Draggable Artwork */}
                  {artwork?.data?.media?.mainImage && artworkPosition && (
                    <div
                      ref={artworkRef}
                      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleTouchStart}
                      style={{
                        left: `${artworkPosition.x}px`,
                        top: `${artworkPosition.y}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        zIndex: 20,
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                      }}
                    >
                      <img
                        src={`${imageUrl}/users/${artwork.data.media.mainImage}`}
                        alt="Artwork"
                        className="pointer-events-none select-none"
                        draggable="false"
                        style={{
                          width: `${baseWidth}px`,
                          height: `${baseHeight}px`,
                          maxWidth: 'none',
                          maxHeight: 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Final Composition Preview */}
        {finalImage && (
          <div className="mt-6">
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Final Composition Preview</h5>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 p-4">
              <img
                src={finalImage}
                alt="Final composition"
                className="max-w-full h-auto rounded mx-auto shadow-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Controls */}
      <div className="lg:w-2/5 w-full">
        <div className="sticky top-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Position Your Artwork</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Drag the artwork within the blue area to position it. Use the slider to adjust the size.
            </p>
          </div>

          {/* Size Control */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Artwork Size: {Math.round(scale * 100)}%
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>20%</span>
              <span>300%</span>
            </div>
          </div>

          {/* Position Info */}
          {artworkPosition && (
            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div>Position: X: {Math.round(artworkPosition.x)}, Y: {Math.round(artworkPosition.y)}</div>
                <div>Scale: {Math.round(scale * 100)}%</div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full mb-4 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Images
          </button>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onPrev}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
            >
              Previous
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
    </div>
  );
};

export default ArtworkPlacementStep;