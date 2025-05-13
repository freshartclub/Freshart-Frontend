import { useState, useEffect, useRef } from "react";
import { imageUrl } from "../utils/baseUrls";
import { useGetAllUploadedImages } from "./http/useGetAllUploadedImages";
import ImageSelectionStep from "./ImageSelectionStep";


import FinalPreviewStep from "./FinalPreviewStep";
import CropSelectionStep from "./CropSelectionStep";
import DimensionsStep from "./DimensionsStep";
import ArtworkPlacementStep from "./ArtworkPlacementStep";

const ImagePlacementWizard = ({ onClose, artwork }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropSelection, setCropSelection] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");

  const [imageDimension , setImageDimensions] = useState({height:0 , width:0})

  // Check if artwork dimensions fit in the crop selection
  useEffect(() => {
    if (artwork?.data?.media?.mainImage) {
      const img = new Image();
      img.onload = () => {
        const artworkAspectRatio = img.width / img.height;
        const selectionAspectRatio = dimensions.width / dimensions.height;
        
        // Simple check - if artwork is significantly larger than selection
        if (img.width > dimensions.width * 1.5 || img.height > dimensions.height * 1.5) {
          setError("Artwork may be too large for selected area");
        } else {
          setError("");
        }
      };
      img.src = `${imageUrl}/users/${artwork?.data?.media?.mainImage}`;
    }
  }, [artwork, dimensions]);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  

  
  const renderStep = () => {
  
    switch (currentStep) {
      case 1:
        return (
          <ImageSelectionStep 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setImageDimensions={setImageDimensions}
            imageDimension={imageDimension}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <CropSelectionStep
            selectedImage={selectedImage}
            cropSelection={cropSelection}
            setCropSelection={setCropSelection}
            imageDimension={imageDimension}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <DimensionsStep
            dimensions={dimensions}
            setDimensions={setDimensions}
            cropSelection={cropSelection}
            setCropSelection={setCropSelection}
            selectedImage={selectedImage}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ArtworkPlacementStep
            selectedImage={selectedImage}
            cropSelection={cropSelection}
            dimensions={dimensions}
            artwork={artwork}
            artworkPosition={artworkPosition}
            setArtworkPosition={setArtworkPosition}
            zoom={zoom}
            setZoom={setZoom}
            error={error}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 h-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-[90vw] w-full h-[100vh] max-h-[100vh] overflow-hidden overflow-y-auto flex flex-col">
        
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            {currentStep === 1 && "Select Background Image"}
            {currentStep === 2 && "Define Selection Area"}
            {currentStep === 3 && "Set Dimensions"}
            {currentStep === 4 && "Position Artwork & Preview"}
            
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

       
        <div className="px-4 pt-4">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step === currentStep
                      ? "bg-blue-500 text-white"
                      : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  {step === 1 && "Select"}
                  {step === 2 && "Crop"}
                  {step === 3 && "Dimensions"}
                  {step === 4 && "Position"}
                  
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

       
        <div className="flex-1 flex flex-col md:flex-row h-full p-4 gap-4 overflow-hidden">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ImagePlacementWizard;