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
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {selectedFile ? (
        <>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="uploaded image "
            className="w-[200px] h-[200px] flex flex-col justify-center items-center cursor-pointer rounded-full"
          />

        </>
      ) : (
        <>
        <input
          // ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          className=""
          onChange={handleFileChange}
        />
        
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Allowed *.jpeg, *.jpg, *.png Max size of 3.1 MB
          </P>
        </>
      )}
    </div>
  );
};

export default UploadImage;
