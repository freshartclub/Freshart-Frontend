import React, { useEffect, useState } from "react";
import GeneralForm from "./GeneralForm";
import upload from "./assets/Upload.png";
import camera from "./assets/camera.png";
import P from "../../ui/P";
import { useGetArtistDetails } from "./http/useGetDetails";
import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import Loader from "../../ui/Loader";

const GeneralUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState();

  const { mutate, isPending } = useGetSaveArtistDetailsMutation();

  const { data, isLoading } = useGetArtistDetails();

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  useEffect(() => {
    if (data?.data?.artist?.profile?.mainImage !== null) {
      setUploadedImage(
        `${data.data?.url}/users/${data?.data?.artist?.profile?.mainImage}`
      );
    } else {
      setUploadedImage(null);
    }
  }, [data]);

  console.log(data);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    if (newImage) {
      formData.append("mainImage", newImage);
    } else {
      formData.append("mainImage", uploadedImage);
    }
    mutate(formData);
  };

  console.log(
    `${data.data?.url}/users/${data?.data?.artist?.profile?.mainImage}`
  );

  const handleDelete = () => {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-5 w-full mt-6">
      <div className="shadow-xl p-5 relative w-[30%] h-fit flex flex-col items-center rounded-xl">
        <div className="flex justify-center items-center">
          {/* Display the uploaded image or the default image fetched from the server */}
          {uploadedImage ? (
            <img
              src={uploadedImage} // This can either be the uploaded image or the fetched image URL
              alt="uploaded"
              className="w-[146px] object-contain"
            />
          ) : (
            <img src={upload} alt="default" className="object-contain" />
          )}
        </div>

        {/* Uploading New Image */}
        {!uploadedImage && (
          <P
            variant={{ size: "base", theme: "light", weight: "normal" }}
            className="absolute top-20 justify-center flex flex-col items-center gap-3"
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <img src={camera} alt="click icon" />
              <span className="text-sm">Update Photo</span>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </P>
        )}

        <P
          variant={{ size: "base", weight: "normal" }}
          className="text-center text-[#919EAB] mt-10"
        >
          Allowed *.jpeg, *.jpg, *.png, *.gif
        </P>
        <P
          variant={{ size: "base", weight: "normal" }}
          className="text-center text-[#919EAB]"
        >
          Max size of 3.1 MB
        </P>

        <div className="flex justify-center gap-6 mt-10">
          <P
            variant={{
              size: "base",
              weight: "medium",
            }}
            className="text-[#1C252E]"
          >
            Public Profile
          </P>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 rounded-full peer dark:bg-[#00A76F] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00A76F]"></div>
          </label>
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button
            onClick={handleUpdateProfile}
            className="bg-[#FF563014] text-[#B71D18] px-4 py-2 rounded font-semibold mt-10"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* General Form */}
      <GeneralForm  />
    </div>
  );
};

export default GeneralUpload;
