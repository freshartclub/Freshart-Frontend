import { useState, useEffect, useRef, useCallback } from "react";
import { imageUrl } from "../utils/baseUrls";

const DimensionsStep = ({
    dimensions,
    setDimensions,
    cropSelection,
    setCropSelection,
    selectedImage,
    onNext,
    onPrev,
    imageSizeS,

}) => {
    const [isDirty, setIsDirty] = useState(false);
    const [widthInput, setWidthInput] = useState(dimensions.width.toString());
    const [heightInput, setHeightInput] = useState(dimensions.height.toString());
    const [aspectRatio, setAspectRatio] = useState(dimensions.width / dimensions.height || 1);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [error, setError] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const previewRef = useRef(null);

    console.log(cropSelection)

    useEffect(() => {
        if (selectedImage) {
            const img = new Image();
            img.onload = () => {
                setImageDimensions({ width: img.width, height: img.height });
            };
            img.src = `${imageUrl}/users/${selectedImage}`;
        }
    }, [selectedImage]);

   
    useEffect(() => {
        if (!isDirty && cropSelection.width > 0 && cropSelection.height > 0) {
            const roundedWidth = Math.round(cropSelection.width);
            const roundedHeight = Math.round(cropSelection.height);

            setDimensions({
                width: roundedWidth,
                height: roundedHeight
            });
            setWidthInput(roundedWidth.toString());
            setHeightInput(roundedHeight.toString());
            setAspectRatio(cropSelection.width / cropSelection.height);
        }
    }, [cropSelection, isDirty, setDimensions]);

    // Validate and update dimensions
    const updateDimensions = useCallback((newWidth, newHeight) => {
        // Validate width
        if (newWidth <= 0) {
            setError("Width must be greater than 0");
            return false;
        }

        if (newWidth > imageDimensions.width) {
            setError(`Width cannot exceed image width (${imageDimensions.width}px)`);
            return false;
        }

        // Validate height
        if (newHeight <= 0) {
            setError("Height must be greater than 0");
            return false;
        }

        if (newHeight > imageDimensions.height) {
            setError(`Height cannot exceed image height (${imageDimensions.height}px)`);
            return false;
        }

        setError(null);
        setDimensions({ width: newWidth, height: newHeight });
        setIsDirty(true);
        return true;
    }, [imageDimensions, setDimensions]);

    // Update crop selection when dimensions change
    useEffect(() => {
        if (isDirty && dimensions.width > 0 && dimensions.height > 0) {
            // Calculate new crop selection maintaining the center point
            const centerX = cropSelection.x + cropSelection.width / 2;
            const centerY = cropSelection.y + cropSelection.height / 2;

            const newWidth = dimensions.width;
            const newHeight = dimensions.height;

            let newX = centerX - newWidth / 2;
            let newY = centerY - newHeight / 2;

            // Constrain to image bounds
            newX = Math.max(0, Math.min(newX, imageDimensions.width - newWidth));
            newY = Math.max(0, Math.min(newY, imageDimensions.height - newHeight));

            setCropSelection({
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight
            });
        }
    }, [dimensions, isDirty, cropSelection, setCropSelection, imageDimensions]);

    const handleWidthChange = (e) => {
        const value = e.target.value;
        setWidthInput(value);

        // Only process numeric values
        if (/^\d*$/.test(value) && value !== "") {
            const newWidth = parseInt(value, 10);
            let newHeight = dimensions.height;

            // Maintain aspect ratio if enabled
            if (maintainAspectRatio) {
                newHeight = Math.round(newWidth / aspectRatio);
                setHeightInput(newHeight.toString());
            }

            updateDimensions(newWidth, newHeight);
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        setHeightInput(value);

        // Only process numeric values
        if (/^\d*$/.test(value) && value !== "") {
            const newHeight = parseInt(value, 10);
            let newWidth = dimensions.width;

            // Maintain aspect ratio if enabled
            if (maintainAspectRatio) {
                newWidth = Math.round(newHeight * aspectRatio);
                setWidthInput(newWidth.toString());
            }

            updateDimensions(newWidth, newHeight);
        }
    };

    const toggleAspectRatio = () => {
        const newMaintainAspectRatio = !maintainAspectRatio;
        setMaintainAspectRatio(newMaintainAspectRatio);

        if (newMaintainAspectRatio) {
            // When re-enabling aspect ratio, recalculate based on current width
            setAspectRatio(dimensions.width / dimensions.height);
        }
    };

    const resetDimensions = () => {
        if (cropSelection.width > 0 && cropSelection.height > 0) {
            const roundedWidth = Math.round(cropSelection.width);
            const roundedHeight = Math.round(cropSelection.height);

            setDimensions({
                width: roundedWidth,
                height: roundedHeight
            });
            setWidthInput(roundedWidth.toString());
            setHeightInput(roundedHeight.toString());
            setAspectRatio(cropSelection.width / cropSelection.height);
            setIsDirty(false);
            setError(null);
        }
    };

    console.log(cropSelection.x, "___________")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error && dimensions.width > 0 && dimensions.height > 0) {
            onNext();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-full">
            {/* Left Side - Image with Selection Preview */}
            <div className="relative lg:w-3/5 w-full h-64 sm:h-80 md:h-96 lg:h-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                <div className="relative w-full h-full flex items-center justify-center">
                    {selectedImage && (
                        <div className="relative  w-full h-full flex items-center justify-center">

                            <div className="relative ">
                                <img
                                    src={`${imageUrl}/users/${selectedImage}`}
                                    alt="Background with selection"
                                    className="max-w-full max-h-full object-contain"
                                    draggable="false"
                                    style={{
                                        width: `${imageSizeS?.width}px`,
                                        height: `${imageSizeS?.height}px`
                                    }}
                                />


                                <div
                                    ref={previewRef}
                                    className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 pointer-events-none"
                                    style={{
                                        left: `${cropSelection.x}px`,
                                        top: `${cropSelection.y}px`,
                                        width: `${cropSelection.width}px`,
                                        height: `${cropSelection.height}px`,
                                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                                    }}
                                ></div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Controls */}
            <div className="w-full lg:w-2/5 flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-4 lg:mt-0 lg:ml-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Edit Dimensions</h4>

                <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col">
                        <div className="mb-4 flex-grow">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Fine-tune the dimensions of your selection area.
                            </p>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-l-4 border-red-500 p-3 mb-4">
                                    <p className="text-sm text-red-700 dark:text-red-300">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="width-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Width (px)
                                    </label>
                                    <input
                                        id="width-input"
                                        type="text"
                                        value={widthInput}
                                        onChange={handleWidthChange}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        aria-invalid={!!error}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="height-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Height (px)
                                    </label>
                                    <input
                                        id="height-input"
                                        type="text"
                                        value={heightInput}
                                        onChange={handleHeightChange}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        aria-invalid={!!error}
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="maintainAspectRatio"
                                        type="checkbox"
                                        checked={maintainAspectRatio}
                                        onChange={toggleAspectRatio}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="maintainAspectRatio" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Maintain aspect ratio
                                    </label>
                                </div>

                                {isDirty && (
                                    <button
                                        type="button"
                                        onClick={resetDimensions}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                    >
                                        Reset to original selection
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-4 flex justify-between">
                            <button
                                type="button"
                                onClick={onPrev}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                disabled={!!error || dimensions.width <= 0 || dimensions.height <= 0}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${error || dimensions.width <= 0 || dimensions.height <= 0
                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-200 dark:text-gray-400'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DimensionsStep;