import { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { imageUrl } from "../../utils/baseUrls";

const GeneralMedia = ({ control, data, isActiveStatus, dark }) => {
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

  const { append: appendAdditionalImage, remove: removeAdditionalImageFrom } = useFieldArray({
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
    setExistingMainImage(data?.mainImage ? `${imageUrl}/users/${data?.mainImage}` : null);
    setExistingAdditionalImage(data?.additionalImage);
    setExistingInProcessImage(data?.inProcessImage ? `${imageUrl}/users/${data?.inProcessImage}` : null);
    setExistingMainVideo(data?.mainVideo ? `${imageUrl}/videos/${data?.mainVideo}` : null);
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
      const updatedImages = existingAdditionalImage.filter((_, i) => i !== index);

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
      const updatedVideos = existingAdditionalVideo.filter((_, i) => i !== index);

      setExistingAdditionalVideo(updatedVideos);
      setValue("existingAdditionalVideo", updatedVideos);
    }
  };

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Media")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Profile Photo")}</label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${
              dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
            } ${!existingMainImage ? "min-h-[200px]" : ""}`}
            onClick={triggerMainImageInput}
          >
            <input type="file" accept="image/*" className="hidden " ref={mainImageInputRef} onChange={(e) => handleMainImageChange(e)} />
            {existingMainImage ? (
              <div className="relative w-full">
                <img src={existingMainImage} alt="Main artwork" className="w-full h-48 object-cover rounded-lg" />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMainImage("Url");
                  }}
                  className={`absolute top-2 right-2 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-12 w-12 mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>{t("Drag and drop image here, or click add image")}</p>
              </>
            )}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Main Artwork")}</label>

          <div
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${
              dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
            } ${!existingInProcessImage ? "min-h-[200px]" : ""}`}
            onClick={triggerInProcessImageInput}
          >
            <input type="file" accept="image/*" className="hidden" ref={inProcessImageInputRef} onChange={(e) => handleInProcessImageUpload(e)} />

            {existingInProcessImage ? (
              <div className="relative w-full">
                <img src={existingInProcessImage} alt="In-Process Image" className="w-full h-48 object-cover rounded-lg" />
                <span
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveInProcessImage("url");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-12 w-12 mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>{t("Drag and drop image here, or click add image")}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
          {t("In Action (Studio/Events Images)")}
        </label>
        <div
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${
            dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
          }`}
          onClick={() => document.getElementById("photo-input")?.click()}
        >
          <input type="file" accept="image/*" className="hidden" id="photos-input" multiple onChange={(e) => handleAdditionalImageUpload(e)} />
          <div className="flex flex-wrap gap-4 w-full">
            {getValues("additionalImage") &&
              getValues("additionalImage").length > 0 &&
              getValues("additionalImage").map((field, i: number) => (
                <div key={i} className="relative w-32 h-32">
                  <img src={URL.createObjectURL(field)} alt={`Additional Image ${i}`} className="w-full h-full object-cover" />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAdditionalImage(i, "File");
                    }}
                    className={`absolute top-1 right-1 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            {existingAdditionalImage &&
              existingAdditionalImage?.length > 0 &&
              existingAdditionalImage?.map((field: string, i: number) => {
                const index = i + (getValues("additionalImage")?.length || 0);
                return (
                  <div key={index} className="relative w-28 h-28">
                    <img src={`${imageUrl}/users/${field}`} alt={`Additional Image ${i}`} className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-1 right-1 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAdditionalImage(i, "Url");
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                );
              })}

            {(typeof getValues("additionalImage")?.length == "undefined" || getValues("additionalImage")?.length == 0) &&
              existingAdditionalImage?.length === 0 && (
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 ${dark ? "text-gray-400" : "text-gray-500"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>{t("Drag and drop image here, or click add image")}</p>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 mt-6 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Main Video")}</label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${
              dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
            } ${!existingMainVideo ? "min-h-[200px]" : ""}`}
            onClick={triggerVideoInput}
          >
            <input type="file" accept="video/*" className="hidden" ref={videoInputRef} onChange={(e) => handleMainVideoChange(e)} />

            {existingMainVideo ? (
              <div className="relative w-full">
                <video src={existingMainVideo} controls className="w-28 h-28 object-cover" />
                <span
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMainVidoe("Url");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-12 w-12 mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>{t("Drag and drop video here, or click add video")}</p>
              </>
            )}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            {t("In Action (Studio/Events Videos)")}
          </label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${
              dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
            } ${existingAdditionalVideo.length === 0 ? "min-h-[200px]" : ""}`}
            onClick={() => document.querySelector("#Videos-input").click()}
          >
            <input type="file" accept="video/*" className="hidden" id="Videos-input" multiple onChange={(e) => handleAdditionalVideoUpload(e)} />
            <div className="flex flex-wrap gap-4 w-full">
              {getValues("additionalVideo") &&
                getValues("additionalVideo").length > 0 &&
                getValues("additionalVideo")?.map((field, i: number) => (
                  <div key={i} className="relative w-32 h-32">
                    <video src={URL.createObjectURL(field)} controls className="w-full h-full object-cover rounded-lg" />
                    <span
                      className={`absolute top-1 right-1 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white`}
                      onClick={() => removeAdditionalVideo(i, "File")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                ))}
              {existingAdditionalVideo &&
                existingAdditionalVideo?.length > 0 &&
                existingAdditionalVideo?.map((field: string, i: number) => {
                  const index = i + (getValues("additionalVideo")?.length || 0);
                  return (
                    <div key={index} className="relative">
                      <video src={`${imageUrl}/videos/${field}`} controls className="w-full h-full object-cover rounded-lg" />
                      <span
                        className={`absolute top-1 right-1 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAdditionalVideo(i, "Url");
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  );
                })}

              {existingAdditionalVideo?.length === 0 && getValues("additionalVideo")?.length === 0 && (
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>{t("Drag and drop video here, or click add video")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedia;
