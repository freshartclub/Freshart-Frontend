import { useState, useEffect, useCallback } from "react";
import { imageUrl } from "../utils/baseUrls";
import { useGetAllUploadedImages } from "./http/useGetAllUploadedImages";
import useDeleteUploadedImgMutation from "./http/useDeleteUploadedImgMutation";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../ui/Loader";

const ImageSelectionStep = ({
  selectedImage,
  setSelectedImage,
  setIageHW,
  setImageId,
  setImageDimensions,
  setPreviewImageDimensions,
  previewImageDimensions,
  onNext
}) => {
  const { data: uploadedImages, isLoading, refetch } = useGetAllUploadedImages();
  const [previewImage, setPreviewImage] = useState(null);

  const { mutate: deleteImage, isPending: isDeleting } = useDeleteUploadedImgMutation();

  const handleDelete = (id) => {
    deleteImage(id)
  }

  useEffect(() => {
    if (uploadedImages?.data && uploadedImages?.data?.length > 0) {
      const firstImage = uploadedImages?.data[0];

      if (!selectedImage && firstImage) {
        setPreviewImage(firstImage?.image || null);
        setPreviewImageDimensions({
          height: firstImage?.height || 0,
          width: firstImage?.width || 0,
        });
        setImageDimensions({
          height: firstImage?.height || 0,
          width: firstImage?.width || 0,
        });
        setSelectedImage(firstImage?.image || null);
     
      } else {
        const selected = uploadedImages?.data?.find(img => img?.image === selectedImage);
        if (selected) {
          setPreviewImage(selected?.image || null);
          setPreviewImageDimensions({
            height: selected?.height || 0,
            width: selected?.width || 0,
          });
        }
      }
    } else {
      setPreviewImage(null);
      setPreviewImageDimensions({ height: 0, width: 0 });
      setSelectedImage(null);
    }
  }, [uploadedImages, selectedImage]);

  const handleImageSelect = useCallback((image) => {
    // Add safety check for uploadedImages.data
    if (!uploadedImages?.data) return;
    
    const selected = uploadedImages.data.find(img => img.image === image?.image);

    if (selected) {
      setImageId(selected?._id)
      setPreviewImage(selected.image);
      setPreviewImageDimensions({ height: selected.height, width: selected.width });
      setImageDimensions({ height: selected.height, width: selected.width });
    }
  }, [uploadedImages, setImageDimensions]);

  useEffect(() => {
    // Add safety check for uploadedImages.data
    if (uploadedImages?.data && uploadedImages.data.length > 0) {
      const selectedImage = uploadedImages.data[0];
      setImageId(selectedImage?._id)
    }
  }, [uploadedImages])

  const handleContinue = useCallback(() => {
    if (previewImage) {
      setSelectedImage(previewImage);
      onNext();
    }
  }, [previewImage, setSelectedImage, onNext]);

  if (isLoading) {
    return <Loader/>  //This we need to check this before pushing in producation
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full overflow-y-auto">

      <div className="lg:flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 relative min-h-[300px] flex items-center justify-center">
        {previewImage ? (
          <>
            <img
              src={`${imageUrl}/users/${previewImage}`}
              alt="Selected background preview"
              className="w-full h-full object-contain max-h-[500px]"
              loading="eager"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {previewImageDimensions?.width} × {previewImageDimensions?.height} cm
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              {isLoading ? "Loading images..." : "Select an image from the gallery"}
            </p>
          </div>
        )}
      </div>

      <div className="lg:flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Select Background Image
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {uploadedImages?.data?.length || 0} images available
          </p>
        </div>

        <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-auto bg-gray-50 dark:bg-gray-800">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : uploadedImages?.data?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uploadedImages?.data?.map((img) => (
                <div
                  key={img?._id}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${previewImage === img?.image
                      ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-500"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  onClick={() => handleImageSelect(img)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select image ${img?.name || img?._id}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageSelect(img)}
                >
                  <img
                    src={`${imageUrl}/users/${img?.image}`}
                    alt={img?.name || "User uploaded"}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img._id);
                    }}
                    className="absolute top-2 left-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    aria-label={`Delete image ${img.name || img._id}`}
                    disabled={isDeleting}
                  >
                    <RiDeleteBin6Line className="h-3 w-3 text-white" />
                  </button>

                  {previewImage === img.image && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No images available</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!previewImage || isLoading || isDeleting}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${previewImage && !isLoading && !isDeleting
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            aria-disabled={!previewImage || isLoading || isDeleting}
          >
            {(isLoading || isDeleting) ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isDeleting ? "Deleting..." : "Loading..."}
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelectionStep;