import { useState } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { useAppSelector } from "../../store/typedReduxHooks";
import useUploadImageMutation from "./http/useUploadImageMutation";

import ImagePlacementWizard from "./ImagePlacementWizard";


const CustomPop = ({ onClose, artwork }) => {
  const [file, setFile] = useState(null);
  const [showPositioningPopup, setShowPositioningPopup] = useState(false);
  const [qrValue, setQrValue] = useState(`${window.location.origin}/discover_more/${artwork?.data?._id}/upload`);
  const [previewUrl, setPreviewUrl] = useState("");
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [roomName, setRoomName] = useState("")
  const [isDragOver, setIsDragOver] = useState(false);

  const { mutateAsync, isPending } = useUploadImageMutation();

  const dark = useAppSelector((state) => state.theme.mode);

  const handleFileSelection = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelection(selectedFile);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleQrChange = (e) => {
    setQrValue(e.target.value);
  };

  const handleNext = async () => {
    if (!file || !artwork?.data?._id) {
      toast.error("Missing file or ID");
      return;
    }

    await mutateAsync({ id: artwork.data._id, file, height, width });
    setShowPositioningPopup(true);
  };

  const handleOdlUpload = () => {
    setShowPositioningPopup(true);
  };

  if (showPositioningPopup) {

    console.log("hello")
    return (
      <ImagePlacementWizard
        onClose={() => {
          setShowPositioningPopup(false);
          onClose();
        }}
        artwork={artwork}
      // uploadedImage={data?.data ? data?.data?.image : null}
      />
    );
  }

  return (
    <div className={`fixed inset-0 ${dark ? "bg-gray-900" : "bg-black"} bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      <div className={`${dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden`}>
        <div className={`flex justify-between items-center border-b ${dark ? "border-gray-700" : "border-gray-200"} p-4`}>
          <h3 className="text-xl font-semibold"> Custom Art View</h3>
          <button
            onClick={onClose}
            className={`${dark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} focus:outline-none`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[65vh] overflow-y-auto flex-col p-6 gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div
              className={`flex-1 border-2 border-dashed ${isDragOver
                ? (dark ? "border-blue-400 bg-blue-900/20" : "border-blue-400 bg-blue-50")
                : (dark ? "border-gray-600" : "border-gray-300")
                } rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-200`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewUrl ? null : (
                <div className="text-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 mx-auto ${isDragOver
                      ? "text-blue-500"
                      : (dark ? "text-gray-500" : "text-gray-400")
                      } transition-colors`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <h4 className={`mt-2 text-lg font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {isDragOver ? "Drop file here" : "Upload File"}
                  </h4>
                  <p className={`mt-1 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {isDragOver ? "Release to upload" : "Drag and drop or click to browse"}
                  </p>
                </div>
              )}

              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className={`px-5 py-2 bg-[#EE1D52] text-white rounded-md cursor-pointer transition-colors`}>
                {previewUrl ? "Select Another Image" : "Select Image"}
              </label>

              {file && (
                <div className={`mt-4 text-sm ${dark ? "text-gray-300" : "text-gray-600"} text-center`}>
                  <p>
                    Selected: <span className="font-medium">{file?.name}</span>
                  </p>
                  <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{(file?.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              {previewUrl && (
                <div className="mt-4 w-full flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={`max-h-40 max-w-full rounded-md border ${dark ? "border-gray-600" : "border-gray-200"} object-contain`}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center">
              <h4 className={`text-lg font-medium ${dark ? "text-gray-300" : "text-gray-700"} mb-4`}>QR Code</h4>

              <div className={`p-3 ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} border rounded-md mb-4`}>
                <QRCode value={qrValue} size={160} bgColor={dark ? "#374151" : "#ffffff"} fgColor={dark ? "#ffffff" : "#000000"} level="Q" />
              </div>

              <div className="w-full">
                <label htmlFor="qr-input" className={`block text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Enter text or URL
                </label>
                <input
                  id="qr-input"
                  type="text"
                  value={qrValue}
                  onChange={handleQrChange}
                  className={`w-full px-3 py-2 border ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Type something..."
                />
              </div>
            </div>

          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
              Enter Room Details
            </h1>

           
            <div className="mb-6">
              <label
                htmlFor="room-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                id="room-input"
                required
                placeholder="e.g., Living Room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="w-full">
                <label
                  htmlFor="height-input"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Height <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="height-input"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500 dark:text-gray-400">cm</span>
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="width-input"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Width <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="width-input"
                    placeholder="Enter width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500 dark:text-gray-400">cm</span>
                </div>
              </div>
            </div>
          </div>


          <div>
            <div className={`mt-4 text-xs ${dark ? "text-gray-400" : "text-gray-500"} text-center`}>
              <p>Scan this QR code with your device's camera</p>
              <p className={`mt-1 ${dark ? "text-blue-400" : "text-blue-600"}`}>Tip: Try with a URL for quick access</p>
            </div>

            <div onClick={() => handleOdlUpload()} className="mt-4 text-xs text-center cursor-pointer">
              <p className={`${dark ? "text-blue-400" : "text-blue-600"}`}>Continue with old uploads</p>
            </div>
          </div>
        </div>

        <div className={`${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} px-4 py-3 flex justify-end border-t`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 ${dark ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } rounded-md focus:outline-none focus:ring-2 ${dark ? "focus:ring-gray-500" : "focus:ring-gray-500"} mr-2`}
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 bg-[#EE1D52] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={!file || isPending}
          >
            {isPending ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPop;