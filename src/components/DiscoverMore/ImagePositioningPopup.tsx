import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import { useGetAllUploadedImages } from "./http/useGetAllUploadedImages";

const ImagePositioningPopup = ({ onClose, artwork }) => {
  const dark = useAppSelector((state) => state.theme.mode);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [fullscreenIsDragging, setFullscreenIsDragging] = useState(false);
  const [fullscreenDragStart, setFullscreenDragStart] = useState({ x: 0, y: 0 });

  const artworkRef = useRef(null);
  const containerRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const fullscreenArtworkRef = useRef(null);

  const { data: uploadedImages, isLoading } = useGetAllUploadedImages();

  useEffect(() => {
    if (uploadedImages?.data?.length > 0 && !selectedImage) {
      setSelectedImage(uploadedImages.data[0].image);
    }
  }, [uploadedImages, selectedImage]);

  useEffect(() => {
    if (containerRef.current && artworkRef.current && selectedImage) {
      centerArtwork();
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && fullscreenActive) {
        closeFullscreenPreview();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [fullscreenActive]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && artworkRef.current && selectedImage) {
        // Recalculate position based on new container size
        centerArtwork();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedImage]);

  const themeClasses = useMemo(
    () => ({
      modalBg: dark ? "bg-gray-900" : "bg-black",
      contentBg: dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800",
      border: dark ? "border-gray-700" : "border-gray-200",
      containerBg: dark ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300",
      controlsBg: dark ? "bg-gray-800 bg-opacity-90" : "bg-white bg-opacity-80",
      controlsText: dark ? "text-gray-300" : "text-gray-700",
      controlsHover: dark ? "hover:bg-gray-700" : "hover:bg-gray-200",
      secondaryBg: dark ? "bg-gray-700" : "bg-gray-50",
      secondaryText: dark ? "text-gray-400" : "text-gray-500",
      selectedBorder: dark ? "border-blue-400 ring-2 ring-blue-500" : "border-blue-500 ring-2 ring-blue-300",
      selectedBg: dark ? "bg-blue-400" : "bg-blue-500",
      buttonPrimary: "bg-[#EE1D52] text-white hover:bg-[#e6004b]",
      buttonSecondary: dark ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300",
      footerBg: dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200",
      hintText: dark ? "text-gray-300" : "text-gray-700",
    }),
    [dark]
  );

  const centerArtwork = useCallback(() => {
    if (containerRef.current && artworkRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const artworkWidth = artworkRef.current.clientWidth;
      const artworkHeight = artworkRef.current.clientHeight;

      setPosition({
        x: (containerWidth - artworkWidth) / 2,
        y: (containerHeight - artworkHeight) / 2,
      });
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    centerArtwork();
    setZoom(1);
  }, [centerArtwork]);

  const toggleFullscreenPreview = useCallback(() => {
    setFullscreenActive((prev) => !prev);
    setFullscreenZoom(1);
  }, []);

  const closeFullscreenPreview = useCallback(() => {
    setFullscreenActive(false);
  }, []);

  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      console.log(clientX);

      setDragStart({
        x: clientX - position.x,
        y: clientY - position.y,
      });

      if (e.touches) {
        e.preventDefault();
      }
    },
    [position]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (isDragging && containerRef.current && artworkRef.current) {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const containerRect = containerRef.current.getBoundingClientRect();
        const artworkRect = artworkRef.current.getBoundingClientRect();

        let newX = clientX - dragStart.x;
        let newY = clientY - dragStart.y;

        const maxX = containerRect.width - artworkRect.width * zoom;
        const maxY = containerRect.height - artworkRect.height * zoom;

        newX = Math.min(Math.max(newX, maxX < 0 ? maxX : 0), maxX > 0 ? maxX : 0);
        newY = Math.min(Math.max(newY, maxY < 0 ? maxY : 0), maxY > 0 ? maxY : 0);

        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragStart, zoom]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFullscreenDragStart = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent closing fullscreen when dragging starts
      setFullscreenIsDragging(true);

      // Handle both mouse and touch events
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      // Calculate drag start coordinates
      setFullscreenDragStart({
        x: clientX - position.x * fullscreenZoom,
        y: clientY - position.y * fullscreenZoom,
      });

      // Prevent default behavior only for touch events
      if (e.touches) {
        e.preventDefault();
      }
    },
    [position, fullscreenZoom]
  );

  const handleFullscreenDragMove = useCallback(
    (e) => {
      if (fullscreenIsDragging && fullscreenContainerRef.current) {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const newX = (clientX - fullscreenDragStart.x) / fullscreenZoom;
        const newY = (clientY - fullscreenDragStart.y) / fullscreenZoom;

        setPosition({ x: newX, y: newY });
      }
    },
    [fullscreenIsDragging, fullscreenDragStart, fullscreenZoom]
  );

  const handleFullscreenDragEnd = useCallback(() => {
    setFullscreenIsDragging(false);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    };

    // Add touch pinch zoom gesture
    let initialDistance = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

        if (currentDistance > initialDistance + 5) {
          handleZoomIn();
          initialDistance = currentDistance;
        } else if (currentDistance < initialDistance - 5) {
          handleZoomOut();
          initialDistance = currentDistance;
        }
      }
    };

    const container = containerRef.current;
    const fullscreenContainer = fullscreenContainerRef.current;

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: false });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    if (fullscreenContainer) {
      fullscreenContainer.addEventListener("wheel", handleWheel, { passive: false });
      fullscreenContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
      fullscreenContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }

      if (fullscreenContainer) {
        fullscreenContainer.removeEventListener("wheel", handleWheel);
        fullscreenContainer.removeEventListener("touchstart", handleTouchStart);
        fullscreenContainer.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [handleZoomIn, handleZoomOut]);

  const handleSave = useCallback(() => {
    const positionData = {
      x: position.x,
      y: position.y,
      zoom: zoom,
      artworkId: artwork?.data?._id,
      uploadedImageId: selectedImage ? selectedImage : null,
    };

    onClose();
  }, [position, zoom, artwork, selectedImage, onClose]);

  const PreviewButton = useCallback(
    ({ onClick }) => (
      <button
        onClick={onClick}
        className={`absolute top-2 right-2 ${themeClasses.modalBg} bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white transition-all`}
        title="View Fullscreen"
        aria-label="View Fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" />
        </svg>
      </button>
    ),
    [themeClasses.modalBg]
  );

  const ImageGallery = useMemo(() => {
    return (
      <div className="mb-4">
        <h4 className={`text-lg font-medium ${themeClasses.hintText} mb-2`}>Select Background Image</h4>

        {isLoading ? (
          <div className={`flex justify-center items-center h-24 ${themeClasses.secondaryBg} rounded-lg`}>
            <p>Loading images...</p>
          </div>
        ) : (
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 h-full max-h-64 overflow-y-auto p-2 ${themeClasses.secondaryBg} rounded-lg`}>
            {uploadedImages?.data?.length > 0 ? (
              uploadedImages.data.map((img) => (
                <div
                  key={img._id}
                  className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === img.image ? themeClasses.selectedBorder : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img.image)}
                  role="button"
                  aria-label={`Select image ${img.name || img._id}`}
                  aria-selected={selectedImage === img.image}
                >
                  <img src={`${imageUrl}/users/${img.image}`} alt="User uploaded" className="w-full h-24 object-cover" loading="lazy" />
                  {selectedImage === img.image && (
                    <div className={`absolute top-1 right-1 ${themeClasses.selectedBg} rounded-full p-1`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 flex justify-center items-center h-24">
                <p className={themeClasses.secondaryText}>No images available</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [isLoading, uploadedImages, selectedImage, themeClasses]);

  const Controls = useCallback(
    ({ isFullscreen = false }) => {
      const handleZoomInClick = (e) => {
        if (isFullscreen) e.stopPropagation();
        handleZoomIn();
      };

      const handleZoomOutClick = (e) => {
        if (isFullscreen) e.stopPropagation();
        handleZoomOut();
      };

      const handleResetClick = (e) => {
        if (isFullscreen) e.stopPropagation();
        handleReset();
      };

      return (
        <div
          className={`${
            isFullscreen
              ? "absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-2 flex items-center z-10"
              : `absolute bottom-4 left-1/2 transform -translate-x-1/2 ${themeClasses.controlsBg} rounded-lg p-2 flex items-center`
          }`}
        >
          <button
            onClick={handleZoomOutClick}
            className={`p-2 ${
              isFullscreen ? "text-white hover:bg-gray-800" : `${themeClasses.controlsText} ${themeClasses.controlsHover}`
            } rounded-md`}
            aria-label="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <span className={`mx-2 text-sm font-medium ${isFullscreen ? "text-white" : dark ? "text-white" : ""}`}>{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomInClick}
            className={`p-2 ${
              isFullscreen ? "text-white hover:bg-gray-800" : `${themeClasses.controlsText} ${themeClasses.controlsHover}`
            } rounded-md`}
            aria-label="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleResetClick}
            className={`ml-2 p-2 ${
              isFullscreen ? "text-white hover:bg-gray-800" : `${themeClasses.controlsText} ${themeClasses.controlsHover}`
            } rounded-md`}
            aria-label="Reset position and zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      );
    },
    [handleZoomIn, handleZoomOut, handleReset, themeClasses, dark, zoom]
  );

  return (
    <div
      className={`fixed inset-0 ${themeClasses.modalBg} bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-positioning-title"
    >
      <div className={`${themeClasses.contentBg} rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`flex justify-between items-center border-b ${themeClasses.border} p-3 sm:p-4`}>
          <h3 id="image-positioning-title" className="text-lg sm:text-xl font-semibold">
            Position Your Artwork
          </h3>
          <button
            onClick={onClose}
            className={`${dark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} focus:outline-none`}
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row p-2 sm:p-4 gap-3 sm:gap-4 overflow-hidden">
          <div
            ref={containerRef}
            className={`flex-1 relative border ${themeClasses.containerBg} rounded-lg overflow-hidden min-h-[300px] bg-blue-800`}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            aria-label="Artwork positioning area"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {selectedImage && (
                <img
                  src={`${imageUrl}/users/${selectedImage}` || "/api/placeholder/500/300"}
                  alt="Background"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}
              <PreviewButton onClick={toggleFullscreenPreview} />

              {artwork?.data?.media?.mainImage && (
                <img
                  ref={artworkRef}
                  src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || "/api/placeholder/200/200"}
                  alt="Artwork"
                  className="absolute cursor-move touch-manipulation bg-red-200"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: "top left",
                    maxWidth: "80%",
                    maxHeight: "80%",
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  draggable="false"
                  aria-label="Draggable artwork"
                />
              )}
            </div>

            <Controls />

            <div
              className={`absolute top-4 left-4 ${
                dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
              } bg-opacity-70 rounded px-2 py-1 text-xs sm:text-sm`}
            >
              <p className="hidden sm:block">Drag to position • Scroll to zoom</p>
              <p className="block sm:hidden">Drag to position • Pinch to zoom</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {ImageGallery}

            <div className={`flex-1 ${themeClasses.secondaryBg} rounded-lg p-3 overflow-y-auto`}>
              <h4 className={`text-lg font-medium ${themeClasses.hintText} mb-2`}>Instructions</h4>
              <ul className={`list-disc pl-5 ${themeClasses.hintText} text-sm`}>
                <li className="mb-1">Drag the artwork to position it on the background</li>
                <li className="mb-1">Use the zoom controls to resize the artwork</li>
                <li className="mb-1">Click the fullscreen button for a better view</li>
                <li className="mb-1">Select a different background image from the gallery</li>
                <li className="mb-1">Click 'Done' when you're satisfied with the positioning</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.footerBg} px-3 sm:px-4 py-3 flex justify-end border-t`}>
          <button
            onClick={handleSave}
            className={`px-4 py-2 ${themeClasses.buttonPrimary} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Done
          </button>
        </div>
      </div>

      {fullscreenActive && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center touch-manipulation"
          onClick={(e) => e.target === e.currentTarget && closeFullscreenPreview()}
          ref={fullscreenContainerRef}
          onMouseMove={handleFullscreenDragMove}
          onMouseUp={handleFullscreenDragEnd}
          onMouseLeave={handleFullscreenDragEnd}
          onTouchMove={handleFullscreenDragMove}
          onTouchEnd={handleFullscreenDragEnd}
          onTouchCancel={handleFullscreenDragEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen preview"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImage && (
              <img
                src={`${imageUrl}/users/${selectedImage}` || "/api/placeholder/500/300"}
                alt="Background Fullscreen"
                className="w-full h-full object-contain"
                style={{
                  transform: `scale(${fullscreenZoom})`,
                  transformOrigin: "center center",
                }}
                loading="eager"
              />
            )}

            {artwork?.data?.media?.mainImage && (
              <img
                ref={fullscreenArtworkRef}
                src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || "/api/placeholder/200/200"}
                alt="Positioned Artwork"
                className="absolute cursor-move touch-manipulation"
                style={{
                  transform: `translate(${position.x * fullscreenZoom}px, ${position.y * fullscreenZoom}px) scale(${zoom * fullscreenZoom})`,
                  transformOrigin: "top left",
                  maxWidth: "80%",
                  maxHeight: "80%",
                }}
                onMouseDown={handleFullscreenDragStart}
                onTouchStart={handleFullscreenDragStart}
                draggable="false"
                aria-label="Draggable artwork in fullscreen"
              />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreenPreview();
              }}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none transition-all z-10"
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Controls isFullscreen={true} />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg text-xs sm:text-sm z-10">
              <p className="hidden sm:block">Drag artwork to position • Use controls to zoom • Press ESC to exit fullscreen</p>
              <p className="block sm:hidden">Drag to position • Pinch to zoom • Tap X to exit</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePositioningPopup;
