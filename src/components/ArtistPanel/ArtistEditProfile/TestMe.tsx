import React from "react";

const TestMe = () => {
  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Media")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Profile Photo")}</label>
          <div>
            <input type="file" accept="image/*" className="hidden " ref={mainImageInputRef} onChange={(e) => handleMainImageChange(e)} />
          </div>
          <div className="bg-[#F9F9FC] shadow rounded-md border border-dashed py-4 sm:py-6 px-4 sm:px-12 flex flex-col items-center">
            <div className="relative">
              {existingMainImage ? (
                <img src={existingMainImage} alt="Main Image" className="w-28 h-28 object-cover" />
              ) : (
                <img src={image_icon} className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
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
            {existingMainImage ? null : <p className="text-center text-xs md:text-base">{t("Drag and drop image here, or click to add image")}</p>}
            <span
              className="bg-[#DEDEFA] sm:w-fit w-full text-center font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
              onClick={triggerMainImageInput}
            >
              {t("Add Image")}
            </span>
          </div>
        </div>

        <div>
          <Header variant={{ size: "base", theme: "dark", weight: "semiBold" }} className="mb-2 text-[#203F58]">
            {t("Main Artwork")}
          </Header>
          <input type="file" accept="image/*" className="hidden" ref={inProcessImageInputRef} onChange={(e) => handleInProcessImageUpload(e)} />
          <div className="bg-[#F9F9FC] shadow rounded-md border border-dashed py-4 sm:py-6 px-4 sm:px-12 flex flex-col items-center">
            {existingInProcessImage ? (
              <div className="relative">
                <img src={existingInProcessImage} alt="In-Process Image" className="w-28 h-28 object-cover" />
                <span
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={() => handleRemoveInProcessImage("url")}
                >
                  &times;
                </span>
              </div>
            ) : (
              <img src={image_icon} className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
            )}
            {existingInProcessImage ? null : (
              <p className="text-center text-xs md:text-base">{t("Drag and drop image here, or click to add image")}</p>
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
      <div className="bg-white rounded-md mt-4">
        <Header variant={{ size: "base", theme: "dark", weight: "semiBold" }} className="mb-2 text-[#203F58]">
          {t("In Action (Studio/Events Images)")}
        </Header>
        <input type="file" accept="image/*" className="hidden" id="photos-input" multiple onChange={(e) => handleAdditionalImageUpload(e)} />
        <div className="flex flex-col p-4 shadow rounded-md border border-dashed flex-wrap gap-4 items-center">
          {getValues("additionalImage") &&
            getValues("additionalImage").length > 0 &&
            getValues("additionalImage").map((field, i) => (
              <div key={i} className="relative w-28 h-28">
                <img src={URL.createObjectURL(field)} alt={`Additional Image ${i}`} className="w-full h-full object-cover" />
                <span
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={() => removeAdditionalImage(i, "File")}
                >
                  &times;
                </span>
              </div>
            ))}
          {existingAdditionalImage &&
            existingAdditionalImage?.length > 0 &&
            existingAdditionalImage?.map((field: string, i: number) => (
              <div key={i} className="relative w-28 h-28">
                <img src={`${imageUrl}/users/${field}`} alt={`Additional Image ${i}`} className="w-full h-full object-cover" />
                <span
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={() => removeAdditionalImage(i, "Url")}
                >
                  &times;
                </span>
              </div>
            ))}

          {getValues("additionalImage")?.length === 0 && existingAdditionalImage?.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={image_icon} className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
              <p className="text-center text-xs md:text-base">{t("Click to add additional images")}</p>
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

      <div className="grid lg:grid-cols-1 gap-4">
        <div>
          <Header variant={{ size: "base", theme: "dark", weight: "semiBold" }} className="mt-4 text-[#203F58]">
            {t("Main Video")}
          </Header>
          <input type="file" accept="video/*" className="hidden" ref={videoInputRef} onChange={(e) => handleMainVideoChange(e)} />
          <div className="bg-[#F9F9FC] shadow rounded border border-dashed p-4 flex flex-col items-center">
            <div className="relative">
              {existingMainVideo ? (
                <video src={existingMainVideo} controls className="w-28 h-28 object-cover" />
              ) : (
                <img src={video_icon} className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
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
            {existingMainVideo ? null : <p className="text-center  text-sm md:text-base">{t("Drag and drop video here, or click add video")}</p>}
            <span className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 w-full text-center rounded-md cursor-pointer" onClick={triggerVideoInput}>
              {t("Add Video")}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <Header variant={{ size: "base", weight: "semiBold" }} className="mb-2 text-[#203F58]">
            {t("In Action (Studio/Events Videos)")}
          </Header>
          <input type="file" accept="video/*" className="hidden" id="Videos-input" multiple onChange={(e) => handleAdditionalVideoUpload(e)} />
          <div className="flex flex-col p-4 shadow rounded-md border border-dashed flex-wrap gap-2 items-center">
            {getValues("additionalVideo") &&
              getValues("additionalVideo").length > 0 &&
              getValues("additionalVideo")?.map((field, i: number) => (
                <div key={i} className="relative w-28 h-28">
                  <video src={URL.createObjectURL(field)} controls className="w-full h-full object-cover" />
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => removeAdditionalVideo(i, "File")}
                  >
                    &times;
                  </span>
                </div>
              ))}
            {existingAdditionalVideo &&
              existingAdditionalVideo?.length > 0 &&
              existingAdditionalVideo?.map((field: string, i = getValues("additionalVideo")?.length + 1) => (
                <div key={i} className="relative w-28 h-28">
                  <video src={`${imageUrl}/videos/${field}`} controls className="w-full h-full object-cover" />
                  <span
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    onClick={() => removeAdditionalVideo(i, "Url")}
                  >
                    &times;
                  </span>
                </div>
              ))}

            {existingAdditionalVideo?.length === 0 && getValues("additionalVideo")?.length === 0 ? (
              <div className="flex flex-col items-center">
                <img src={video_icon} className="w-28 h-28 bg-gray-200 rounded-md mb-4" />
                <p className="text-center  text-sm md:text-base">{t("Drag and drop video here, or click add video")}</p>
              </div>
            ) : null}

            <span
              className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 w-full text-center rounded-md cursor-pointer flex items-center justify-center"
              onClick={() => document.querySelector("#Videos-input").click()}
            >
              {t("Add Video")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMe;
