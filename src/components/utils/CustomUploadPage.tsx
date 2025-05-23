import React, { useState, useCallback } from 'react';
import { useAppSelector } from '../../store/typedReduxHooks';
import useUploadImageMutation from '../DiscoverMore/http/useUploadImageMutation';
import toast from 'react-hot-toast';

const CustomUploadPage = () => {
  const darkMode = useAppSelector((state) => state.theme.mode);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);


  const { mutateAsync, isPending } = useUploadImageMutation();

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };


  const handleNext = async () => {
    if (!selectedFile || !artwork?.data?._id) {
      toast.error("Missing file or ID");
      return;
    }

    await mutateAsync({ id: artwork.data._id, file, height, width });
    setShowPositioningPopup(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Upload Your Image</h1>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragging ? 'border-blue-500 bg-blue-100/20' : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />

          {previewUrl ? (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md h-64 md:h-80 mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <button
                className={`px-4 py-2 rounded-md font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl(null);
                  setSelectedFile(null);
                }}
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                className={`w-16 h-16 ${isDragging ? 'text-blue-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="text-lg">
                {isDragging ? 'Drop your image here' : 'Drag & drop an image here or click to browse'}
              </p>
              <p className="text-sm opacity-70">
                Supports JPG, PNG, GIF, etc.
              </p>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="font-semibold mb-2">File Details:</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span>Name:</span>
              <span className="truncate">{selectedFile.name}</span>
              <span>Type:</span>
              <span>{selectedFile.type}</span>
              <span>Size:</span>
              <span>{(selectedFile.size / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            disabled={!selectedFile}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${selectedFile
              ? darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
              : darkMode
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gray-300 cursor-not-allowed'
              } text-white`}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomUploadPage;