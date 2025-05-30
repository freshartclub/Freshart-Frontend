import { useState, useEffect, useRef, useCallback } from "react";
import { imageUrl } from "../utils/baseUrls";

const INCH_TO_CM = 2.54;
const MIN_SIZE_CM = 0.5;
const MIN_SIZE_PX = 5;

const CropSelectionStep = ({
  selectedImage,
  previewImageDimensions,
  cropSelection,
  setCropSelection,
  imageDimension,
  imageHW,
  onNext,
  onPrev,
  setImageSizeS
}) => {
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const selectionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerRect, setContainerRect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({
    realDimensions: { width: 0, height: 0 }, 
    pixelDimensions: { width: 0, height: 0 }, 
    pixelsPerCm: 0 
  });
  const [showRuler, setShowRuler] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImageDimensions({
      realDimensions: { width: 0, height: 0 },
      pixelDimensions: { width: 0, height: 0 },
      pixelsPerCm: 0
    });
  }, [selectedImage]);



  const loadImage = useCallback(async () => {
    if (!selectedImage) return;

    const img = new Image();
    img.onload = () => {
      const pixelWidth = img.naturalWidth;
      const pixelHeight = img.naturalHeight;
      
      // Use imageDimension prop for real dimensions if available
      let widthCm, heightCm;
      if (imageDimension && imageDimension.width && imageDimension.height) {
        widthCm = imageDimension.width;
        heightCm = imageDimension.height;
      } else {
        // Fallback to estimated DPI calculation
        const estimatedDpi = 300;
        widthCm = (pixelWidth / estimatedDpi) * INCH_TO_CM;
        heightCm = (pixelHeight / estimatedDpi) * INCH_TO_CM;
      }
      
      const pixelsPerCm = pixelWidth / widthCm;

      setImageDimensions({
        realDimensions: {
          width: parseFloat(widthCm.toFixed(1)),
          height: parseFloat(heightCm.toFixed(1))
        },
        pixelDimensions: { width: pixelWidth, height: pixelHeight },
        pixelsPerCm: pixelsPerCm
      });

      if (imageContainerRef.current) {
        const container = imageContainerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const aspectRatio = pixelWidth / pixelHeight;
        let displayWidth, displayHeight;

        if (containerWidth / containerHeight > aspectRatio) {
          displayHeight = containerHeight;
          displayWidth = containerHeight * aspectRatio;
        } else {
          displayWidth = containerWidth;
          displayHeight = containerWidth / aspectRatio;
        }

        setImageSize({
          width: displayWidth,
          height: displayHeight
        });
        setImageSizeS({
          width: displayWidth,
          height: displayHeight
        });
      }

      setLoading(false);
    };

    img.onerror = () => {
      console.error("Failed to load image");
      setLoading(false);
    };

    img.src = `${imageUrl}/users/${selectedImage}`;
    imageRef.current = img;
  }, [selectedImage, imageDimension]);

  useEffect(() => {
    if (loading || !imageDimensions.pixelsPerCm || !imageSize.width) return;

    if (cropSelection.width === 0 || cropSelection.height === 0) {
      const initialSizeCm = {
        width: Math.min(10, imageDimensions.realDimensions.width * 0.3),
        height: Math.min(10, imageDimensions.realDimensions.height * 0.3)
      };

      const widthPx = cmToDisplayPixels(initialSizeCm.width);
      const heightPx = cmToDisplayPixels(initialSizeCm.height);

      setCropSelection({
        x: (imageSize.width - widthPx) / 2,
        y: (imageSize.height - heightPx) / 2,
        width: widthPx,
        height: heightPx,
        unit: 'px'
      });
    }
  }, [loading, imageDimensions, imageSize, cropSelection, setCropSelection]);

  const cmToDisplayPixels = useCallback((cm) => {
    if (!imageDimensions.pixelsPerCm || !imageSize.width) return 0;
    const realPixels = cm * imageDimensions.pixelsPerCm;
    const displayPixels = (realPixels / imageDimensions.pixelDimensions.width) * imageSize.width;
    return Math.round(displayPixels);
  }, [imageDimensions, imageSize]);

  const displayPixelsToCm = useCallback((displayPixels) => {
    if (!imageDimensions.pixelsPerCm || !imageSize.width) return 0;
    const realPixels = (displayPixels / imageSize.width) * imageDimensions.pixelDimensions.width;
    const cm = realPixels / imageDimensions.pixelsPerCm;
    return parseFloat(cm.toFixed(1));
  }, [imageDimensions, imageSize]);

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current && imageRef.current) {
        const container = imageContainerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const aspectRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;
        let displayWidth, displayHeight;

        if (containerWidth / containerHeight > aspectRatio) {
          displayHeight = containerHeight;
          displayWidth = containerHeight * aspectRatio;
        } else {
          displayWidth = containerWidth;
          displayHeight = containerWidth / aspectRatio;
        }

        setImageSizeS({
          width: displayWidth,
          height: displayHeight
        });

        setImageSize({
          width: displayWidth,
          height: displayHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    if (imageContainerRef.current) {
      setContainerRect(imageContainerRef.current.getBoundingClientRect());
    }
  }, [imageSize]);

  const handleSizeChange = useCallback((dimension, value) => {
    if (isNaN(value)) return;

    const maxValue = dimension === 'width'
      ? imageDimensions.realDimensions.width
      : imageDimensions.realDimensions.height;

    value = Math.max(MIN_SIZE_CM, Math.min(maxValue, value));

    const newWidth = dimension === 'width' ? cmToDisplayPixels(value) : cropSelection.width;
    const newHeight = dimension === 'height' ? cmToDisplayPixels(value) : cropSelection.height;

    if (newWidth < MIN_SIZE_PX || newHeight < MIN_SIZE_PX) return;

    const centerX = cropSelection.x + (cropSelection.width / 2);
    const centerY = cropSelection.y + (cropSelection.height / 2);

    const newX = Math.max(0, Math.min(centerX - (newWidth / 2), imageSize.width - newWidth));
    const newY = Math.max(0, Math.min(centerY - (newHeight / 2), imageSize.height - newHeight));

    setCropSelection({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
      unit: 'px'
    });
  }, [imageDimensions, cropSelection, imageSize, cmToDisplayPixels, setCropSelection]);

  const getClientCoordinates = useCallback((e) => {
    return e.touches
      ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
      : { clientX: e.clientX, clientY: e.clientY };
  }, []);

  const handleSelectionDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);

    const { clientX, clientY } = getClientCoordinates(e);

    setDragStart({
      x: clientX - cropSelection.x - (containerRect?.left || 0),
      y: clientY - cropSelection.y - (containerRect?.top || 0)
    });
  }, [cropSelection, containerRect]);

  const handleResizeStart = useCallback((e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeCorner(corner);

    const { clientX, clientY } = getClientCoordinates(e);
    setDragStart({ x: clientX, y: clientY });
  }, [getClientCoordinates]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRect) return;

    const { clientX, clientY } = getClientCoordinates(e);

    if (isDragging) {
      handleDrag(clientX, clientY);
    } else if (isResizing) {
      handleResize(clientX, clientY);
    }
  }, [containerRect, isDragging, isResizing, getClientCoordinates]);

  const handleDrag = useCallback((clientX, clientY) => {
    let newX = clientX - containerRect.left - dragStart.x;
    let newY = clientY - containerRect.top - dragStart.y;

    newX = Math.max(0, Math.min(newX, imageSize.width - cropSelection.width));
    newY = Math.max(0, Math.min(newY, imageSize.height - cropSelection.height));

    setCropSelection(prev => ({
      ...prev,
      x: newX,
      y: newY
    }));
  }, [containerRect, dragStart, imageSize, cropSelection, setCropSelection]);

  const handleResize = useCallback((clientX, clientY) => {
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    setDragStart({ x: clientX, y: clientY });

    let newSelection = { ...cropSelection };

    switch (resizeCorner) {
      case "top-left":
        newSelection.width = Math.max(MIN_SIZE_PX, newSelection.width - deltaX);
        newSelection.height = Math.max(MIN_SIZE_PX, newSelection.height - deltaY);
        newSelection.x = Math.max(0, Math.min(newSelection.x + deltaX, newSelection.x + newSelection.width - MIN_SIZE_PX));
        newSelection.y = Math.max(0, Math.min(newSelection.y + deltaY, newSelection.y + newSelection.height - MIN_SIZE_PX));
        break;
      case "top-right":
        newSelection.width = Math.max(MIN_SIZE_PX, Math.min(newSelection?.width + deltaX, imageSize.width - newSelection.x));
        newSelection.height = Math.max(MIN_SIZE_PX, newSelection?.height - deltaY);
        newSelection.y = Math.max(0, Math.min(newSelection.y + deltaY, newSelection?.y + newSelection.height - MIN_SIZE_PX));
        break;
      case "bottom-left":
        newSelection.width = Math.max(MIN_SIZE_PX, newSelection?.width - deltaX);
        newSelection.height = Math.max(MIN_SIZE_PX, Math.min(newSelection?.height + deltaY, imageSize.height - newSelection.y));
        newSelection.x = Math.max(0, Math.min(newSelection.x + deltaX, newSelection.x + newSelection.width - MIN_SIZE_PX));
        break;
      case "bottom-right":
        newSelection.width = Math.max(MIN_SIZE_PX, Math.min(newSelection?.width + deltaX, imageSize.width - newSelection.x));
        newSelection.height = Math.max(MIN_SIZE_PX, Math.min(newSelection.height + deltaY, imageSize.height - newSelection.y));
        break;
      default:
        break;
    }
    setCropSelection(newSelection);
  }, [dragStart, cropSelection, resizeCorner, imageSize, setCropSelection]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleImageClick = useCallback((e) => {
    if (selectionRef.current && !selectionRef.current.contains(e.target)) {
      const { clientX, clientY } = getClientCoordinates(e);
      const rect = containerRect || imageContainerRef?.current?.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const width = cropSelection.width || cmToDisplayPixels(5);
      const height = cropSelection.height || cmToDisplayPixels(5);

      setCropSelection({
        x: Math.max(0, Math.min(x - width / 2, imageSize.width - width)),
        y: Math.max(0, Math.min(y - height / 2, imageSize.height - height)),
        width,
        height,
        unit: 'px'
      });
    }
  }, [selectionRef, containerRect, getClientCoordinates, cropSelection, cmToDisplayPixels, imageSize, setCropSelection]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="relative lg:w-3/5 w-full h-64 sm:h-80 md:h-96 lg:h-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-75 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        <div
          ref={imageContainerRef}
          className="relative w-full h-full flex items-center justify-center"
          onClick={handleImageClick}
        >
          {selectedImage && (
            <div className="relative">
              <img
                src={`${imageUrl}/users/${selectedImage}`}
                alt="Image to crop"
                className="max-w-full max-h-full object-contain"
                style={{
                  width: `${imageSize?.width}px`,
                  height: `${imageSize?.height}px`
                }}
                draggable="false"
              />

              {!loading && (
                <div className="absolute inset-0 select-none">
                  <div
                    ref={selectionRef}
                    className="absolute border-2 border-blue-500 bg-transparent cursor-move"
                    style={{
                      left: `${cropSelection?.x}px`,
                      top: `${cropSelection?.y}px`,
                      width: `${cropSelection?.width}px`,
                      height: `${cropSelection?.height}px`,
                      touchAction: 'none'
                    }}
                    onMouseDown={handleSelectionDragStart}
                    onTouchStart={handleSelectionDragStart}
                  >
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 pointer-events-none"></div>

                    <div className="absolute -top-6 left-0 right-0 text-center">
                      <span className="text-xs font-mono bg-blue-500 text-white px-1 py-0.5 rounded">
                        {displayPixelsToCm(cropSelection?.width)} × {displayPixelsToCm(cropSelection?.height)} cm
                      </span>
                    </div>

                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                      <div
                        key={corner}
                        className={`absolute w-3 h-3 bg-blue-500 rounded-full cursor-${corner?.replace('-', '')}-resize`}
                        style={{
                          left: corner?.includes('left') ? '-0.375rem' : 'auto',
                          right: corner?.includes('right') ? '-0.375rem' : 'auto',
                          top: corner?.includes('top') ? '-0.375rem' : 'auto',
                          bottom: corner?.includes('bottom') ? '-0.375rem' : 'auto',
                        }}
                        onMouseDown={(e) => handleResizeStart(e, corner)}
                        onTouchStart={(e) => handleResizeStart(e, corner)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-2/5 w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-4 lg:mt-0 lg:ml-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Crop Selection</h2>

        </div>

        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Image Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600 dark:text-gray-300">Pixel Dimensions:</div>
            <div className="text-gray-800 dark:text-gray-100">
              {imageDimensions.pixelDimensions.width} × {imageDimensions.pixelDimensions.height} px
            </div>
            <div className="text-gray-600 dark:text-gray-300">Physical Size:</div>
            <div className="text-gray-800 dark:text-gray-100">
              {imageDimensions.realDimensions.width} × {imageDimensions.realDimensions.height} cm
            </div>
            <div className="text-gray-600 dark:text-gray-300">Resolution:</div>
            <div className="text-gray-800 dark:text-gray-100">
              ~{Math.round(imageDimensions.pixelsPerCm * INCH_TO_CM)} DPI
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Selection Size</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (cm)</label>
              <input
                type="number"
                min={MIN_SIZE_CM}
                max={imageDimensions.realDimensions.width}
                step="0.1"
                value={displayPixelsToCm(cropSelection?.width)}
                onChange={(e) => handleSizeChange('width', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input
                type="number"
                min={MIN_SIZE_CM}
                max={imageDimensions.realDimensions.height}
                step="0.1"
                value={displayPixelsToCm(cropSelection?.height)}
                onChange={(e) => handleSizeChange('height', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Selection Position (cm)</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600 dark:text-gray-300">X1, Y1 (Top-Left):</div>
              <div className="text-gray-800 dark:text-gray-100">
                {displayPixelsToCm(cropSelection.x)}, {displayPixelsToCm(cropSelection.y)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">X2, Y2 (Bottom-Right):</div>
              <div className="text-gray-800 dark:text-gray-100">
                {displayPixelsToCm(cropSelection.x + cropSelection.width)}, {displayPixelsToCm(cropSelection.y + cropSelection.height)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-800 dark:text-white transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
            disabled={loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropSelectionStep;