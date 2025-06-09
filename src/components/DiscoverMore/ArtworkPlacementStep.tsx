import { useState, useEffect, useRef, useMemo } from "react";
import { imageUrl } from "../utils/baseUrls";

const ArtworkPlacementStep = ({
  selectedImage,
  cropSelection,
  artwork,
  artworkPosition,
  setArtworkPosition,
  imageDimension,
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

  useEffect(() => {
    if (!artworkPosition && cropSelection) {
      setArtworkPosition({
        x: cropSelection.width / 4,
        y: cropSelection.height / 4
      });
    }
  }, [artworkPosition, cropSelection, setArtworkPosition]);

  const handleMouseDown = (e) => {
    if (!artworkRef.current || !cropAreaRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);


    const cropRect = cropAreaRef.current.getBoundingClientRect();
    const artworkRect = artworkRef.current.getBoundingClientRect();


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


    let newX = e.clientX - cropRect.left - dragOffset.x;
    let newY = e.clientY - cropRect.top - dragOffset.y;


    const maxX = cropRect.width - artworkWidth;
    const maxY = cropRect.height - artworkHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setArtworkPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  const getArtworkDimensions = () => {
    const baseWidth = artwork?.data?.additionalInfo?.width || 150;
    const baseHeight = artwork?.data?.additionalInfo?.height || 150;
    return { width: baseWidth, height: baseHeight };
  };

  const generatePreviewImage = async () => {
    try {
      const croppedImage = await generateCroppedImage();
      setFinalImage(croppedImage);
    } catch (error) {
      console.error("Failed to generate preview:", error);
    }
  };

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


          canvas.width = bgImg.width;
          canvas.height = bgImg.height;


          ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);


          const displayWidth = imageSizeS?.width || bgImg.width;
          const displayHeight = imageSizeS?.height || bgImg.height;
          const scaleFactorX = bgImg.width / displayWidth;
          const scaleFactorY = bgImg.height / displayHeight;

          const { width: baseWidth, height: baseHeight } = getArtworkDimensions();
          const artworkWidth = (baseWidth * scale) * scaleFactorX;
          const artworkHeight = (baseHeight * scale) * scaleFactorY;


          const actualX = (cropSelection.x + artworkPosition.x) * scaleFactorX;
          const actualY = (cropSelection.y + artworkPosition.y) * scaleFactorY;


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


          canvas.width = cropSelection.width;
          canvas.height = cropSelection.height;


          const displayWidth = imageSizeS?.width || bgImg.width;
          const displayHeight = imageSizeS?.height || bgImg.height;
          const scaleFactorX = bgImg.width / displayWidth;
          const scaleFactorY = bgImg.height / displayHeight;


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


          const { width: baseWidth, height: baseHeight } = getArtworkDimensions();
          const artworkWidth = baseWidth * scale;
          const artworkHeight = baseHeight * scale;


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

  const downloadImages = async () => {
    try {

      const [fullComposite] = await Promise.all([
        generateCompositeImage(),
      ]);

      if (fullComposite) {
        const fullLink = document.createElement("a");
        fullLink.download = "artwork-on-background-full.png";
        fullLink.href = fullComposite;
        document.body.appendChild(fullLink);
        fullLink.click();
        document.body.removeChild(fullLink);
      }

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


  useEffect(() => {
    if (cropSelection && selectedImage && artwork && artworkPosition !== null) {
      generatePreviewImage();
    }
  }, [cropSelection, selectedImage, artwork, artworkPosition, scale]);


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

  const artworkWidthCm = artwork?.data?.additionalInfo?.width
  const artworkHeightCm = artwork?.data?.additionalInfo?.height

  const selectedWidthCm = cropSelection?.width
  const selectedHeightCm = cropSelection?.height

 

  const showArtwork =
    artwork?.data?.additionalInfo?.height < cropSelection?.height &&
    artwork?.data?.additionalInfo?.width < cropSelection?.width;

  const artworkInCropStyle = useMemo(() => {
    if (
      !artworkWidthCm ||
      !artworkHeightCm ||
      !cropSelection?.width ||
      !cropSelection?.height
    ) {
      return null;
    }

   
    const pixelsPerCmX = cropSelection.width / selectedWidthCm;
    const pixelsPerCmY = cropSelection.height / selectedHeightCm;

    
    const artworkWidthPx = artworkWidthCm * pixelsPerCmX;
    const artworkHeightPx = artworkHeightCm * pixelsPerCmY;

   
    const scaleToFitWidth = cropSelection.width / artworkWidthPx;
    const scaleToFitHeight = cropSelection.height / artworkHeightPx;

    const scale = Math.min(scaleToFitWidth, scaleToFitHeight, 1);

    const finalWidth = artworkWidthPx * scale;
    const finalHeight = artworkHeightPx * scale;

    const offsetX = (cropSelection.width - finalWidth) / 2;
    const offsetY = (cropSelection.height - finalHeight) / 2;

    return {
      left: `${offsetX}px`,
      top: `${offsetY}px`,
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
    };
  }, [artworkWidthCm, artworkHeightCm, cropSelection, selectedWidthCm, selectedHeightCm]);




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



  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">

      <div className="lg:w-3/5 w-full">
        <div className="relative w-full h-96 lg:h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center "
          >

            <div className="relative max-w-full max-h-full">
              <img
                src={`${imageUrl}/users/${selectedImage}`}
                alt="Background"
                className="max-w-full max-h-full object-contain "
                draggable="false"
                style={{
                  width: imageSizeS?.width ? `${imageSizeS?.width}px` : 'auto',
                  height: imageSizeS?.height ? `${imageSizeS?.height}px` : 'auto'
                }}
              />


              {cropSelection && (
                <div
                  ref={cropAreaRef}
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-10"
                  style={{
                    left: `${cropSelection?.x}px`,
                    top: `${cropSelection?.y}px`,
                    width: `${cropSelection?.width}px`,
                    height: `${cropSelection?.height}px`,
                  }}
                >

                  {showArtwork ? artwork?.data?.media?.mainImage && artworkPosition && (
                    <div
                      ref={artworkRef}
                      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleTouchStart}
                      style={{
                        left: `${artworkPosition?.x}px`,
                        top: `${artworkPosition?.y}px`,
                        // transform: `scale(${scale})`,
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
                        className="pointer-events-none select-none object-contain"
                        draggable="false"
                        style={{
                          ...artworkInCropStyle,
                          // position: 'absolute',
                          maxWidth: 'none',
                          maxHeight: 'none'
                        }}
                      />

                    </div>
                  ) : null}


                </div>
              )}
            </div>
          </div>
        </div>


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


      <div className="lg:w-2/5 w-full">
        <div className="sticky top-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Position Your Artwork
            </h4>

            {showArtwork ? (
              <p className="text-gray-600 dark:text-gray-400">
                Drag the artwork within the blue area to position it. Use the slider to adjust the size.
              </p>
            ) : (
              <p className="text-red-600 dark:text-red-400 font-medium">
                The selected space must be larger than the artwork size.
              </p>
            )}
          </div>



          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Details
            </h4>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <p>Artwork Name: <span className="font-medium">{artwork?.data?.artworkName}</span></p>
              <p>Artwork Size: <span className="font-medium">{`${artwork?.data?.additionalInfo?.height}cm x ${artwork?.data?.additionalInfo?.width}cm`}</span></p>
              <p>Selected Space Size: <span className="font-medium">{`${cropSelection?.height}cm x ${cropSelection?.width}cm`}</span></p>
              <p>Image Size: <span className="font-medium">{`${imageDimension?.height}cm x ${imageDimension?.width}`}</span></p>
            </div>
          </div>



          <button
            disabled={!showArtwork}
            onClick={handleDownload}
            className="w-full mb-4 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download  Images
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
            Downloads: Full background with artwork
          </div>


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