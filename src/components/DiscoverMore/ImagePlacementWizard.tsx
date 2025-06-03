import { useState, useEffect, useCallback, memo } from "react";
import { imageUrl } from "../utils/baseUrls";
import ImageSelectionStep from "./ImageSelectionStep";
import CropSelectionStep from "./CropSelectionStep";
import ArtworkPlacementStep from "./ArtworkPlacementStep";

const STEP_CONFIG = {
  1: {
    title: "Select Background Image",
    description: "Select",
    progress: 0
  },
  2: {
    title: "Define Selection Area",
    description: "Installation ",
    progress: 33
  },

  3: {
    title: "Position Artwork & Preview",
    description: "Preview",
    progress: 100
  }
};

const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
};

const INITIAL_CROP = {
  x: 0,
  y: 0,
  width: 100,
  height: 100
};

const ImagePlacementWizard = memo(({ onClose, artwork }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropSelection, setCropSelection] = useState(INITIAL_CROP);
  const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");
  const [imageDimension, setImageDimensions] = useState({ height: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [imageHW, setIageHW] = useState(null)
  const [previewImageDimensions, setPreviewImageDimensions] = useState({ height: 0, width: 0 });
  const [imageSizeS, setImageSizeS] = useState({ width: 0, height: 0 });
  const [imageId, setImageId] = useState(null)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);


  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);


  useEffect(() => {
    if (!artwork?.data?.media?.mainImage) return;

    const timer = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const tooLarge = img.width > dimensions.width * 1.5 ||
          img.height > dimensions.height * 1.5;
        setError(tooLarge ? "Artwork may be too large for selected area" : "");
      };
      img.src = `${imageUrl}/users/${artwork.data.media.mainImage}`;
    }, 300);

    return () => clearTimeout(timer);
  }, [artwork, dimensions.width, dimensions.height]);


  useEffect(() => {
    if (currentStep !== 3) return;

    const adjustDimensions = () => {
      const maxWidth = Math.min(window.innerWidth * (isMobile ? 0.9 : 0.8), 1000);
      const maxHeight = Math.min(window.innerHeight * (isMobile ? 0.6 : 0.7), 800);

      setDimensions(prev => ({
        width: Math.min(prev.width, maxWidth),
        height: Math.min(prev.height, maxHeight)
      }));
    };

    adjustDimensions();
    window.addEventListener('resize', adjustDimensions);
    return () => window.removeEventListener('resize', adjustDimensions);
  }, [currentStep, isMobile]);

  const renderStep = useCallback(() => {
    const commonProps = {
      selectedImage,
      onNext: nextStep,
      onPrev: prevStep
    };

    switch (currentStep) {
      case 1:
        return (
          <ImageSelectionStep
            {...commonProps}
            setSelectedImage={setSelectedImage}
            setImageDimensions={setImageDimensions}
            imageDimension={imageDimension}
            isMobile={isMobile}
            setImageId={setImageId}
            setIageHW={setIageHW}
            setPreviewImageDimensions={setPreviewImageDimensions}
            previewImageDimensions={previewImageDimensions}

          />
        );
      case 2:
        return (
          <CropSelectionStep
            {...commonProps}
            cropSelection={cropSelection}
            setCropSelection={setCropSelection}
            previewImageDimensions={previewImageDimensions}
            dimensions={dimensions}
            imageId={imageId}
            imageDimension={imageDimension}
            isMobile={isMobile}
            imageHW={imageHW}
            setImageSizeS={setImageSizeS}


          />
        );
      case 3:
        return (
          <ArtworkPlacementStep
            {...commonProps}
            cropSelection={cropSelection}
            dimensions={dimensions}
            artwork={artwork}
            artworkPosition={artworkPosition}
            setArtworkPosition={setArtworkPosition}
            zoom={zoom}
            imageDimension={imageDimension}
            setZoom={setZoom}
            error={error}
            isMobile={isMobile}
            imageSizeS={imageSizeS}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    selectedImage,
    imageDimension,
    cropSelection,
    dimensions,
    artwork,
    artworkPosition,
    zoom,
    error,
    nextStep,
    prevStep,
    isMobile
  ]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-auto">
      <div className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
        w-full max-w-6xl max-h-[95vh] flex flex-col
        ${isMobile ? 'mx-1 my-1' : 'mx-4 my-8'}
      `}>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            {STEP_CONFIG[currentStep].title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors"
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <div className="px-4 pt-4">
          <div className="flex justify-between mb-4 overflow-x-auto pb-2 -mx-1">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center px-1 min-w-[60px]">
                <div
                  className={`
                    w-8 h-8 flex items-center justify-center rounded-full transition-colors
                    ${step === currentStep ? 'bg-blue-500 text-white' :
                      step < currentStep ? 'bg-green-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                  `}
                >
                  {step < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-500 dark:text-gray-400 text-center">
                  {STEP_CONFIG[step].description}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${STEP_CONFIG[currentStep].progress}%` }}
            ></div>
          </div>
        </div>


        <div className="flex-1 overflow-auto p-3 sm:p-4">
          {renderStep()}
        </div>
      </div>
    </div>
  );
});

export default ImagePlacementWizard;