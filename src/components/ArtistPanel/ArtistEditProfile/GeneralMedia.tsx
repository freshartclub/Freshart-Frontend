import React, { useRef, useState, useEffect } from "react";
import {
  useFieldArray,
  Control,
  useFormContext,
  useForm,
} from "react-hook-form";
import Header from "../../ui/Header";
import image_icon from "../../../assets/image_icon.png";
import video_icon from "../../../assets/video_icon.png";

const GeneralMedia = ({ control, data, url, isActiveStatus }) => {
  const { setValue, getValues, watch } = useFormContext();

  useEffect(() => {
    watch("mainImage");
    watch("inProcessImage");
    watch("existingAdditionalImage");
    watch("additionalImage");
    watch("mainVideo");
    watch("additionalVideo");
  }, []);

  const {
    fields: videoFields,
    append: appendVideo,

    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "additionalVideo",
  });

  const {
    fields: inProcessImageField,

    remove: removeInProcessImage,
  } = useFieldArray({
    control,
    name: "inProcessImage",
  });

  const { fields: mainImageFields, remove: removeMainImage } = useFieldArray({
    control,
    name: "mainImage",
  });

  const {
    fields: additionalImage,
    append: appendAdditionalImage,
    remove: removeAdditionalImageFrom,
  } = useFieldArray({
    control,
    name: "additionalImage",
  });

  // Refs for file inputs
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const inProcessImageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingMainVideo, setExistingMainVideo] = useState(null);

  const [mainImageChanged, setMainImageChanged] = useState(false);

  const [existingAdditionalImage, setExistingAdditionalImage] = useState([]);
  const [existingAdditionalVideo, setExistingAdditionalVideo] = useState([]);
  const [existingInProcessImage, setExistingInProcessImage] = useState(null);
  const [inProcessImageChanged, setInProcessImageChanged] = useState(false);

  useEffect(() => {
    setExistingMainImage(
      data?.mainImage ? `${url}/users/${data?.mainImage}` : null
    );
    setExistingAdditionalImage(data?.additionalImage);
    setExistingInProcessImage(
      data?.inProcessImage ? `${url}/users/${data?.inProcessImage}` : null
    );
    setExistingMainVideo(
      data?.mainVideo ? `${url}/videos/${data?.mainVideo}` : null
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
    console.log("vidoe");
    const files = e.target.files;

    Array.from(files).forEach((val) => {
      console.log(val);

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
      removeAdditionalImageFrom("additionalImage", index);
    } else {
      setExistingAdditionalImage(
        existingAdditionalImage.filter((_, i) => i !== index)
      );
      setValue("existingAdditionalImage", existingAdditionalImage);
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

  const removeAdditionalVideo = async (index: number, typeFile: string) => {
    if (typeFile === "File") {
      removeVideo("additionalVideo", index);
    }

    if ((typeFile = "Url")) {
      setExistingAdditionalVideo(
        existingAdditionalVideo.filter((_, i) => i !== index)
      );
      setValue("existingAdditionalVideo", existingAdditionalVideo);
    }
  };

  const removeExistingAdditionalVideo = async (
    index: number,
    typeFile: string
  ) => {
    if ((typeFile = "Url")) {
      setExistingAdditionalVideo(
        existingAdditionalVideo.filter((_, i) => i !== index)
      );
      setValue("existingAdditionalVideo", existingAdditionalVideo);
    }
  };

  return (
    <div className="p-6 mt-6 bg-white rounded-lg shadow-md border mb-4 ">
      <Header
        variant={{ theme: "dark", weight: "bold" }}
        className="text-xl mb-2"
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
        <div className="bg-white p-4 rounded-md mt-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                Main Photo
              </Header>
              <input
                type="file"
                accept="image/*"
                className="hidden "
                ref={mainImageInputRef}
                onChange={(e) => handleMainImageChange(e)}
                disabled={isActiveStatus !== "active"}
              />
              <div className="bg-[#F9F9FC] border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
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
                      isActiveStatus !== "active"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={(e) => handleRemoveMainImage("Url")}
                  >
                    &times;
                  </span>
                </div>
                <p className="text-center text-xs md:text-base">
                  Drag and drop image here, or click to add image
                </p>
                <span
                  className={`bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer ${
                    isActiveStatus !== "active" ? "pointer-events-none" : ""
                  }`}
                  onClick={triggerMainImageInput}
                >
                  Add Image
                </span>
              </div>
            </div>

            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                In-Process Photo
              </Header>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inProcessImageInputRef}
                onChange={(e) => handleInProcessImageUpload(e)}
              />
              <div className="bg-[#F9F9FC] border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                {existingInProcessImage ? (
                  <div className="relative">
                    <img
                      src={existingInProcessImage}
                      alt="In-Process Image"
                      className="w-28 h-28 object-cover"
                    />
                    <span
                      className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                        isActiveStatus !== "active"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
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
                <p className="text-center text-xs md:text-base">
                  Drag and drop image here, or click to add image
                </p>
                <span
                  className={`bg-[#DEDEFA]  font-bold mt-2 p-3 px-4 rounded-md cursor-pointer ${
                    isActiveStatus !== "active" ? "pointer-events-none" : ""
                  }`}
                  onClick={triggerInProcessImageInput}
                >
                  Add Image
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Additional Images Section */}
        <div className="bg-white p-4 rounded-md mt-4">
          <Header
            variant={{ size: "lg", weight: "semiBold" }}
            className="mb-2 text-[#203F58]"
          >
            Additional Photos
          </Header>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photos-input"
            multiple
            onChange={(e) => handleAdditionalImageUpload(e)}
          />
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
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
                    src={`${url}/users/${field}`}
                    alt={`Additional Image ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                      isActiveStatus !== "active"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => removeAdditionalImage(i, "Url")}
                  >
                    &times;
                  </span>
                </div>
              ))}
          </div>
          {getValues("additionalImage") || existingAdditionalImage ? null : (
            <>
              <img
                src={image_icon}
                className="w-28 h-28 bg-gray-200 rounded-md mb-4"
              />
              <p className="text-center text-xs md:text-base mt-4">
                Click to add additional images
              </p>
            </>
          )}
          <span
            className={`bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer flex items-center justify-center ${
              isActiveStatus !== "active" ? "pointer-events-none" : ""
            }`}
            onClick={() => document.querySelector("#photos-input").click()}
          >
            Add Image
          </span>
        </div>

        {/* vidoes for */}
        <div>
          <Header
            variant={{ size: "lg", weight: "semiBold" }}
            className="mb-4 text-[#203F58] mt-5"
          >
            Videos
          </Header>

          <div className="grid lg:grid-cols-1 gap-4">
            <div>
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                Main Video
              </Header>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={videoInputRef}
                onChange={(e) => handleMainVideoChange(e)}
              />
              <div className="bg-[#F9F9FC] border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
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
                    } top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                      isActiveStatus !== "active"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={(e) => setExistingMainVideo()}
                  >
                    &times;
                  </span>
                </div>
                <p className="text-center  text-sm md:text-base">
                  Drag and drop Video here, or click to add Video
                </p>
                <span
                  className={`bg-[#DEDEFA]  font-bold mt-2 p-3 px-4 rounded-md cursor-pointer ${
                    isActiveStatus !== "active" ? "pointer-events-none" : ""
                  }`}
                  onClick={triggerVideoInput}
                >
                  Add Video
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md mt-4">
              <Header
                variant={{ size: "lg", weight: "semiBold" }}
                className="mb-2 text-[#203F58]"
              >
                Additional Videos
              </Header>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="Videos-input"
                multiple
                onChange={(e) => handleAdditionalVideoUpload(e)}
              />
              <div className="flex flex-col md:flex-row items-center flex-wrap gap-4">
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
                          src={`${url}/videos/${field}`}
                          controls
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                            isActiveStatus !== "active"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            removeExistingAdditionalVideo(i, "Url")
                          }
                        >
                          &times;
                        </span>
                      </div>
                    )
                  )}
              </div>

              {existingAdditionalVideo ||
              getValues("additionalVideo") ? null : (
                <>
                  <img
                    src={video_icon}
                    className="w-28 h-28 bg-gray-200 rounded-md mb-4"
                  />
                </>
              )}

              <span
                className={`bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer flex items-center justify-center ${
                  isActiveStatus !== "active" ? "pointer-events-none" : ""
                }`}
                onClick={() => document.querySelector("#Videos-input").click()}
              >
                Add Video
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedia;
