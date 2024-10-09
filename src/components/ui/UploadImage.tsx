import { useState, useRef } from "react";
import upload_image from "../../assets/Upload_image.png";
import P from "./P";

const UploadImage = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <img
        src={selectedFile || upload_image}
        alt="uploaded image"
        className="w-auto h-auto flex flex-col justify-center items-center cursor-pointer"
        onClick={handleImageClick}
      />

      <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
        Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
      </P>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
