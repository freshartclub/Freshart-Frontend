import React from "react";

const Test = () => {
  return (
    <>
      <div className={`${qrVisible ? "bg-white blur-sm" : ""}`}>
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }} className="text-black ml-3 mt-3">
          {t("Add Artwork")}
        </Header>

        <form onSubmit={onSubmit}>
          {/* <div className="flex flex-col 2xl:flex-row justify-between 2xl:items-center mt-3 2xl:mt-0 mb-4 mx-2"> */}
          {/* <ArtBreadcrumbs /> */}

          <div className="flex flex-col lg:flex-row w-fit gap-4 flex-wrap mt-6 mx-3 mb-2">
            {query ? (
              <h1
                onClick={() => handleGenerateQRCode()}
                className="cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 rounded hover:bg-gray-800"
              >
                {t("Generate QR Code")}
              </h1>
            ) : null}

            <h1 className="cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 rounded hover:bg-gray-800">
              {t("Generate Certificate Of Authenticity")}
            </h1>

            {status === "modified" ? (
              <>
                <span
                  onClick={() => setIsPreviewed(false)}
                  className={`inline-block px-4 py-2 rounded-md cursor-pointer transition duration-300 font-semibold ${
                    !ispreviewed ? "bg-black border border-zinc-500 text-white" : " text-black border border-zinc-500 "
                  }`}
                >
                  Old Version
                </span>
                <span
                  onClick={() => setIsPreviewed(true)}
                  className={`inline-block px-4 py-2 rounded-md cursor-pointer transition duration-300 font-semibold ${
                    ispreviewed ? "bg-black border border-zinc-500 text-white" : " text-black  border border-zinc-500"
                  }`}
                >
                  Modified Version
                </span>
              </>
            ) : null}
          </div>
          {/* </div> */}

          <div className="grid xl:grid-cols-4 gap-4 mx-3">
            <div className="xl:col-span-3 rounded-md">
              <div className="bg-white p-4 rounded-md shadow-md border">
                <Header
                  variant={{
                    size: "base",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="text-[18px] text-black font-semibold mb-4"
                >
                  {t("General Information")}
                </Header>

                <div className="mb-4">
                  <label className="block  text-sm text-[#203F58] font-semibold mb-2">{t("Artwork Name")} *</label>
                  <input
                    {...register("artworkName", {
                      required: t("Artwork Name is required"),
                    })}
                    type="text"
                    id="artworkName"
                    readOnly={query ? true : false}
                    placeholder={t("Enter Artwork Name")}
                    className="w-full bg-[#F9F9FC] border text-sm border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                  />
                  {errors.artworkName ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.artworkName.message}`)}</div> : null}
                </div>

                {isArtProvider === "Yes" ? (
                  <div className="invisible h-0">
                    <label className="block text-sm text-[#203F58] font-semibold mb-2">{t("Art Provider")}</label>
                    <select
                      {...register("isArtProvider")}
                      id="isArtProvider"
                      name="isArtProvider"
                      disabled={query ? true : false}
                      value={isArtProviderField}
                      onChange={(e) => setIsArtProviderField(e.target.value)}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                    >
                      <option value="Yes">{t("Yes")}</option>
                    </select>
                  </div>
                ) : null}

                {isArtProvider === "Yes" ? (
                  <div className="mb-4">
                    <label className="block text-sm text-[#203F58] font-semibold mb-2">{t("Artist Name")}</label>
                    <input
                      type="text"
                      {...register("provideArtistName")}
                      name="provideArtistName"
                      id="provideArtistName"
                      readOnly={query ? true : false}
                      placeholder={t("Type artist name here (if different from artist)...")}
                      className="w-full bg-[#F9F9FC] text-sm border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                  </div>
                ) : null}

                <div className="mb-4 flex flex-col lg:flex-row gap-2 w-full">
                  <div className={`w-full ${query ? "pointer-events-none" : ""}`}>
                    <label className="block text-sm text-[#203F58] font-semibold mb-2">{t("Artwork Creation Year")} *</label>

                    <Controller
                      name="artworkCreationYear"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomYearPicker {...field} selectedYear={field.value} toggleCalendar={toggleCalendar} showCalendar={showCalendar} />
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm text-[#203F58] font-semibold">{t("Select Series")}</label>
                      <p className="text-[#5C59E8] text-sm flex items-center gap-[2px] cursor-pointer">
                        {query ? null : (
                          <span onClick={() => setIsPopupOpen(true)}>
                            <TiPlus size="1.2em" />
                          </span>
                        )}
                      </p>
                    </div>

                    <SeriesPop isOpen={isPopupOpen} onClose={closePopup} />

                    <div className="relative w-full">
                      <div className="flex flex-col mb-1">
                        <input
                          {...register("artworkSeries")}
                          value={getValues("artworkSeries")}
                          type="text"
                          readOnly={query ? true : false}
                          className="w-full bg-[#F9F9FC] border cursor-pointer  border-gray-300 rounded-md  p-1 sm:p-3 outline-none text-sm"
                          onClick={handleDropDown}
                          autoComplete="off"
                          placeholder={t("Select Series")}
                        />
                      </div>

                      {isDropdownOpen && !query && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                          <ul className="max-h-60 overflow-y-auto flex flex-col gap-2 p-2">
                            {seriesOptions
                              ? seriesOptions.map((option) => (
                                  <div className="flex justify-between">
                                    <li
                                      key={option.value}
                                      onClick={() => {
                                        handleDropDown();
                                        handleSelectOption(option);
                                      }}
                                      className={`flex justify-between w-full items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100 `}
                                    >
                                      <span className="cursor-pointer w-full">{option}</span>
                                    </li>
                                    <span
                                      onClick={() => handleRemoveSeries(option)}
                                      className="cursor-pointer bg-black   px-2 py-2 rounded-md text-white"
                                    >
                                      <MdDelete size="1em" />
                                    </span>
                                  </div>
                                ))
                              : null}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <>
                  <label className="block text-sm mb-2 font-semibold text-[#203F58]">{t("Artwork Description")} *</label>
                  <textarea
                    {...register("productDescription")}
                    rows={6}
                    name="productDescription"
                    placeholder={t("Type product description here...")}
                    readOnly={query ? true : false}
                    className="w-full text-sm bg-[#F9F9FC] border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                  />
                </>
              </div>

              <div className=" bg-white p-4 rounded-md mt-6 border shadow-md">
                <Header
                  variant={{
                    size: "md",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="text-[18px] text-black font-semibold mb-4"
                >
                  {t("Media")}
                </Header>

                <div className="bg-white rounded-md mt-3">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Main Photo")} *
                      </Header>
                      <input
                        type="file"
                        accept="image/*"
                        id="main-photo-input"
                        onChange={(e) => handleFileChange(e, setMainImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC] border border-dashed py-2 px-2 flex flex-col items-center">
                        {mainImage ? (
                          <div className="relative">
                            <img src={mainImage} alt="image" className="w-28 h-28 object-cover" />
                            <span
                              className={`absolute top-1 right-1 bg-red-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                query ? "pointer-events-none opacity-50" : ""
                              }`}
                              onClick={() => removeImage("mainImage", 0)}
                            >
                              &times;
                            </span>
                          </div>
                        ) : (
                          <>
                            <img src={image_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                            <P
                              variant={{
                                size: "small",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {t("Drag and drop image here, or click add image")}
                            </P>
                          </>
                        )}
                        <span
                          onClick={() => document.querySelector("#main-photo-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 w-full text-center px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Image")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Back Photo")}
                      </Header>
                      <input
                        type="file"
                        accept="image/*"
                        id="back-photo-input"
                        onChange={(e) => handleFileChangeBackImage(e, setBackImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC]  border border-dashed py-2 px-2 flex flex-col items-center">
                        {backImage ? (
                          <div className="relative">
                            <img src={backImage} alt="image" className="w-28 h-28 object-cover" />
                            <span
                              className={`absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                query ? "pointer-events-none opacity-50" : ""
                              }`}
                              onClick={() => removeImage("backImage", 0)}
                            >
                              &times;
                            </span>
                          </div>
                        ) : (
                          <>
                            <img src={image_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                            <P
                              variant={{
                                size: "small",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {t("Drag and drop image here, or click add image")}
                            </P>
                          </>
                        )}

                        <span
                          onClick={() => document.querySelector("#back-photo-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 w-full text-center px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Image")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Inprocess Photo")}
                      </Header>
                      <input
                        type="file"
                        accept="image/*"
                        id="inprocess-photo-input"
                        onChange={(e) => handleFileChangeInprocessImage(e, setInProcessImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC]  border border-dashed py-2 px-2 flex flex-col items-center">
                        {inProcessImage ? (
                          <div className="relative">
                            <img src={inProcessImage} alt="image" className="w-28 h-28 object-cover" />
                            <span
                              className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                              onClick={() => removeImage("inProcessImage", 0)}
                            >
                              &times;
                            </span>
                          </div>
                        ) : (
                          <>
                            <img src={image_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                            <P
                              variant={{
                                size: "small",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {t("Drag and drop image here, or click add image")}
                            </P>
                          </>
                        )}

                        <span
                          onClick={() => document.querySelector("#inprocess-photo-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 w-full text-center rounded-md cursor-pointer"
                        >
                          {t("Add Image")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* details photos */}
                  <div className="grid mt-4 gap-4">
                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Details Photos (max 3 images)")}
                      </Header>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        id="details-photo-input"
                        name="images"
                        onChange={(e) => handleFileChangeDetailsImage(e, setImages)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC]  border border-dashed p-2 sm:py-6 sm:px-12 flex flex-col items-center">
                        <div className="flex gap-2 flex-wrap">
                          {images &&
                            images.length > 0 &&
                            images.map((img, i) => {
                              return (
                                <div key={i} className="relative">
                                  <img src={URL.createObjectURL(img)} alt="image" className="w-28 h-28 object-cover" />
                                  <span
                                    className="absolute top-1 right-1 bg-red-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center "
                                    onClick={() => removeImage("images", i, "File")} // Remove image by index
                                  >
                                    &times;
                                  </span>
                                </div>
                              );
                            })}
                          {getValues("existingImage") &&
                            getValues("existingImage").length > 0 &&
                            getValues("existingImage")?.map((img, i: number) => {
                              return (
                                <div key={i} className="relative">
                                  <img src={`${imageUrl}/users/${img}`} alt="image" className="w-28 h-28 object-cover" />
                                  <span
                                    className={`absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                      query ? "pointer-events-none opacity-50" : ""
                                    }`}
                                    onClick={() => removeExistingImage(i, "Url")}
                                  >
                                    &times;
                                  </span>
                                </div>
                              );
                            })}
                          {(typeof getValues("existingImage")?.length == "undefined" || getValues("existingImage")?.length == 0) &&
                          images?.length == 0 ? (
                            <div className="flex flex-col items-center">
                              <img src={image_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                              <P
                                variant={{
                                  size: "small",
                                  theme: "dark",
                                  weight: "normal",
                                }}
                                className="text-center"
                              >
                                {t("Drag and drop image here, or click add image")}
                              </P>
                            </div>
                          ) : null}
                        </div>
                        <span
                          onClick={() => document.querySelector("#details-photo-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 sm:w-fit w-full text-center p-3 px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Images")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 mt-4 gap-4">
                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Main Video")}
                      </Header>
                      <input
                        type="file"
                        accept="video/*"
                        id="main-video-input"
                        onChange={(e) => handleMainVideo(e, setMainVideo)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC]  border border-dashed p-2 flex flex-col items-center">
                        {mainVideo ? (
                          <div className="relative">
                            <video src={mainVideo} className="w-28 max-h-32 object-cover mb-4" controls />
                            <span
                              className={`absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                query ? "pointer-events-none opacity-50" : ""
                              }`}
                              onClick={() => removeImage("mainvideo", 0)}
                            >
                              &times;
                            </span>
                          </div>
                        ) : (
                          <>
                            <img src={video_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                            <P
                              variant={{
                                size: "small",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {t("Drag and drop video here, or click add video")}
                            </P>
                          </>
                        )}
                        <span
                          onClick={() => document.querySelector("#main-video-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 w-full text-center p-3 px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Video")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="mb-2 text-[#203F58]"
                      >
                        {t("Other Video")}
                      </Header>
                      <input
                        type="file"
                        id="other-video-input"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleOtherVideo(e, setOtherVideos)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="bg-[#F9F9FC]  border border-dashed p-2 flex flex-col items-center">
                        {otherVideo &&
                          otherVideo.length > 0 &&
                          otherVideo.map((video, i) => (
                            <div key={i} className="relative">
                              <video
                                src={URL.createObjectURL(video)} // Use the URL for the video preview
                                className="w-28 max-h-28 object-cover mb-4"
                                controls
                              />
                              <span
                                className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => removeVideo(i, "File")} // Custom function to remove video from state
                              >
                                &times;
                              </span>
                            </div>
                          ))}

                        {exVidoes &&
                          exVidoes.length > 0 &&
                          exVidoes.map((video, i = otherVideo.length + 1) => (
                            <div key={i} className="relative">
                              <video
                                src={`${imageUrl}/videos/${video}`} // Use the URL for the video preview
                                className="w-28 max-h-28 object-cover mb-4"
                                controls
                              />
                              <span
                                className={`absolute top-1 right-1 bg-red-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                  query ? "pointer-events-none opacity-50" : ""
                                }`}
                                onClick={() => removeExistingVideo(i, "Url")}
                              >
                                &times;
                              </span>
                            </div>
                          ))}

                        {(typeof exVidoes?.length == "undefined" || exVidoes?.length == 0) && otherVideo?.length == 0 && (
                          <>
                            <img src={video_icon} alt="icon" className="w-28 max-h-28 min-h-28 object-cover mb-4" />
                            <P
                              variant={{
                                size: "small",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {t("Drag and drop video here, or click add video")}
                            </P>
                          </>
                        )}
                        <span
                          onClick={() => document.querySelector("#other-video-input").click()}
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 w-full text-center px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Videos")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mt-6 border border-[#E0E2E7] shadow-md ">
                <Header
                  variant={{
                    size: "md",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="mb-4"
                >
                  {t("Descriptive Information And Categorization")}
                </Header>

                <Dicipline
                  query={query}
                  setArtDicipline={setArtDicipline}
                  artDicipline={artDicipline}
                  control={control}
                  errors={errors}
                  getOutDiscipline={getOutDiscipline}
                  setValue={setValue}
                />

                <div className="grid md:grid-cols-2 gap-3 mb-4 mt-3">
                  <div>
                    <label className="block text-sm text-[#203F58] font-semibold mb-2">{t("Artwork Technic")} *</label>
                    <select
                      {...register("artworkTechnic", {
                        required: "Artwork Technic is required",
                      })}
                      id="artworkTechnic"
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full  p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select Type")}</option>
                      {technicLoading ? null : newTechnic && Array.isArray(newTechnic) && newTechnic.length > 0 ? (
                        newTechnic.map((item, i) => (
                          <option value={item.technicName} key={i}>
                            {t(item.technicName)}
                          </option>
                        ))
                      ) : (
                        <option disabled>{t("No Technics Available")}</option>
                      )}
                    </select>
                    {errors.artworkTechnic ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.artworkTechnic.message}`)}</div> : null}
                  </div>

                  <div className="text-[#203F58] text-sm">
                    <label className="text-[#203F58] text-sm font-semibold">{t("Artwork Theme")} *</label>
                    <select
                      id="artworkTheme"
                      {...register("artworkTheme", {
                        required: "Artwork Theme is required",
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select Type")}</option>
                      {themeLoading ? null : newTheme && Array.isArray(newTheme) && newTheme.length > 0 ? (
                        newTheme.map((item, i: number) => (
                          <option value={item.themeName} key={i}>
                            {t(item.themeName)}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {t("No Themes Available")}
                        </option>
                      )}
                    </select>
                    {errors.artworkTheme ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.artworkTheme.message}`)}</div> : null}
                  </div>
                </div>

                <div className="mt-5">
                  <Select
                    options={newArtworkStyle?.map((item) => ({
                      value: item,
                      label: t(item),
                    }))}
                    placeholder={t("Select Artwork Style") + " *"}
                    isMulti
                    className="text-sm"
                    isDisabled={query ? true : false}
                    value={getValues("artworkStyleType")}
                    {...register("artworkStyleType", {
                      required: "Artwork Style is required",
                    })}
                    onChange={(selectedOptions) => setValue("artworkStyleType", selectedOptions)}
                    styles={{
                      dropdownIndicator: () => ({
                        color: "black",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),

                      multiValueRemove: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),
                    }}
                  />
                  {errors.artworkStyleType ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.artworkStyleType.message}`)}</div> : null}
                </div>

                <div className="mt-3 mb-2">
                  <Select
                    options={emotions ? emotions : []}
                    placeholder={`${t("Select Emotions")} *`}
                    isMulti
                    className="text-sm"
                    isDisabled={query ? true : false}
                    {...register("emotions", {
                      required: "Emotions are required",
                    })}
                    value={getValues("emotions")}
                    onChange={(selectedOptions) => setValue("emotions", selectedOptions)}
                    styles={{
                      dropdownIndicator: () => ({
                        color: "black",
                      }),

                      multiValueLabel: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),

                      multiValueRemove: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),
                    }}
                  />
                  {errors.emotions ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.emotions.message}`)}</div> : null}
                </div>

                <div className="mb-3">
                  <Select
                    options={colors ? colors : []}
                    className="text-sm"
                    placeholder={`${t("Select Color")} *`}
                    {...register("colors", {
                      required: t("Colors are required"),
                    })}
                    isDisabled={query ? true : false}
                    value={getValues("colors")}
                    onChange={(selectedOption) => {
                      const selectedValues = Array.isArray(selectedOption) ? selectedOption : selectedOption ? [selectedOption] : [];

                      setValue("colors", selectedValues);
                    }}
                    isMulti={true}
                    styles={{
                      dropdownIndicator: () => ({
                        color: "black",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        backgroundColor: "#203F58",
                        color: "white",
                      }),
                    }}
                  />
                  {errors.colors ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.colors.message}`)}</div> : null}
                </div>

                <label className="text-[#203F58] text-sm font-semibold  ">
                  {t("Offensive")}
                  <select
                    id="offensive"
                    {...register("offensive", {
                      required: t("Offensive is required"),
                    })}
                    disabled={query ? true : false}
                    className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                  >
                    <option value="No">{t("No")}</option>
                    <option value="Yes">{t("Yes")} </option>
                  </select>
                </label>

                <label className="text-[#203F58] text-sm font-semibold ">
                  {t("Tags External")}
                  <div className="flex flex-wrap gap-2 mt-1">
                    <input
                      type="text"
                      id="extTags"
                      name="extTags"
                      readOnly={query ? true : false}
                      className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      placeholder={t("Enter tags (e.g., #example)")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddExternalTag(e);
                        }
                      }}
                    />
                  </div>
                  {externalTags && externalTags.length > 0 ? (
                    <div className="mt-2 mb-3">
                      {externalTags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 border border-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 w-fit">
                          {tag}
                          <span onClick={() => handleRemoveExternalTag(index)} className="ml-2 cursor-pointer text-black">
                            X
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </label>

                <div className=" md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[#203F58] text-sm font-semibold">{t("Material")} *</label>
                    <select
                      id="Material"
                      {...register("material", {
                        required: "Material is required",
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                    >
                      <option value="">{t("Select Type")}</option>
                      {getMaterial &&
                        getMaterial?.map((item, index: number) => (
                          <option key={index} value={item?.value}>
                            {t(item?.label)}
                          </option>
                        ))}
                    </select>
                    {errors.material ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.material.message}`)}</div> : null}
                  </div>
                </div>

                <div className="flex justify-between flex-col md:flex-row mb-3 gap-3">
                  {artwork_orientation?.map((field) => (
                    <span key={field.name} className="w-full">
                      <label className="p-1 text-[14px] text-sm text-[#203F58] font-semibold">{t(field.label)} *</label>
                      <input
                        type="text"
                        {...register(field.name, {
                          required: t(`${field.label} is required`) ? field.name : "",
                        })}
                        name={field.name}
                        id={field.name}
                        placeholder={t(field.placeholder)}
                        readOnly={query ? true : false}
                        className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      />

                      {errors[field.name] ? (
                        <div className="error text-red-500 mt-1 text-sm">{t(`${errors[field.name].message} is required`)}</div>
                      ) : null}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="text-[#203F58] text-sm font-semibold">{t("Hanging Available")}</label>
                    <select
                      id="hangingAvailable"
                      {...register("hangingAvailable", {
                        required: "Hanging available is required",
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select")}</option>
                      <option value="Yes">{t("Yes")}</option>
                      <option value="No">{t("No")}</option>
                    </select>
                    {errors.hangingAvailable ? (
                      <div className="error text-red-500 mt-1 text-sm">{t(`${errors.hangingAvailable.message}`)}</div>
                    ) : null}
                  </div>

                  {getValues("hangingAvailable") === "Yes" ? (
                    <label className="text-[#203F58] text-sm font-semibold">
                      {t("Hanging Description")}
                      <textarea
                        id="hangingDescription"
                        {...register("hangingDescription", {
                          required: t("Hanging Description is required"),
                        })}
                        readOnly={query ? true : false}
                        placeholder={t("Type Hanging description here...")}
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none font-normal text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
                      />
                    </label>
                  ) : null}

                  <div>
                    <label className="text-[#203F58] text-sm font-semibold">{t("Framed")} *</label>
                    <select
                      id="Farmed"
                      {...register("framed", {
                        required: t("Framed is required"),
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select")}</option>
                      <option value="Yes">{t("Yes")}</option>
                      <option value="No">{t("No")}</option>
                    </select>
                    {errors.framed ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.framed.message}`)}</div> : null}
                  </div>

                  {getValues("framed") === "Yes" ? (
                    <>
                      <label className="text-[#203F58] text-sm font-semibold">
                        {t("Frame Description")} *
                        <textarea
                          id="framedDescription"
                          {...register("framedDescription", {
                            required: "Frame Description is required",
                          })}
                          placeholder={t("Type Framed description here...")}
                          readOnly={query ? true : false}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full font-normal p-1 sm:p-2.5 pb-10"
                        />
                        {errors?.framedDescription && (
                          <div className="error text-red-500 mt-1 text-sm">{t(`${errors.framedDescription.message}`)}</div>
                        )}
                      </label>

                      <div className="grid grid-cols-3 mb-4 gap-3 ">
                        {Framed_dimension?.map((field) => (
                          <span key={field.name}>
                            <label className="p-1 text-[14px] text-sm text-[#203F58] font-semibold">{t(field.label)} *</label>
                            <input
                              {...register(field.name, {
                                required: t(`${field.label} is required`),
                              })}
                              type="text"
                              name={field.name}
                              id={field.name}
                              readOnly={query ? true : false}
                              placeholder={t(field.placeholder)}
                              className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                            />

                            {errors?.[field.name] && <div className="error text-red-500 mt-1 text-sm">{t(`${errors?.[field.name]?.message}`)}</div>}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}

                  <div>
                    <label className="text-[#203F58] text-sm font-semibold">{t("Exclusive")} *</label>
                    <select
                      id="Exclusive"
                      {...register("exclusive", {
                        required: t("Exclusive is required"),
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select")}</option>
                      <option value="Yes">{t("Yes")}</option>
                      <option value="No">{t("No")}</option>
                    </select>
                    {errors.exclusive ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.exclusive.message}`)}</div> : null}
                  </div>

                  <div>
                    <label className="text-[#203F58] text-sm font-semibold">{t("Artwork Orientation")} *</label>
                    <select
                      id="artworkOrientation"
                      {...register("artworkOrientation", {
                        required: "Artwork Orientation is required",
                      })}
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">{t("Select Type")}</option>
                      {/* <option value="Square">{t("Square")} </option>
                        <option value="Rectangle">{t("Rectangle")}</option>
                        <option value="Circle">{t("Circle")}</option>
                        <option value="Star">{t("Star")}</option> */}
                      {orientation && orientation?.length > 0
                        ? orientation?.map((item: any, i: number) => (
                            <option value={item?.value} key={i}>
                              {t(item?.value)}
                            </option>
                          ))
                        : null}
                    </select>
                    {errors.artworkOrientation ? (
                      <div className="error text-red-500 mt-1 text-sm">{t(`${errors.artworkOrientation.message}`)}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mt-6 border border-[#E0E2E7] shadow-md ">
                <Header
                  variant={{
                    size: "md",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="mb-4"
                >
                  {t("Commercialization")} *
                </Header>

                <div className={`flex border-b  border-gray-300 ${query ? "pointer-events-none" : ""}`}>
                  <span
                    onClick={() => {
                      setValue("purchaseCatalog", "");
                      setValue("purchaseType", "");
                      setCatalogPrice(null);
                      setActiveTab("subscription");
                      setCatalogPrice(0);
                      setPackageWeightError(null);
                      setPackageDepthError(null);
                      setPackageWidthError(null);
                      setPackageHeightError(null);
                      setBasePriceError(null);
                    }}
                    className={`py-2 font-semibold cursor-pointer ${activeTab === "subscription" ? "border-b-4 border-black" : "text-gray-500"}`}
                  >
                    {t("Subscription")}
                  </span>
                  <span
                    onClick={() => {
                      setActiveTab("purchase");
                      setPurchaseCatlogValue(null);
                      setValue("subscriptionCatalog", "");
                      setValue("purchaseOption", "");
                      setCatalogPrice(0);
                      setPackageWeightError(null);
                      setPackageDepthError(null);
                      setPackageWidthError(null);
                      setPackageHeightError(null);
                      setBasePriceError(null);
                    }}
                    className={`py-2 mx-8 font-semibold cursor-pointer ${activeTab === "purchase" ? "border-b-4 border-black" : "text-gray-500"}`}
                  >
                    {t("Purchase")}
                  </span>
                </div>

                <div className="">
                  {activeTab === "subscription" && (
                    <>
                      <div className="mt-4 space-y-2">
                        <label className="text-[#203F58] text-sm font-semibold ">
                          {t("Subscription Catalog")}
                          <select
                            id="subscriptionCatalog"
                            {...register("subscriptionCatalog")}
                            onChange={(val) => {
                              handleCheckArtistFee(val);
                              setValue("purchaseOption", "");
                              setsubscriptionCatlogValue(val.target.value);
                            }}
                            disabled={query ? true : false}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option value="">{t("Select")}</option>

                            {seriesData?.subscriptionCatalog?.map((series, index: number) => (
                              <option key={index} label={series?.catalogName} value={series?._id || subscriptionCatlogValue}>
                                {t(series?.catalogName)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="mt-4 space-y-2">
                        <label className="text-[#203F58] text-sm font-semibold ">
                          {t("Purchase Option")}
                          <select
                            {...register("purchaseOption")}
                            id="purchaseOption"
                            disabled={query ? true : false}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option value="">{t("Select")}</option>
                            <option value="Yes">{t("Yes")}</option>
                            <option value="No">{t("No")}</option>
                          </select>
                        </label>
                      </div>
                    </>
                  )}
                </div>

                <div className="py-4">
                  {activeTab === "purchase" && (
                    <div>
                      <div className="space-y-2">
                        <label className="text-[#203F58] text-sm font-semibold ">
                          {t("Purchase Catalog")}
                          <select
                            id="purchaseCatalog"
                            {...register("purchaseCatalog")}
                            onChange={(val) => {
                              handleCheckArtistFee(val);
                              setPurchaseCatlogValue(val.target.value);
                              setsubscriptionCatlogValue("");
                              setValue("purchaseType", "");
                            }}
                            disabled={query ? true : false}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          >
                            <option value="">{t("Select")}</option>
                            {seriesData?.purchaseCatalog?.map((item, index) => (
                              <option value={item?._id || purchaseCatlogValue} label={t(item?.catalogName)} key={index}>
                                {t(item?.catalogName)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="mt-4">
                        <label className="text-[#203F58] text-sm font-semibold ">
                          {t("Purchase Type")}
                          <select
                            id="purchaseType"
                            {...register("purchaseType")}
                            value={getValues("purchaseType") || ""}
                            disabled={query ? true : false}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          >
                            <option value="">{t("Select")}</option>
                            {purOption
                              ? purOption.map((item, i) => (
                                  <option value={item?.value} key={i}>
                                    {t(item?.value)}
                                  </option>
                                ))
                              : []}
                          </select>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7]">
                <Header
                  variant={{
                    size: "md",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="mb-4"
                >
                  {t("Pricing")}
                </Header>

                <div className={`${activeTab === "subscription"} ? "flex justify-between" : ""`}>
                  <label className="text-[#203F58] text-sm font-semibold ">
                    {t("Currency")}
                    <select
                      {...register("currency")}
                      id="currency"
                      disabled={query ? true : false}
                      className="bg-[#F9F9FC] mb-3 mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                    >
                      {currency?.map((item: any, i: number) => (
                        <option key={i} value={item?.value}>
                          {t(item?.value)}
                        </option>
                      ))}
                    </select>
                  </label>

                  {activeTab === "subscription" && watch("subscriptionCatalog") ? (
                    <div className="flex items-center border border-zinc-500 w-full py-3 px-4 bg-yellow-100 text-yellow-800">
                      {/* Warning Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                      </svg>

                      <span>
                        {t("Price must be less than or equal to the specified amount")}. {basePriceError}
                      </span>
                    </div>
                  ) : null}

                  {activeTab === "subscription" ? (
                    <label className="text-[#203F58] text-sm font-semibold">
                      {t("Base Price")}
                      <input
                        {...register("basePrice", {
                          required: "Base Price is Required",
                        })}
                        id="basePrice"
                        placeholder={t("Enter Base Price")}
                        disabled={query ? true : false}
                        className="bg-[#F9F9FC] mb-3 mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      />
                      {activeTab === "subscription" && errors.basePrice ? (
                        <div className="error text-red-500 mt-1 text-sm">{t(`${errors.basePrice.message}`)}</div>
                      ) : null}
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {watch("purchaseType") === "Downward Offer" ||
                watch("purchaseType") === "Fixed Price" ||
                watch("purchaseType") === "Price By Request" ||
                watch("purchaseType") === "Upward Offer" ? (
                  <>
                    {activeTab === "purchase" || watch("purchaseCatalog") ? (
                      <div className="flex items-center border border-zinc-500 w-full py-3 px-4 bg-yellow-100 text-yellow-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                          />
                        </svg>
                        <span>
                          {t("Price must be less than or equal to the specified amount")} {basePriceError}
                        </span>
                      </div>
                    ) : null}

                    <span>
                      <label className="text-[#203F58] text-sm font-semibold">{t("Base Price")}</label>

                      <div className="flex flex-col space-x-2">
                        <input
                          {...register("basePrice", {
                            required: t("Base Price is Required"),
                          })}
                          type="text"
                          name="basePrice"
                          id="basePrice"
                          placeholder={t("Type base price here...")}
                          readOnly={query ? true : false}
                          className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />

                        {activeTab === "purchase" && errors.basePrice ? (
                          <div className="error text-red-500 mt-1 text-sm">{t(`${errors.basePrice.message}`)}</div>
                        ) : null}
                      </div>

                      <div
                        className={`${
                          getValues("purchaseType") === "Downword Offer" ? "grid md:grid-cols-2 gap-3" : "w-full"
                        } grid md:grid-cols-2 gap-3`}
                      >
                        <label className="text-[#203F58] text-sm font-semibold">
                          {t("Discount Percentage")}
                          <input
                            {...register("dpersentage")}
                            type="text"
                            name="dpersentage"
                            id="dpersentage"
                            placeholder="0.0 %"
                            readOnly={query ? true : false}
                            className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </label>

                        {watch("purchaseType") === "Downward Offer" || watch("purchaseType") === "Upward Offer" ? (
                          <label className="text-[#203F58] text-sm font-semibold">
                            {t("Accept Offer Minimum Price")}
                            <input
                              {...register("acceptOfferPrice")}
                              type="text"
                              id="acceptOfferPrice"
                              placeholder={t("Accept Offer Minimum Price")}
                              readOnly={query ? true : false}
                              className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                            />
                          </label>
                        ) : null}
                      </div>
                    </span>
                  </>
                ) : null}

                <div className="grid md:grid-cols-2 gap-3">
                  <label className="text-[#203F58] text-sm font-semibold">
                    {t("Artist Base Fees")}
                    <div className="flex space-x-2">
                      <input
                        id="artistFees"
                        name="artistFees"
                        value={catalogPrice}
                        placeholder={t("Enter Artist Base Fees")}
                        readOnly={true}
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      />
                    </div>
                  </label>

                  <label className="text-[#203F58] text-sm font-semibold">
                    {t("VAT Amount (%)")}
                    <input
                      type="text"
                      id="vatAmount"
                      {...register("vatAmount")}
                      placeholder={t("Enter VAT amount")}
                      value={vatAmount}
                      readOnly={true}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white p-4  rounded-md mt-4 border border-[#E0E2E7] shadow-md">
                <Header
                  variant={{
                    size: "lg",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="mb-2"
                >
                  {t("Inventory & Shipping")}
                </Header>

                <div className="grid md:grid-cols-2 gap-3 items-center">
                  {shipping_inventry.map((shipping) => (
                    <span key={shipping.name}>
                      <label className="p-1 text-[#203F58] text-[14px] text-sm font-semibold">{t(shipping.label)}</label>
                      <input
                        type="text"
                        {...register(shipping.name)}
                        name={shipping.name}
                        id={shipping.name}
                        placeholder={t(shipping.placeholder)}
                        readOnly={query ? true : false}
                        className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      />
                    </span>
                  ))}

                  <span>
                    <label className="p-1 text-[#203F58] text-[14px] text-sm font-semibold">{t("Location")}</label>
                    <input
                      type="text"
                      id="location"
                      placeholder={t("Enter Your Location")}
                      {...register("location")}
                      readOnly={query ? true : false}
                      className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                    />
                  </span>
                </div>

                <div>
                  <label className="text-[#203F58] text-sm font-semibold">{t("Package Material")} *</label>
                  <select
                    id="packageMaterial"
                    {...register("packageMaterial", {
                      required: "Package Material is required",
                    })}
                    disabled={query ? true : false}
                    className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                  >
                    <option value="">{t("Select")}</option>
                    {packMaterial?.map((item, i: number) => (
                      <option value={item.value} key={i}>
                        {t(item.value)}
                      </option>
                    ))}
                  </select>
                  {errors.packageMaterial ? <div className="error text-red-500 mt-1 text-sm">{t(`${errors.packageMaterial.message}`)}</div> : null}
                </div>

                <div className="flex items-center border border-zinc-500 w-full py-3 px-4 mb-3 bg-yellow-100 text-yellow-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                  </svg>

                  <span>
                    {t("Max Dimensions should not be greater than the Dimensions in selected Catalog.")}
                    <ul className="list-disc ml-5 mt-2">
                      <li>
                        {t("Max Height")} : {packageHeightError}
                      </li>
                      <li>
                        {t("Max Width")} : {packageWidthError}
                      </li>
                      <li>
                        {t("Max Depth")} : {packageDepthError}
                      </li>
                      <li>
                        {t("Max Weight")} :{packageWeightError}
                      </li>
                    </ul>
                  </span>
                </div>

                <div className="flex items-center flex-col md:flex-row md:gap-2 justify-between">
                  {package_dimension.map((field) => (
                    <span key={field.name} className="w-full">
                      <label className="p-1 text-[14px] text-sm text-[#203F58] font-semibold">{t(field.label)} *</label>
                      <input
                        type="text"
                        {...register(field.name, {
                          required: `${field.label} is required`,
                        })}
                        id={field.name}
                        readOnly={query ? true : false}
                        placeholder={t(`Enter ${field.placeholder}`)}
                        className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      />

                      {errors[field.name] ? <div className="error text-red-500 mt-1 text-sm">{t(`${field.placeholder} is required`)}</div> : null}
                    </span>
                  ))}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => setIsComingSoon((prev) => !prev)}
                    checked={isComingSoon == true}
                    id="comingSoon"
                    className="mr-2"
                  />
                  <span className="p-1 text-[14px] text-[#203F58] font-semibold">{t("Coming Soon")}</span>
                </div>
              </div>
            </div>

            <ArtworkRight
              query={query}
              control={control}
              discountAcceptation={discountAcceptation}
              availableTo={availableTo}
              getValue={getValues}
              setValue={setValue}
            />
          </div>

          <div className="my-5 px-2 gap-2 flex flex-col sm:flex-row items-center lg:fixed md:-bottom-3 right-5 justify-end w-full">
            {!query ? (
              <>
                <span
                  onClick={() => handleNavigate()}
                  className="border bg-red-500 sm:w-fit w-full text-center text-white hover:border-red-600 hover:bg-white hover:text-red-500 rounded px-4 py-3 text-sm font-semibold cursor-pointer"
                >
                  ✕ {t("Cancel")}
                </span>

                {status === "published" ? (
                  <Button
                    type="submit"
                    variant={{
                      fontSize: "sm",
                      thickness: "thick",
                      fontWeight: "600",
                      theme: "dark",
                    }}
                    className={`text-white sm:w-fit w-full text-center px-4 py-3 hover:bg-white hover:border hover:border-[#102031] hover:text-[#102031]  rounded ${
                      modifyIsPending ? "opacity-70 pointer-events-none" : ""
                    }`}
                  >
                    {modifyIsPending ? t("Modifying...") : t("Modify Artwork")}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant={{
                      fontSize: "sm",
                      thickness: "thick",
                      fontWeight: "600",
                      theme: "dark",
                    }}
                    className={`text-white sm:w-fit w-full text-center ${
                      status === "modified" && ispreviewed === false ? "opacity-70 pointer-events-none" : ""
                    } hover:bg-white hover:border hover:border-[#102031] hover:text-[#102031] px-4 py-3 rounded ${
                      isPending ? "opacity-70 pointer-events-none" : ""
                    }`}
                  >
                    {isPending ? t("Previewing...") : t("Save & Preview")}
                  </Button>
                )}
              </>
            ) : null}
          </div>
        </form>
      </div>

      {qrVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[100]">
          <div className="relative bg-white w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto max-h-[80vh] p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <h1 className="font-bold text-xl text-center mt-2 text-gray-800">{t("QR Code")}</h1>
            <img src={logoIcon} alt="Logo" className="object-contain w-24 h-12 mt-3" />

            <span
              onClick={() => {
                setQrVisible(false);
                setCopySuccess("");
                setErrorMessage("");
              }}
              className="absolute right-5 top-5 cursor-pointer text-gray-500 hover:text-gray-700 transition"
            >
              <BsBackspace size="1.8em" />
            </span>

            <div
              ref={qrCodeRef}
              className="flex justify-center items-center bg-gray-100 p-4 rounded-lg mt-4"
              style={{ maxWidth: 200, width: "100%" }}
            >
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={currentPageUrl} viewBox="0 0 256 256" />
            </div>

            <input
              type="text"
              value={url}
              id="linkInput"
              readOnly
              className="w-[80%] sm:w-[70%] p-3 text-lg border border-gray-300 rounded-md mt-5 text-center bg-gray-50 focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4 w-full">
              <button
                onClick={handleCopy}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-md font-medium cursor-pointer hover:bg-blue-700 transition"
              >
                {t("Copy Link")}
              </button>

              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-5 py-2 rounded-lg text-md font-medium cursor-pointer hover:bg-green-700 transition"
                disabled={isLoading}
              >
                {isLoadingPdf ? t("Downloading Image...") : t("Download Image")}
              </button>
            </div>

            {copySuccess && <p className="mt-3 text-green-500 font-semibold">{t(copySuccess)}</p>}

            {errorMessage && <p className="mt-3 text-red-500 font-semibold">{t(errorMessage)}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
