import React, { useState, useRef, SetStateAction } from "react";
import upload_image from "../../assets/Upload_image.png";
import P from "./P";

const UploadImage = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: any;
  setSelectedFile: React.Dispatch<SetStateAction<any>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Type reference for file input

  // Handle the file input click action
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle the file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {selectedFile ? (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="uploaded image"
          className="w-[200px] h-[200px] cursor-pointer rounded-full"
          onClick={handleImageClick} // Click to re-trigger file selection
        />
      ) : (
        <>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/gif"
            className="hidden" // Hide the input element
            onChange={handleFileChange}
          />
          {/* Placeholder text for when no image is selected */}
          <div
            className="flex justify-center items-center w-[200px] h-[200px] border-2 border-dashed rounded-full cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={upload_image} alt="upload" className="w-1/2 h-1/2" />
          </div>
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Allowed *.jpeg, *.jpg, *.png Max size of 3.1 MB
          </P>
        </>
      )}
    </div>
  );
};

export default UploadImage;
