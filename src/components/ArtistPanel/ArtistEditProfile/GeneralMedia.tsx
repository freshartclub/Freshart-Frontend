import React, { useRef } from "react";
import { useFieldArray, Control, RegisterOptions } from "react-hook-form";
import Header from "../../ui/Header";

const GeneralMedia = ({ control }) => {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "videos",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        appendImage({ url: file });
      });
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const videoUrl = file;
      appendVideo({ url: videoUrl });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerVideoInput = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  return (
    <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
      <Header
        variant={{ theme: "dark", weight: "bold" }}
        className="text-xl mb-2 "
      >
        Media
      </Header>

      <Header
        variant={{ size: "lg", weight: "semiBold" }}
        className="mb-4 text-[#203F58]"
      >
        Photos
      </Header>
      <div className="border-dashed border-2 border-gray-400 rounded-md p-4">
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          {imageFields.map((image, index) => (
            <div key={image.id} className="relative w-24 h-24">
              <img
                src={image.url}
                alt={`upload-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                className="absolute top-0 right-0 w-6 h-6 rounded-xl gap-1 bg-[#CFE7DC]"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div
          className="p-4 text-center cursor-pointer outline-none mb-4"
          onClick={triggerFileInput}
        >
          Drag and drop image here, or click to add image
        </div>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="text-center">
          <span
            className="bg-[#DEDEFA] text-[#102030] px-4 py-2 rounded font-semibold cursor-pointer"
            onClick={triggerFileInput}
          >
            Add Image
          </span>
        </div>
      </div>

      <Header
        variant={{ size: "lg", weight: "semiBold" }}
        className="mt-8 mb-4 text-[#203F58]"
      >
        Videos
      </Header>
      <div className="border-dashed border-2 border-gray-400 rounded-md p-4">
        <div className="mb-4">
          {videoFields.map((video, index) => (
            <div key={video.id} className="relative w-full h-64">
              <video
                src={video.url}
                controls
                className="w-full h-full object-cover rounded-md"
              />
              <button
                className="absolute top-0 right-0 w-6 h-6 rounded-xl gap-1 bg-[#CFE7DC]"
                onClick={() => removeVideo(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div
          className="p-4 text-center cursor-pointer outline-none mb-4"
          onClick={triggerVideoInput}
        >
          Drag and drop video here, or click to add video
        </div>
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleVideoUpload}
        />
        <div className="text-center">
          <span
            className="bg-[#DEDEFA] text-[#102030] px-4 py-2 rounded font-semibold cursor-pointer"
            onClick={triggerVideoInput}
          >
            Add Video
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedia;
