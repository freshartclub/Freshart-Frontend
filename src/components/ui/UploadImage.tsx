import React, { SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";
import upload_image from "../../assets/Upload_image.png";
import P from "./P";

const UploadImage = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: any;
  setSelectedFile: React.Dispatch<SetStateAction<any>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

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
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="uploaded image"
          className="w-[200px] h-[200px] cursor-pointer rounded-full object-cover"
          onClick={handleImageClick}
        />
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className="flex justify-center items-center w-[200px] h-[200px] border-2 border-dashed rounded-full cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={upload_image} alt="upload" className="w-1/2 h-1/2" />
          </div>
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            {t("Allowed *.jpeg, *.jpg, *.png Max size of 3.1 MB")}
          </P>
        </>
      )}
    </div>
  );
};

export default UploadImage;
