import React, { useEffect, useMemo, useState } from "react";
import GeneralForm from "./GeneralForm";
import upload from "./assets/Upload.png";
import camera from "./assets/camera.png";
import P from "../../ui/P";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import Loader from "../../ui/Loader";

const GeneralUpload = ({ isActiveStatus }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState();
  const [isEditInfo, setIsEditInfo] = useState();

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
    if (data?.data?.artist) {
      setUploadedImage(
        `${data?.data?.url}/users/${data?.data?.artist?.profile?.mainImage}`
      );
    }
  }, [data]);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    if (newImage) {
      formData.append("mainImage", newImage);
    } else {
      formData.append("mainImage", uploadedImage);
    }
    mutate(formData);
  };

  const handleDelete = () => {};

  const defaultValues = {
    artistName: data?.data?.artist?.artistName || "",
    artistSurname1: data?.data?.artist?.artistSurname1 || "",
    artistSurname2: data?.data?.artist?.artistSurname2 || "",
    nickName: data?.data?.artist?.nickName || "",

    country: data?.data?.artist?.address?.country || "Spain",
    zip: data?.data?.artist?.address?.zipCode || "",
    city: data?.data?.artist?.address?.city || "",
    stateRegion: data?.data?.artist?.address?.state || "",
    phoneNumber: data?.data?.artist?.phone || "",
    address: data?.data?.artist?.address?.residentialAddress || "",
    email: data?.data?.artist?.email || "",
    language: data?.data?.artist?.language || [],
    gender: data?.data?.artist?.gender || "",
    about: data?.data?.artist?.aboutArtist?.about || "",

    additionalImage: [],
    existingAdditionalImage: data?.data?.artist?.profile?.additionalImage || [],
    mainImage: data?.data?.artist?.profile?.mainImage || "",
    backImage: data?.data?.artist?.profile?.backImage || "",
    inProcessImage: data?.data?.artist?.profile?.inProcessImage || "",
    mainVideo: data?.data?.artist?.profile?.mainVideo || "",

    additionalVideo: [],
    existingAdditionalVideo: data?.data?.artist?.profile?.additionalVideo || "",

    cvEntries: data?.data?.artist?.highlights?.cv || "",
    highlights: data?.data?.artist?.highlights?.addHighlights || "",

    accounts: data?.data?.artist?.links || "",
    insignia: data?.data?.artist?.insignia || "",

    taxZipCode: data?.data?.artist?.invoice?.taxZipCode || "",
    documentName: data?.data?.document?.documentName || "",
    isArtistEditInfoRequest: data?.data?.artist?.isArtistEditInfoRequest || "",
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full mt-6">
      {/* <div className="shadow-xl p-5 relative lg:w-[30%] h-fit flex flex-col items-center rounded-xl"> */}
      {/* <div className="flex justify-center items-center">
          {uploadedImage ? (
            <img
              src={uploadedImage} // This can either be the uploaded image or the fetched image URL
              alt="uploaded"
              className="w-[146px] object-contain"
            />
          ) : (
            <img src={upload} alt="default" className="object-contain" />
          )}
        </div> */}

      {/* Uploading New Image */}
      {/* {!uploadedImage && (
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
        )} */}

      {/* <P
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
        </P> */}

      {/* <div className="flex justify-center gap-6 mt-10">
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
            <div
              className={`relative w-11 h-6 rounded-full peer dark:bg-[#00A76F] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00A76F] ${
                isActiveStatus !== "active"
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            ></div>
          </label>
        </div> */}

      {/* Update Button */}
      {/* <div className="text-center">
          <button
            onClick={handleUpdateProfile}
            className={`bg-[#FF563014] text-[#B71D18] px-4 py-2 rounded font-semibold mt-10 ${
              isActiveStatus !== "active"
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Update Profile
          </button>
        </div> */}
      {/* </div> */}

      <GeneralForm isActiveStatus={isActiveStatus} />
    </div>
  );
};

export default GeneralUpload;
