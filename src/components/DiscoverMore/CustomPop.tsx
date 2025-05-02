import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import useUploadImageMutation from './http/useUploadImageMutation';
import { useGetUpLoadedImgaes } from './http/useGetUpLoadedImgaes';
import ImagePositioningPopup from './ImagePositioningPopup';
import toast from 'react-hot-toast';


const CustomPop = ({ onClose, artwork }) => {
  const [file, setFile] = useState(null);
  const [showPositioningPopup, setShowPositioningPopup] = useState(false);
  const [qrValue, setQrValue] = useState(`${window.location.origin}/discover_more/${artwork?.data?._id}/upload`);
  const [previewUrl, setPreviewUrl] = useState('');

  const { mutateAsync, isPending } = useUploadImageMutation();
  const { data, isLoading } = useGetUpLoadedImgaes(artwork?.data?._id);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
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
  
    await mutateAsync({ id: artwork.data._id, file });
    setShowPositioningPopup(true);
  };
  
  console.log(data?.data?.images)

  // If we're showing the positioning popup, render that instead
  if (showPositioningPopup) {
    return (
      <ImagePositioningPopup 
        onClose={() => {
          setShowPositioningPopup(false);
          onClose();
        }}
        artwork={artwork}
        uploadedImage={data?.data ? data?.data?.images[0] : null}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-xl font-semibold text-gray-800">Upload & QR Generator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
       
        <div className="flex flex-col md:flex-row p-6 gap-6">
          {/* Left Side - Upload */}
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h4 className="mt-2 text-lg font-medium text-gray-700">Upload File</h4>
              <p className="mt-1 text-sm text-gray-500">Drag and drop or click to browse</p>
            </div>
            
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="px-5 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Select File
            </label>
            
            {file && (
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>Selected: <span className="font-medium">{file?.name}</span></p>
                <p className="text-xs text-gray-400">{(file?.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
            
            {previewUrl && (
              <div className="mt-4 w-full flex justify-center">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-40 max-w-full rounded-md border border-gray-200 object-contain"
                />
              </div>
            )}
          </div>

          {/* Right Side - QR Code */}
          <div className="flex-1 flex flex-col items-center">
            <h4 className="text-lg font-medium text-gray-700 mb-4">QR Code Generator</h4>
            
            <div className="p-3 bg-white border border-gray-200 rounded-md mb-4">
              <QRCode 
                value={qrValue} 
                size={160}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
              />
            </div>
            
            <div className="w-full">
              <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-1">
                Enter text or URL
              </label>
              <input
                id="qr-input"
                type="text"
                value={qrValue}
                onChange={handleQrChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type something..."
              />
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Scan this QR code with your device's camera</p>
              <p className="mt-1 text-blue-600">Tip: Try with a URL for quick access</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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