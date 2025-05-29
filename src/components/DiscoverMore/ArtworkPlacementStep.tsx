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

  // Generate preview image for display
  const generatePreviewImage = async () => {
    try {
      const croppedImage = await generateCroppedImage();
      setFinalImage(croppedImage);
    } catch (error) {
      console.error("Failed to generate preview:", error);
    }
  };

  // Generate composite image with artwork positioned on background
  const generateCompositeImage = () => {
    return new Promise((resolve, reject) => {
      if (!cropSelection || !selectedImage || !artwork || !artworkPosition) {
        reject("Missing required data");
        return;
      }

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

          // Set canvas size to match the full background image
          canvas.width = bgImg.width;
          canvas.height = bgImg.height;

          // Draw the full background image
          ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);

          // Calculate the scale factor between display and actual image
          const displayWidth = imageSizeS?.width || bgImg.width;
          const displayHeight = imageSizeS?.height || bgImg.height;
          const scaleFactorX = bgImg.width / displayWidth;
          const scaleFactorY = bgImg.height / displayHeight;

          // Calculate artwork dimensions and position in actual image coordinates
          const { width: baseWidth, height: baseHeight } = getArtworkDimensions();
          const artworkWidth = (baseWidth * scale) * scaleFactorX;
          const artworkHeight = (baseHeight * scale) * scaleFactorY;
          
          // Convert position from display coordinates to actual image coordinates
          const actualX = (cropSelection.x + artworkPosition.x) * scaleFactorX;
          const actualY = (cropSelection.y + artworkPosition.y) * scaleFactorY;

          // Draw the artwork at the calculated position
          ctx.drawImage(
            artworkImg,
            actualX,
            actualY,
            artworkWidth,
            artworkHeight
          );

          const dataUrl = canvas.toDataURL("image/png", 0.95);
          resolve(dataUrl);
        };

        artworkImg.onerror = () => {
          reject("Failed to load artwork image");
        };
      };

      bgImg.onerror = () => {
        reject("Failed to load background image");
      };
    });
  };

  // Generate cropped composite image (just the selected area)
  const generateCroppedImage = () => {
    return new Promise((resolve, reject) => {
      if (!cropSelection || !selectedImage || !artwork || !artworkPosition) {
        reject("Missing required data");
        return;
      }

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

          // Calculate scale factor
          const displayWidth = imageSizeS?.width || bgImg.width;
          const displayHeight = imageSizeS?.height || bgImg.height;
          const scaleFactorX = bgImg.width / displayWidth;
          const scaleFactorY = bgImg.height / displayHeight;

          // Draw the cropped background
          ctx.drawImage(
            bgImg,
            cropSelection.x * scaleFactorX,
            cropSelection.y * scaleFactorY,
            cropSelection.width * scaleFactorX,
            cropSelection.height * scaleFactorY,
            0,
            0,
            cropSelection.width,
            cropSelection.height
          );

          // Calculate artwork dimensions
          const { width: baseWidth, height: baseHeight } = getArtworkDimensions();
          const artworkWidth = baseWidth * scale;
          const artworkHeight = baseHeight * scale;

          // Draw the artwork at the specified position within the crop area
          ctx.drawImage(
            artworkImg,
            artworkPosition.x,
            artworkPosition.y,
            artworkWidth,
            artworkHeight
          );

          const dataUrl = canvas.toDataURL("image/png", 0.95);
          resolve(dataUrl);
        };

        artworkImg.onerror = () => {
          reject("Failed to load artwork image");
        };
      };

      bgImg.onerror = () => {
        reject("Failed to load background image");
      };
    });
  };

  // Download function with proper error handling
  const downloadImages = async () => {
    try {
      // Generate both images
      const [fullComposite, croppedComposite] = await Promise.all([
        generateCompositeImage(),
        generateCroppedImage()
      ]);

      // Download full composite (background + artwork)
      if (fullComposite) {
        const fullLink = document.createElement("a");
        fullLink.download = "artwork-on-background-full.png";
        fullLink.href = fullComposite;
        document.body.appendChild(fullLink);
        fullLink.click();
        document.body.removeChild(fullLink);
      }

      // Download cropped version with a slight delay
      setTimeout(() => {
        if (croppedComposite) {
          const croppedLink = document.createElement("a");
          croppedLink.download = "artwork-on-background-cropped.png";
          croppedLink.href = croppedComposite;
          document.body.appendChild(croppedLink);
          croppedLink.click();
          document.body.removeChild(croppedLink);
        }
      }, 500);

    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to generate images. Please try again.");
    }
  };

  const handleDownload = () => {
    downloadImages();
  };

  // Generate preview images when dependencies change
  useEffect(() => {
    if (cropSelection && selectedImage && artwork && artworkPosition !== null) {
      generatePreviewImage();
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
            Download Both Images
          </button>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
            Downloads: Full background with artwork + Cropped version
          </div>

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