import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { formSchemas } from "../schemas/index";
import { ChangeEvent, useRef, useState } from "react";
import Header from "../../ui/Header";
import Button from "../../ui/Button";
import ArtworkRight from "./ArtworkRight";
import ArtBreadcrumbs from "./ArtBreadcrumb";
import { TiPlus } from "react-icons/ti";
import P from "../../ui/P";
import Select from "react-select";
import * as Yup from "yup";

type InputRefs = {
  [key: string]: HTMLInputElement | null;
};

const AddArtwork = () => {
  const inputRefs = useRef<InputRefs>({});
  const [previews, setPreviews] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: File[];
  }>({});

  const [progress, setProgress] = useState(0);

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   email: Yup.string()
  //     .email("Invalid email format")
  //     .required("Email is required"),
  //   region: Yup.string().required("Region is required"),
  //   subject: Yup.string().required("Subject is required"),
  //   message: Yup.string().required("Message is required"),
  // });

  const initialValues = {
    artworktype: "",
    artworkname: "",
    artistname: "",
    productDescription: "",
    mainphoto: null,
    additionalimages: null,
    vedio: null,
    vedios: null,
    baseprice: "",
    discounttype: "",
    discounpercentage: "",
    textclass: "",
    vatamount: "",
    sku: "",
    barcode: "",
    artworkstyle: "",
    artworkstyle2: "",
    artwortheme: "",
    artworkTechnic: "",
    ArtworkTheme: "",
    ArtworkOrientaion: "",
    HangingAvailable: "",
    ShortDescription: "",
    FarmedDescription: "",
    ArtworkStyle: "",
    framedHeight: "",
    framedLenght: "",
    framedWidth: "",
    packageDimensionsWeight: "",
    packageDimensionsheight: "",
    packageDimensionslenght: "",
    packageDimensionswidth: "",
    artworkOrientationWeight: "",
    artworkOrientationheight: "",
    artworkOrientationlenght: "",
    artworkOrientationwidth: "",
    productcategory: "",
    producttags: "",
    Fieldlocation: "",
    productstatus: "",
    variations: [{ variationtype: "", variation: "" }],
  };

  const package_dimension = [
    {
      name: "packageDimensionsWeight",
      label: "Weight",
      placeholder: "Product weight...",
    },
    {
      name: "packageDimensionsheight",
      label: "Height",
      placeholder: "Height (cm)...",
    },
    {
      name: "packageDimensionslenght",
      label: "Length",
      placeholder: "Length (cm)...",
    },
    {
      name: "packageDimensionswidth",
      label: "Width",
      placeholder: "Width (cm)...",
    },
  ];

  const artwork_orientation = [
    {
      name: "artworkOrientationWeight",
      label: "Weight",
      placeholder: "Product weight...ddd",
    },
    {
      name: "artworkOrientationheight",
      label: "Height",
      placeholder: "Height (cm)...dd",
    },
    {
      name: "artworkOrientationlenght",
      label: "Length",
      placeholder: "Length (cm)...",
    },
    {
      name: "artworkOrientationwidth",
      label: "Width",
      placeholder: "Width (cm)...",
    },
  ];

  const Framed_dimension = [
    { name: "framedHeight", label: "Height", placeholder: "Height (cm)..." },
    { name: "framedLenght", label: "Length", placeholder: "Length (cm)..." },
    { name: "framedWidth", label: "Width", placeholder: "Width (cm)..." },
  ];

  const options = [
    { value: "print", label: "print" },
    { value: "art", label: "art" },
  ];

  const options_1 = [
    { value: "Dark", label: "Dark" },
    { value: "highlights", label: "highlights" },
  ];

  const options_2 = [
    { value: "Blue", label: "Blue" },
    { value: "magenta", label: "magenta" },
  ];

  const mediaSections = [
    {
      label: "Main Photo",
      name: "mainPhoto",
      placeholder: "Drag and drop image here, or click add image",
      type: "image",
      //con: image_icon,
      btn_text: "Add Image",
    },
    {
      label: "Back Photo",
      name: "backPhoto",
      placeholder: "Drag and drop image here, or click add image",
      type: "image",
      //con: image_icon,
      btn_text: "Add Image",
    },
    {
      label: "Inprocess Photo",
      name: "inProcessPhoto",
      placeholder: "Drag and drop image here, or click add image",
      type: "image",
      //con: image_icon,
      btn_text: "Add Image",
    },
  ];

  const detailSection = [
    {
      label: "Details Photos ",
      max: "(max 3 images)",
      name: "detailPhotos",
      placeholder: "Drag and drop image here, or click add image",
      type: "image",
      //con: image_icon,
      btn_text: "Add Image",
    },
    {
      label: "Details Photos ",
      max: "(max 3 images)",
      name: "detailPhotos",
      placeholder: "Drag and drop image here, or click add image",
      type: "image",
      //con: image_icon,
      btn_text: "Add Image",
    },
  ];

  const videoSection = [
    {
      label: "Main Video",
      name: "mainVideo",
      placeholder: "Drag and drop video here, or click add video (max 1 video)",
      type: "video",
      //icon: video_icon,
      btn_text: "Add Video",
    },
    {
      label: "Other Video",
      name: "otherVideo",
      placeholder:
        "Drag and drop video here, or click add video (max 2 videos)",
      type: "video",
      //icon: video_icon,
      btn_text: "Add Video",
    },
  ];

  const buttonsData = [
    { label: "Preview" },
    { label: "Revalidate" },
    { label: "generate QR code" },
    { label: "generate certificate of authenticity" },
  ];

  const yearOption = [
    {
      year: "select year",
    },
    {
      year: 2023,
    },
    {
      year: 2022,
    },
    {
      year: 2021,
    },
    {
      year: 2020,
    },
    {
      year: 2019,
    },
  ];

  const seriesData = [
    {
      series: "Artwork with alienida",
    },
    {
      series: "Series 2",
    },
    {
      series: "Series 3",
    },
    {
      series: "Series 4",
    },
  ];

  const shipping_inventry = [
    {
      name: "sku",
      label: "SKU",
      placeholder: "Type Product sku here...",
    },
    {
      name: "barcode",
      label: "Product Code",
      placeholder: "Product Code...",
    },
  ];

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    sectionName: string,
    detailName?: string
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [sectionName]: previewUrl,
        ...(detailName && { [detailName]: previewUrl }),
      }));
    }
  };
  const onSubmit = (values: any) => {
    console.log("values==============", values);
  };
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const currentImages = selectedImages[name] || [];

      if (currentImages.length + filesArray.length > 3) {
        alert("You can only select up to 3 images.");
        return;
      }

      setSelectedImages((prev) => ({
        ...prev,
        [name]: [...currentImages, ...filesArray], // Append the new images to the correct section
      }));
    }
  };

  const removeImage = (name: string, index: number) => {
    setSelectedImages((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index), // Remove image at specific index in the correct section
    }));
  };

  const [value, setValue] = useState(null);

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, errors, touched }) => (
        <div className="py-10 bg-white">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "bold" }}
            className="text-black "
          >
            Add Artwork
          </Header>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col 2xl:flex-row justify-between 2xl:items-center mt-3 2xl:mt-0 mb-4 mx-2">
              <ArtBreadcrumbs />

              <div className="flex flex-col lg:flex-row w-fit gap-4 flex-wrap mt-4 md:lg-0">
                {buttonsData.map((button, index) => (
                  <Button
                    key={index}
                    variant={{
                      fontSize: "base",
                      theme: "dark",
                      fontWeight: "500",
                    }}
                    className="flex items-center gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-gray-800"
                  >
                    {/* <span>{button.icon}</span> */}
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-4 gap-5 w-full">
              <div className="md:col-span-3 rounded-md">
                <div className="bg-white p-6 rounded-md shadow-md border ">
                  <Header
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-[18px] text-black font-semibold mb-4"
                  >
                    General Information
                  </Header>

                  <div className="mb-4">
                    <label className="block  text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      Artwork name
                    </label>
                    <Field
                      type="text"
                      name="artworkname"
                      id="artworkname"
                      placeholder="Type artwork name here..."
                      className="w-full bg-[#F9F9FC] border text-sm sm:text-base border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                    {touched.artworkname && errors.artworkname ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkname}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      Artist name
                    </label>
                    <Field
                      type="text"
                      name="artistname"
                      id="artistname"
                      placeholder="Type artist name here (if different from artist). . ."
                      className="w-full bg-[#F9F9FC] text-sm sm:text-base border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                    {touched.artistname && errors.artistname ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artistname}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4 flex flex-col lg:flex-row  gap-2 w-full">
                    <div className="w-full">
                      <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                        Artwork creation year
                      </label>

                      <select className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md p-1 sm:p-3 outline-none">
                        {yearOption.map((year, index) => (
                          <option key={index} value={year}>
                            {year.year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <label className="block text-sm sm:text-base text-[#203F58] font-semibold ">
                          Select Series
                        </label>
                        <p className="text-[#5C59E8] text-sm sm:text-base flex items-center gap-[2px] cursor-pointer">
                          <span className="border-b-2 border-b-[#5C59E8] ">
                            {" "}
                            <TiPlus />
                          </span>{" "}
                          <span className="border-b border-b-[#5C59E8] font-semibold">
                            Create New Series
                          </span>
                        </p>
                      </div>
                      <select className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md p-1 sm:p-3 outline-none">
                        {seriesData.map((series, index) => (
                          <option key={index} value={series}>
                            {series.series}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <>
                    <label className="block text-sm sm:text-base mb-2 font-semibold text-[#203F58]">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="productDescription"
                      placeholder="Type product description here..."
                      rows={5}
                      className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md  p-1 sm:p-3 outline-none"
                    />
                    {touched.productDescription && errors.productDescription ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.productDescription}
                      </div>
                    ) : null}
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
                    Media
                  </Header>

                  <div className="bg-white p-4 rounded-md mt-4">
                    <div className="grid lg:grid-cols-3 gap-4">
                      {mediaSections.map((section, index) => (
                        <div key={index}>
                          <Header
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "semiBold",
                            }}
                            className="mb-2 text-[#203F58]"
                          >
                            {section.label}
                          </Header>
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            <img
                              src={previews[section.name] || section.icon}
                              alt={section.label}
                              className="w-28  max-h-28 min-h-28 object-cover mb-4"
                            />
                            <P
                              variant={{
                                size: "base",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center"
                            >
                              {section.placeholder}
                            </P>
                            <Button
                              className="bg-[#DEDEFA]  font-bold mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                inputRefs.current[section.name]?.click();
                              }}
                            >
                              {section.btn_text}
                            </Button>
                            <input
                              type="file"
                              name={section.name}
                              accept={
                                section.type === "image" ? "image/*" : "video/*"
                              }
                              ref={(el) =>
                                (inputRefs.current[section.name] = el)
                              }
                              onChange={(e) =>
                                handleFileChange(e, section.name)
                              }
                              className="hidden"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4 mt-5 mb-5">
                      {detailSection.map((detail, index) => (
                        <div key={index}>
                          <div className="flex gap-1">
                            <Header
                              variant={{
                                size: "base",
                                theme: "dark",
                                weight: "semiBold",
                              }}
                              className="mb-2"
                            >
                              {detail.label}
                            </Header>
                            <span className="text-sm">{detail.max}</span>
                          </div>
                          <div className="bg-[#F9F9FC] border border-dashed py-10 px-12 flex flex-col items-center relative">
                            {selectedImages[detail.name] &&
                            selectedImages[detail.name].length > 0 ? (
                              <div className="flex flex-wrap gap-4">
                                {selectedImages[detail.name].map(
                                  (image, imgIndex) => (
                                    <div key={imgIndex} className="relative">
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt={`selected-${imgIndex}`}
                                        className="w-28 h-28 object-cover"
                                      />
                                      <button
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                        onClick={() =>
                                          removeImage(detail.name, imgIndex)
                                        }
                                      >
                                        &times;
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <>
                                <img
                                  src={detail.icon}
                                  alt={detail.label}
                                  className="w-28 max-h-28 min-h-28 object-cover mb-4"
                                />
                                <P
                                  variant={{
                                    size: "base",
                                    theme: "dark",
                                    weight: "normal",
                                  }}
                                  className="text-center"
                                >
                                  {detail.placeholder}
                                </P>
                              </>
                            )}
                            <Button
                              className="bg-[#DEDEFA] font-bold mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                inputRefs.current[detail.name]?.click();
                              }}
                            >
                              {detail.btn_text}
                            </Button>
                            <input
                              type="file"
                              name={detail.name}
                              accept="image/*"
                              multiple
                              ref={(el) =>
                                (inputRefs.current[detail.name] = el)
                              }
                              className="hidden"
                              onChange={(e) =>
                                handleImageChange(e, detail.name)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      {videoSection.map((video, index) => (
                        <div key={index}>
                          <Header
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "semiBold",
                            }}
                            className="mb-2 text-[#203F58]"
                          >
                            {video.label}
                          </Header>
                          <div className="bg-[#F9F9FC]  border border-dashed py-10 pt-20 px-12 flex flex-col items-center">
                            <img
                              src={previews[video.name] || video.icon}
                              alt={video.label}
                              className="  mb-4"
                            />
                            <P
                              variant={{
                                size: "base",
                                theme: "dark",
                                weight: "normal",
                              }}
                              className="text-center w-60 "
                            >
                              {video.placeholder}
                            </P>
                            <Button
                              className="bg-[#DEDEFA] font-bold mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                inputRefs.current[video.name]?.click();
                              }}
                            >
                              {video.btn_text}
                            </Button>
                            <input
                              type="file"
                              name={video.name}
                              accept={
                                video.type === "image" ? "image/*" : "video/*"
                              }
                              ref={(el) => (inputRefs.current[video.name] = el)}
                              onChange={(e) => handleFileChange(e, video.name)}
                              className="hidden"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* additional info */}

                <div className="bg-white p-4 rounded-md mt-6 border border-[#E0E2E7] shadow-md ">
                  <Header
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-4"
                  >
                    Additional information
                  </Header>

                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      Artwork technic
                      <Field
                        as="select"
                        id="artworkTechnic"
                        name="artworkTechnic"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full  p-1 sm:p-2.5 "
                      >
                        <option>Select type </option>
                        <option>one</option>
                        <option>three</option>
                        <option>four</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      Artwork theme
                      <Field
                        as="select"
                        id="ArtworkTheme"
                        name="ArtworkTheme"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Select type </option>
                        <option>one</option>
                        <option>three</option>
                        <option>four</option>
                      </Field>
                    </label>
                  </div>

                  <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                    Artwork orientation
                    <Field
                      as="select"
                      id="ArtworkOrientaion"
                      name="ArtworkOrientaion"
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option>Square </option>
                      <option>Rectengle</option>
                      <option>three</option>
                      <option>four</option>
                    </Field>
                  </label>

                  <div className="grid md:grid-cols-2 gap-3 mt-4 mb-4">
                    <label className="text-[#203F58] font-semibold">
                      Material
                      <Field
                        as="select"
                        id="Material"
                        name="Material"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Paper</option>
                        <option>one</option>
                        <option>three</option>
                        <option>four</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      Offensive
                      <Field
                        as="select"
                        id="Offensive"
                        name="Offensive"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>

                  <div className="grid grid-cols-4 mb-4 gap-3">
                    {artwork_orientation.map((field) => (
                      <span key={field.name}>
                        <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                          {field.label}
                        </label>
                        <Field
                          type="text"
                          name={field.name}
                          id={field.name}
                          placeholder={field.placeholder}
                          className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-4">
                    <label className="text-[#203F58] font-semibold ">
                      Hanging available
                      <Field
                        as="select"
                        id="HangingAvailable"
                        name="HangingAvailable"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Short Description for hanging
                      <Field
                        type="text"
                        id="ShortDescription"
                        name="ShortDescription"
                        placeholder="Type Hanging description here. . .. . ."
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
                      ></Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-bas  font-semibold ">
                      Farmed
                      <Field
                        as="select"
                        id="Farmed"
                        name="Farmed"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base  font-semibold ">
                      Framed Description
                      <Field
                        type="text"
                        id="FarmedDescription"
                        name="FarmedDescription"
                        placeholder="Type Framed description here. . ."
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 pb-10 "
                      ></Field>
                    </label>

                    <div className="grid grid-cols-3 mb-4 gap-3 ">
                      {Framed_dimension.map((field) => (
                        <span key={field.name}>
                          <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                            {field.label}
                          </label>
                          <Field
                            type="text"
                            name={field.name} // Change here to field.name
                            id={field.name}
                            placeholder={field.placeholder}
                            value={value}
                            className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                          />
                        </span>
                      ))}
                    </div>

                    <div className="">
                      <Select
                        options={options}
                        defaultValue={value}
                        placeholder="Select Artwork Style"
                        isMulti
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
                    </div>

                    <div className="">
                      <Select
                        options={options_1}
                        defaultValue={value}
                        placeholder="Emotions"
                        isMulti
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
                    </div>

                    <div>
                      <Select
                        options={options_2}
                        defaultValue={value}
                        placeholder="Select Color"
                        isMulti
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
                    </div>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Artwork Style
                      <Field
                        as="select"
                        id="ArtworkStyle"
                        name="ArtworkStyle"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>
                </div>
                {/* additional info */}

                {/* additional info */}
                {/* <Commercialization /> */}

                <div className="bg-white p-4 rounded-md mt-6 border border-[#E0E2E7] shadow-md ">
                  <Header
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-4"
                  >
                    Commercialization
                  </Header>
                  <div className="space-y-2">
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Subscription Catalog
                      <Field
                        as="select"
                        id="textclass"
                        name="text"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option>Catalog02 </option>
                        <option>Catalog03</option>
                      </Field>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Artist Fees
                      <Field
                        type="text"
                        id="Description"
                        name="Description"
                        placeholder="20%"
                        className="bg-[#E0E2E7] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      ></Field>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Downward Offer
                      <Field
                        as="select"
                        id="textclass"
                        name="text"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>
                </div>
                {/* additional info */}

                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7]">
                  <Header
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-4"
                  >
                    Pricing
                  </Header>
                  <>
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Base Price
                    </label>
                    <Field
                      type="text"
                      name="baseprice"
                      id="baseprice"
                      placeholder="$ Type base price here..."
                      value={values.baseprice}
                      className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 "
                    />
                  </>
                  {touched.baseprice && errors.baseprice ? (
                    <div className="error text-red-500">{errors.baseprice}</div>
                  ) : null}
                  <label className="text-[#203F58] font-semibold  ">
                    Discount Type
                  </label>
                  <Field
                    as="select"
                    id="discounttype"
                    name="discounttype"
                    className="bg-[#F9F9FC] mb-3 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                  >
                    <option>Select a discount type</option>
                    <option>Early payment</option>
                    <option>Percentage</option>
                    <option>Buy one, get one free </option>
                  </Field>

                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="text-[#203F58] text-sm sm:text-base  font-semibold">
                      Tax Class
                      <Field
                        as="select"
                        id="textclass"
                        name="textclass"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option>Select a tax class</option>
                        <option>two</option>
                        <option>three</option>
                        <option>four</option>
                      </Field>
                    </label>
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      VAT Amount (%)
                      <Field
                        type="text"
                        id="vatamount"
                        name="vatamount"
                        placeholder="Type VAT amount. . ."
                        value={values.vatamount}
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      ></Field>
                      {touched.vatamount && errors.vatamount ? (
                        <div className="error text-red-500">
                          {errors.vatamount}
                        </div>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7] shadow-md">
                  <Header
                    variant={{
                      size: "lg",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-2"
                  >
                    Inventory & Shipping
                  </Header>

                  <div className="grid md:grid-cols-2 gap-3">
                    {shipping_inventry.map((shipping) => (
                      <span key={shipping.name}>
                        <label className="p-1 text-[14px] text-sm sm:text-base font-semibold">
                          {shipping.label}
                        </label>
                        <Field
                          type="text"
                          name={shipping.name}
                          id={shipping.name}
                          placeholder={shipping.placeholder}
                          className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />
                      </span>
                    ))}
                  </div>

                  <span>
                    <label className="p-1 text-[14px] text-sm sm:text-base font-semibold">
                      Location
                    </label>
                    <Field
                      type="text"
                      name="sku"
                      id="sku"
                      placeholder="India"
                      value={values.sku}
                      className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                    />
                  </span>

                  <Header
                    variant={{
                      size: "lg",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-2"
                  >
                    Package Dimensions
                  </Header>

                  <div className="grid grid-cols-4 gap-3">
                    {package_dimension.map((field) => (
                      <span key={field.name}>
                        <label className="p-1 text-[14px] text-sm sm:text-base text-[#203F58] font-semibold">
                          {field.label}
                        </label>
                        <Field
                          type="text"
                          name={field.name}
                          id={field.name}
                          placeholder={field.placeholder}
                          value={values[field.name]}
                          className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* ------------------------ */}

              <ArtworkRight />
            </div>

            <div className="  bg-white pt-40 flex flex-col sm:flex-row items-center justify-between border border-dotted rounded  py-2 w-full">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Product Completion</span>
                <span className="text-red-500 bg-[#FDE7E9] px-2 py-1 text-sm rounded">
                  {progress}%
                </span>
              </div>

              <div className="flex space-x-2">
                <button className="border border-[#7E98B5] rounded px-4 py-1 text-sm font-semibold">
                  ✕ Cancel
                </button>
                {/* <button
                  type="submit"
                  className=" bg-[#0A0E17] shadow-md text-white rounded px-4 py-1 text-sm font-semibold"
                  // onClick={handleSubmit}
                >
                  + Submit
                </button> */}

                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    variant={{
                      fontSize: "md",
                      thickness: "thick",
                      fontWeight: "600",
                      theme: "dark",
                    }}
                    className=" text-white py-2 px-4 rounded"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AddArtwork;
