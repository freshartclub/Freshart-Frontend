import React, { useRef, useState, useEffect } from "react";
import { useFieldArray, Control, useFormContext } from "react-hook-form";
import Header from "../../ui/Header"; // Assuming this is your custom Header component

const GeneralMedia = ({ control, url }) => {
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

  const [existingAdditionalImage, setExistingAdditionalImage] = useState([]);

  const [existingAdditionalVideo, setExistingAdditionalVideo] = useState([]);

  const [existingInProcessImage, setExistingInProcessImage] = useState(null);

  useEffect(() => {
    if (url) {
      setExistingMainImage(`${url}/users/${getValues("mainImage")}`);
      setExistingAdditionalImage(getValues("existingAdditionalImage"));
      setExistingInProcessImage(`${url}/users/${getValues("inProcessImage")}`);
      setExistingMainVideo(`${url}/videos/${getValues("mainVideo")}`);
      setExistingAdditionalVideo(getValues("existingAdditionalVideo"));
    }
  }, [url]);

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
      removeAdditionalImageFrom("additionalImage", index);
    } else {
      setExistingAdditionalImage(
        existingAdditionalImage.filter((_, i) => i !== index)
      );
      setValue("existingAdditionalImage", existingAdditionalImage);
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
    <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
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
                className="hidden"
                ref={mainImageInputRef}
                onChange={(e) => handleMainImageChange(e)}
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
                    <div className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
                  )}
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={(e) => setExistingMainImage()}
                  >
                    &times;
                  </span>
                </div>
                <p className="text-center">
                  Drag and drop image here, or click to add image
                </p>
                <span
                  className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                      onClick={() => setExistingInProcessImage()}
                    >
                      &times;
                    </span>
                  </div>
                ) : (
                  <div className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
                )}
                <p className="text-center">
                  Drag and drop image here, or click to add image
                </p>
                <span
                  className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
          <div className="flex flex-wrap gap-4">
            {getValues("additionalImage") &&
              getValues("additionalImage").length > 0 &&
              getValues("additionalImage")?.map((field, i) => (
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
              existingAdditionalImage?.map((field: string, i = i) => (
                <div key={i} className="relative w-28 h-28">
                  <img
                    src={`${url}/users/${field}`}
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
          </div>
          <p className="text-center  mt-4">Click to add additional images</p>
          <span
            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer flex justify-center"
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
            Vidoes
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
                      alt="Main Video"
                      className="w-28 h-28 object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
                  )}
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={(e) => setExistingMainVideo()}
                  >
                    &times;
                  </span>
                </div>
                <p className="text-center">
                  Drag and drop Video here, or click to add Video
                </p>
                <span
                  className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
              <div className="flex flex-wrap gap-4">
                {getValues("additionalVideo") &&
                  getValues("additionalVideo").length > 0 &&
                  getValues("additionalVideo")?.map((field, i) => (
                    <div key={i} className="relative w-28 h-28">
                      <video
                        src={URL.createObjectURL(field)}
                        alt={`Additional Video ${i}`}
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
                    (field: string, i = additionalVideo.length + 1) => (
                      <div key={i} className="relative w-28 h-28">
                        <video
                          src={`${url}/videos/${field}`}
                          alt={`Additional Video ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
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
              <p className="text-center mt-4">Click to add additional Vidoes</p>
              <span
                className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer flex items-center justify-center"
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
