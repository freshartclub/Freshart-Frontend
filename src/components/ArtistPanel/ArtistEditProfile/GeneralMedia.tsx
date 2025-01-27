import { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import image_icon from "../../../assets/image_icon.png";
import video_icon from "../../../assets/video_icon.png";
import Header from "../../ui/Header";
import { imageUrl } from "../../utils/baseUrls";
import { useTranslation } from "react-i18next";

const GeneralMedia = ({ control, data, isActiveStatus }) => {
  const { t } = useTranslation();
  const { setValue, getValues, watch } = useFormContext();

  useEffect(() => {
    watch("mainImage");
    watch("inProcessImage");
    watch("existingAdditionalImage");
    watch("additionalImage");
    watch("mainVideo");
    watch("additionalVideo");
  }, []);

  const { append: appendVideo, remove: removeVideo } = useFieldArray({
    control,
    name: "additionalVideo",
  });

  const { remove: removeMainVideo } = useFieldArray({
    control,
    name: "mainVideo",
  });

  const { remove: removeInProcessImage } = useFieldArray({
    control,
    name: "inProcessImage",
  });

  const { remove: removeMainImage } = useFieldArray({
    control,
    name: "mainImage",
  });

  const { append: appendAdditionalImage, remove: removeAdditionalImageFrom } =
    useFieldArray({
      control,
      name: "additionalImage",
    });

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const inProcessImageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingMainVideo, setExistingMainVideo] = useState(null);

  const [existingAdditionalImage, setExistingAdditionalImage] = useState([]);
  const [existingAdditionalVideo, setExistingAdditionalVideo] = useState([]);
  const [existingInProcessImage, setExistingInProcessImage] = useState(null);

  useEffect(() => {
    setExistingMainImage(
      data?.mainImage ? `${imageUrl}/users/${data?.mainImage}` : null
    );
    setExistingAdditionalImage(data?.additionalImage);
    setExistingInProcessImage(
      data?.inProcessImage ? `${imageUrl}/users/${data?.inProcessImage}` : null
    );
    setExistingMainVideo(
      data?.mainVideo ? `${imageUrl}/videos/${data?.mainVideo}` : null
    );
    setExistingAdditionalVideo(data?.additionalVideo);
  }, [data]);

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("mainImage", file);
      const imageUrl = URL.createObjectURL(file);
      setExistingMainImage(imageUrl);
    }
  };

  const handleMainVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("mainVideo", file);
      const imageUrl = URL.createObjectURL(file);
      setExistingMainVideo(imageUrl);
    }
  };

  const handleInProcessImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("inProcessImage", file);
      const imageUrl = URL.createObjectURL(file);
      setExistingInProcessImage(imageUrl);
    }
  };

  const handleAdditionalImageUpload = (e) => {
    const files = e.target.files;

    Array.from(files).forEach((val) => {
      appendAdditionalImage(val);
    });
  };

  const handleAdditionalVideoUpload = (e) => {
    const files = e.target.files;

    Array.from(files).forEach((val) => {
      appendVideo(val);
    });
  };

  const triggerMainImageInput = () => {
    if (mainImageInputRef.current) {
      mainImageInputRef.current.click();
    }
  };

  const triggerInProcessImageInput = () => {
    if (inProcessImageInputRef.current) {
      inProcessImageInputRef.current.click();
    }
  };

  const triggerVideoInput = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const removeAdditionalImage = async (index: number, typeFile: string) => {
    if (typeFile === "File") {
      removeAdditionalImageFrom(index);
    } else {
      const updatedImages = existingAdditionalImage.filter(
        (_, i) => i !== index
      );

      setExistingAdditionalImage(updatedImages);
      setValue("existingAdditionalImage", updatedImages);
    }
  };

  const handleRemoveMainImage = async (typeFile: string) => {
    if (typeFile === "File") {
      removeMainImage("mainImage");
    } else {
      setExistingMainImage(null);
      setValue("mainImage", "null");
    }
  };

  const handleRemoveInProcessImage = async (typeFile: string) => {
    if (typeFile === "File") {
      removeInProcessImage("inProcessImage");
    } else {
      setExistingInProcessImage(null);
      setValue("inProcessImage", "null");
    }
  };

  const handleRemoveMainVidoe = async (typeFile: string) => {
    if (typeFile === "File") {
      removeMainVideo("mainVideo");
    } else {
      setExistingMainVideo(null);
      setValue("mainVideo", "null");
    }
  };

  const removeAdditionalVideo = async (index: number, typeFile: string) => {
    if (typeFile === "File") {
      removeVideo(index);
    }

    if (typeFile === "Url") {
      const updatedVideos = existingAdditionalVideo.filter(
        (_, i) => i !== index
      );

      setExistingAdditionalVideo(updatedVideos);
      setValue("existingAdditionalVideo", updatedVideos);
    }
  };

  return (
    <div className="p-4 mt-6 bg-white rounded-lg shadow-md border mb-4 ">
      <Header
        variant={{ theme: "dark", weight: "semiBold" }}
        className="sm:text-xl text-lg mb-2"
      >
        {t("Media")}
      </Header>

      <div className="border-dashed border-2 border-gray-400 rounded-md p-4">
        <div className="bg-white rounded-md">
          <Header
            variant={{ size: "lg", weight: "semiBold" }}
            className="mb-4 text-[#203F58]"
          >
            {t("Photos")}
          </Header>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                {t("Main Photo")}
              </Header>
              <input
                type="file"
                accept="image/*"
                className="hidden "
                ref={mainImageInputRef}
                onChange={(e) => handleMainImageChange(e)}
              />
              <div className="bg-[#F9F9FC] shadow rounded-md border border-dashed py-4 sm:py-6 px-4 sm:px-12 flex flex-col items-center">
                <div className="relative">
                  {existingMainImage ? (
                    <img
                      src={existingMainImage}
                      alt="Main Image"
                      className="w-28 h-28 object-cover"
                    />
                  ) : (
                    <img
                      src={image_icon}
                      className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                    />
                  )}
                  <span
                    className={`absolute top-1 ${
                      existingMainImage ? "block" : "hidden"
                    } right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                      isActiveStatus !== "active" ? "" : ""
                    }`}
                    onClick={(e) => handleRemoveMainImage("Url")}
                  >
                    &times;
                  </span>
                </div>
                {existingMainImage ? null : (
                  <p className="text-center text-xs md:text-base">
                    {t("Drag and drop image here, or click to add image")}
                  </p>
                )}
                <span
                  className="bg-[#DEDEFA] sm:w-fit w-full text-center font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                  onClick={triggerMainImageInput}
                >
                  {t("Add Image")}
                </span>
              </div>
            </div>

            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                {t("In-Process Photo")}
              </Header>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inProcessImageInputRef}
                onChange={(e) => handleInProcessImageUpload(e)}
              />
              <div className="bg-[#F9F9FC] shadow rounded-md border border-dashed py-4 sm:py-6 px-4 sm:px-12 flex flex-col items-center">
                {existingInProcessImage ? (
                  <div className="relative">
                    <img
                      src={existingInProcessImage}
                      alt="In-Process Image"
                      className="w-28 h-28 object-cover"
                    />
                    <span
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                      onClick={() => handleRemoveInProcessImage("url")}
                    >
                      &times;
                    </span>
                  </div>
                ) : (
                  <img
                    src={image_icon}
                    className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                  />
                )}
                {existingInProcessImage ? null : (
                  <p className="text-center text-xs md:text-base">
                    {t("Drag and drop image here, or click to add image")}
                  </p>
                )}
                <span
                  className="bg-[#DEDEFA] sm:w-fit w-full text-center font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                  onClick={triggerInProcessImageInput}
                >
                  {t("Add Image")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md mt-4">
          <Header
            variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            className="mb-2 text-[#203F58]"
          >
            {t("Additional Photos")}
          </Header>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photos-input"
            multiple
            onChange={(e) => handleAdditionalImageUpload(e)}
          />
          <div className="flex flex-col p-4 shadow rounded-md border border-dashed flex-wrap gap-4 items-center">
            {getValues("additionalImage") &&
              getValues("additionalImage").length > 0 &&
              getValues("additionalImage").map((field, i) => (
                <div key={i} className="relative w-28 h-28">
                  <img
                    src={URL.createObjectURL(field)}
                    alt={`Additional Image ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => removeAdditionalImage(i, "File")}
                  >
                    &times;
                  </span>
                </div>
              ))}
            {existingAdditionalImage &&
              existingAdditionalImage.length > 0 &&
              existingAdditionalImage?.map((field: string, i: number) => (
                <div key={i} className="relative w-28 h-28">
                  <img
                    src={`${imageUrl}/users/${field}`}
                    alt={`Additional Image ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => removeAdditionalImage(i, "Url")}
                  >
                    &times;
                  </span>
                </div>
              ))}

            {getValues("additionalImage")?.length === 0 &&
            existingAdditionalImage.length === 0 ? (
              <div className="flex flex-col items-center">
                <img
                  src={image_icon}
                  className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                />
                <p className="text-center text-xs md:text-base">
                  {t("Click to add additional images")}
                </p>
              </div>
            ) : null}
            <span
              className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md w-full text-center cursor-pointer flex items-center justify-center"
              onClick={() => document.querySelector("#photos-input").click()}
            >
              {t("Add Image")}
            </span>
          </div>
        </div>

        <div>
          <Header
            variant={{ size: "lg", weight: "semiBold" }}
            className="mb-4 text-[#203F58] mt-5"
          >
            {t("Videos")}
          </Header>

          <div className="grid lg:grid-cols-1 gap-4">
            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                {t("Main Video")}
              </Header>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={videoInputRef}
                onChange={(e) => handleMainVideoChange(e)}
              />
              <div className="bg-[#F9F9FC] shadow rounded border border-dashed p-4 flex flex-col items-center">
                <div className="relative">
                  {existingMainVideo ? (
                    <video
                      src={existingMainVideo}
                      controls
                      className="w-28 h-28 object-cover"
                    />
                  ) : (
                    <img
                      src={video_icon}
                      className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                    />
                  )}
                  <span
                    className={`absolute ${
                      existingMainVideo ? "block" : "hidden"
                    } top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer`}
                    onClick={(e) => handleRemoveMainVidoe("Url")}
                  >
                    &times;
                  </span>
                </div>
                {existingMainVideo ? null : (
                  <p className="text-center  text-sm md:text-base">
                    {t("Drag and drop Video here, or click to add Video")}
                  </p>
                )}
                <span
                  className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 w-full text-center rounded-md cursor-pointer"
                  onClick={triggerVideoInput}
                >
                  {t("Add Video")}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-md mt-4">
              <Header
                variant={{ size: "lg", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                {t("Additional Videos")}
              </Header>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="Videos-input"
                multiple
                onChange={(e) => handleAdditionalVideoUpload(e)}
              />
              <div className="flex flex-col p-4 shadow rounded-md border border-dashed flex-wrap gap-2 items-center">
                {getValues("additionalVideo") &&
                  getValues("additionalVideo").length > 0 &&
                  getValues("additionalVideo")?.map((field, i) => (
                    <div key={i} className="relative w-28 h-28">
                      <video
                        src={URL.createObjectURL(field)}
                        controls
                        className="w-full h-full object-cover"
                      />
                      <span
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => removeAdditionalVideo(i, "File")}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                {existingAdditionalVideo &&
                  existingAdditionalVideo.length > 0 &&
                  existingAdditionalVideo?.map(
                    (
                      field: string,
                      i = getValues("additionalVideo")?.length + 1
                    ) => (
                      <div key={i} className="relative w-28 h-28">
                        <video
                          src={`${imageUrl}/videos/${field}`}
                          controls
                          className="w-full h-full object-cover"
                        />
                        <span
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                          onClick={() => removeAdditionalVideo(i, "Url")}
                        >
                          &times;
                        </span>
                      </div>
                    )
                  )}

                {existingAdditionalVideo.length === 0 &&
                getValues("additionalVideo")?.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={video_icon}
                      className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                    />
                    <p className="text-center  text-sm md:text-base">
                      {t("Drag and drop Video here, or click to add Video")}
                    </p>
                  </div>
                ) : null}

                <span
                  className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 w-full text-center rounded-md cursor-pointer flex items-center justify-center"
                  onClick={() =>
                    document.querySelector("#Videos-input").click()
                  }
                >
                  {t("Add Video")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedia;
