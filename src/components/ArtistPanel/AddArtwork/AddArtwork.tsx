import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { formSchemas } from "../schemas/index";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "../../ui/Header";
import Button from "../../ui/Button";
import ArtworkRight from "./ArtworkRight";
import ArtBreadcrumbs from "./ArtBreadcrumb";
import { TiPlus } from "react-icons/ti";
import P from "../../ui/P";
import {
  package_dimension,
  artwork_orientation,
  Framed_dimension,
  options,
  options_1,
  options_2,
  buttonsData,
  yearOption,
  seriesData,
  shipping_inventry,
} from "../../utils/mockData";
import Select from "react-select";
import image_icon from "../../../assets/image_icon.png";
import video_icon from "../../../assets/video_icon.png";
import * as Yup from "yup";
import axiosInstance from "../../utils/axios";
import { useSearchParams } from "react-router-dom";
import usePostArtWorkMutation from "./http/usePostArtwork";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import Loader from "../../ui/Loader";
import AdditionalSelect from "../../ui/AdditionalSelect";
import { useGetTechnic } from "./http/useGetTechnic";
import { useGetTheme } from "./http/useGetTheme";

const AddArtwork = () => {
  const [progress, setProgress] = useState(0);
  const artworkTechnic = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   email: Yup.string()
  //     .email("Invalid email format")
  //     .required("Email is required"),
  //   region: Yup.string().required("Region is required"),
  //   subject: Yup.string().required("Subject is required"),
  //   message: Yup.string().required("Message is required"),
  // });

  const [mainImage, setMainImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [inProcessImage, setInProcessImage] = useState(null);
  const [images, setImages] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [initialValues, setInitialValues] = useState({
    artworkName: "",
    artistName: "",
    artworkCreationYear: "",
    artworkSeries: "",
    productDescription: "",
    mainImage: "",
    backImage: "",
    inProcessImage: "",
    images: [],
    mainVideo: "",
    otherVideo: "",
    artworkTechnic: "",
    artworkTheme: "",
    artworkOrientation: "",
    material: "",
    offensive: "",
    weight: "",
    length: "",
    height: "",
    width: "",
    emotions: [],
    basePrice: "",
    discounttype: "",
    discountAcceptation: "",
    textclass: "",
    vatAmount: "",
    sku: "",
    pCode: "",
    location: "",
    barcode: "",
    hangingAvailable: "",
    hangingDescription: "",
    framedDescription: "",
    framed: "",
    frameHeight: "",
    frameLength: "",
    frameWidth: "",
    artworkStyle: [],
    artworkStyleType: [],
    colors: [],
    purchaseCatalog: "",
    artistFees: "",
    availableTo: "",
    dicountAcceptation: "",
    downwardOffer: "",
    upworkOffer: "",
    acceptOfferPrice: "",
    priceRequest: "",
    artistbaseFees: "",
    dpersentage: "",
    artworkDiscipline: "",
    collectionList: "",
    artworkTags: "",
    promotion: "",
    promotionScore: "",
    productcategory: "",
    producttags: "",
    Fieldlocation: "",
    productstatus: "",
  });
  const { data, isLoading, isFetching } = useGetArtWorkById(id);
  console.log(data);

  useEffect(() => {
    if (id) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        // ...response.data.data,
        availableTo: data?.data?.restriction?.availableTo || "",
        collectionList: data?.data?.collectionList || "",
        discountAcceptation: data?.data?.restriction?.discountAcceptation || "",
        artistName: data?.data?.owner?.artistName || "",
        artworkSeries: data?.data?.artworkSeries || "",
        artworkCreationYear: data?.data?.artworkCreationYear || "",
        artworkName: data?.data?.artworkName || "",
        productDescription: data?.data?.productDescription || "",

        artworkTechnic: data?.data?.additionalInfo?.artworkTechnic || "",
        artworkTheme: data?.data?.additionalInfo?.artworkTheme || "",
        artworkOrientation:
          data?.data?.additionalInfo?.artworkOrientation || "",

        material: data?.data?.additionalInfo?.material || "",
        weight: data?.data?.additionalInfo?.weight || "",
        length: data?.data?.additionalInfo?.length || "",
        height: data?.data?.additionalInfo?.height || "",
        width: data?.data?.additionalInfo?.width || "",
        hangingAvailable: data?.data?.additionalInfo?.hangingAvailable || "",
        hangingDescription:
          data?.data?.additionalInfo?.hangingDescription || "",
        framed: data?.data?.additionalInfo?.framed || "",

        framedDescription: data?.data?.additionalInfo?.framedDescription || "",
        frameHeight: data?.data?.additionalInfo?.frameHeight || "",
        frameLength: data?.data?.additionalInfo?.frameLength || "",
        frameWidth: data?.data?.additionalInfo?.frameWidth || "",
        // multi selceted options
        artworkStyleType:
          data?.data?.additionalInfo?.artworkStyle?.map((opt) => {
            return { value: opt, label: opt };
          }) || "",
        emotions:
          data?.data?.additionalInfo?.emotions?.map((opt) => {
            return { value: opt, label: opt };
          }) || "",
        colors:
          data?.data?.additionalInfo?.colors?.map((opt) => {
            return { value: opt, label: opt };
          }) || "",

        offensive: data?.data?.additionalInfo?.offensive || "",

        purchaseCatalog: data?.data?.commercialization?.purchaseCatalog || "",
        downwardOffer: data?.data?.commercialization?.downwardOffer || "",
        upworkOffer: data?.data?.commercialization?.upworkOffer || "",
        acceptOfferPrice: data?.data?.commercialization?.acceptOfferPrice || "",
        priceRequest: data?.data?.commercialization?.priceRequest || "",
        artistbaseFees: data?.data?.commercialization?.artistbaseFees || "",
        basePrice: data?.data?.pricing?.basePrice || "",
        dpersentage: data?.data?.pricing?.dpersentage || "",
        vatAmount: data?.data?.pricing?.vatAmount || "",
        artistFees: data?.data?.pricing?.artistFees || "",

        sku: data?.data?.inventoryShipping?.sku || "",
        pCode: data?.data?.inventoryShipping?.pCode || "",
        location: data?.data?.inventoryShipping?.location || "",

        artworkDiscipline: data?.data?.discipline?.artworkDiscipline || "",
        artworkTags: data?.data?.discipline?.artworkTags || "",

        promotion: data?.data?.promotions?.promotion || "",
        promotionScore: data?.data?.promotions?.promotionScore || "",

        mainImage: data?.data?.media?.mainImage || "",
        backImage: data?.data?.media?.backImage || "",
        otherVideo: data?.data?.media?.otherVideo || "",
        mainVideo: data?.data?.media?.mainVideo || "",
      }));
    }
  }, [id, data]);

  const { mutate, isPending } = usePostArtWorkMutation();

  const { data: technicData, isLoading: technicLoading } = useGetTechnic();
  const { data: themeData, isLoading: themeLoading } = useGetTheme();

  console.log(themeData);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleMultiFileChange = (e, setFiles) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const onSubmit = async (values: any) => {
    console.log("onSubmit", values);

    values.mainImage = mainImage;
    values.backImage = backImage;
    values.inProcessImage = inProcessImage;
    values.additionalImage = images;
    values.mainVideo = mainVideo;
    values.otherVideo = otherVideos;

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        values[key].forEach((item) => {
          formData.append(key, JSON.stringify(item)); // Serialize each item as JSON
        });
      } else {
        formData.append(key, values[key]);
      }
    });
    const newData = {
      id: id,
      data: formData,
    };

    mutate(newData);
  };

  const removeImage = (name: string, index: number) => {
    if (name === "mainImage") {
      setMainImage(null);
    } else if (name === "backImage") {
      setBackImage(null);
    } else if (name === "inProcessImage") {
      setInProcessImage(null);
    } else if (name === "images") {
      setImages(images.filter((_, i) => i !== index));
    } else if (name === "mainvideo") {
      setMainVideo(null);
    } else if (name === "otherVideos") {
      setOtherVideos(otherVideos.filter((_, i) => i !== index));
    }
  };

  const [value, setValue] = useState(null);
  useEffect(() => {
    if (data?.data) {
      setMainImage(`${data.url}/uploads/users/${data.data?.media?.mainImage}`);
      setBackImage(`${data.url}/uploads/users/${data.data?.media?.backImage}`);
      setInProcessImage(
        `${data.url}/uploads/users/${data.data?.media?.inProcessImage}`
      );
    }
  }, []);

  console.log(mainImage);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => (
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
                  <span
                    key={index}
                    variant={{
                      fontSize: "base",
                      theme: "dark",
                      fontWeight: "500",
                    }}
                    className="flex items-center cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-gray-800"
                  >
                    {/* <span>{button.icon}</span> */}
                    {button.label}
                  </span>
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
                      name="artworkName"
                      id="artworkName"
                      placeholder="Type artwork name here..."
                      className="w-full bg-[#F9F9FC] border text-sm sm:text-base border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                    {touched.artworkName && errors.artworkName ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkName}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      Artist name
                    </label>
                    <Field
                      type="text"
                      name="artistName"
                      id="artistName"
                      placeholder="Type artist name here (if different from artist). . ."
                      className="w-full bg-[#F9F9FC] text-sm sm:text-base border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                    {touched.artistName && errors.artistName ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artistName}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4 flex flex-col lg:flex-row  gap-2 w-full">
                    <div className="w-full">
                      <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                        Artwork creation year
                      </label>

                      <Field
                        as="select"
                        id="artworkCreationYear"
                        name="artworkCreationYear"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select type
                        </option>
                        {yearOption.map((year, index) => (
                          <option key={index}>{year.year}</option>
                        ))}
                      </Field>
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

                      <Field
                        as="select"
                        id="artworkSeries"
                        name="artworkSeries"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select type
                        </option>
                        {seriesData.map((series, index) => (
                          <option key={index}>{series.series}</option>
                        ))}
                      </Field>

                      {/* <select
                        name="artworkSeries"
                        className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                      >
                        {seriesData.map((series, index) => (
                          <option key={index}>{series.series}</option>
                        ))}
                      </select> */}
                    </div>
                  </div>

                  <>
                    <label className="block text-sm sm:text-base mb-2 font-semibold text-[#203F58]">
                      Product Description
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
                      <div>
                        <Header
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="mb-2 text-[#203F58]"
                        >
                          Main Photo
                        </Header>
                        <input
                          type="file"
                          accept="image/*"
                          id="main-photo-input"
                          onChange={(e) => handleFileChange(e, setMainImage)}
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {data?.data?.media?.mainImage || mainImage ? (
                            <div className="relative">
                              <img
                                src={
                                  id
                                    ? `${data.url}/uploads/users/${data.data?.media?.mainImage}`
                                    : URL.createObjectURL(mainImage)
                                }
                                alt="image"
                                className="w-28 h-28 object-cover"
                              />
                              <span
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                onClick={() => removeImage("mainImage", 0)}
                              >
                                &times;
                              </span>
                            </div>
                          ) : (
                            <img
                              src={image_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#main-photo-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Image
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
                          Back Photo
                        </Header>
                        <input
                          type="file"
                          accept="image/*"
                          id="back-photo-input"
                          onChange={(e) => handleFileChange(e, setBackImage)}
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {backImage ? (
                            <div className="relative">
                              <img
                                src={
                                  id
                                    ? `${data.url}/uploads/users/${data.data?.media?.backImage}`
                                    : URL.createObjectURL(backImage)
                                }
                                alt="image"
                                className="w-28 h-28 object-cover"
                              />
                              <span
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                onClick={() => removeImage("backImage", 0)}
                              >
                                &times;
                              </span>
                            </div>
                          ) : (
                            <img
                              src={image_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#back-photo-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Image
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
                          Inprocess Photo
                        </Header>
                        <input
                          type="file"
                          accept="image/*"
                          id="inprocess-photo-input"
                          onChange={(e) =>
                            handleFileChange(e, setInProcessImage)
                          }
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {inProcessImage ? (
                            <div className="relative">
                              <img
                                src={
                                  id
                                    ? `${data.url}/uploads/users/${data.data?.media?.inProcessImage}`
                                    : URL.createObjectURL(inProcessImage)
                                }
                                alt="image"
                                className="w-28 h-28 object-cover"
                              />
                              <span
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                onClick={() => removeImage("inProcessImage", 0)}
                              >
                                &times;
                              </span>
                            </div>
                          ) : (
                            <img
                              src={image_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#inprocess-photo-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Image
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* details photos */}
                    <div className="grid gap-4">
                      <div>
                        <Header
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="mb-2 text-[#203F58]"
                        >
                          Details photos (max 3 images)
                        </Header>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          id="details-photo-input"
                          name="images"
                          onChange={(e) => handleMultiFileChange(e, setImages)}
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {images && images.length > 0 ? (
                            images.map((img, i) => (
                              <div key={i} className="relative">
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt="image"
                                  className="w-28 h-28 object-cover"
                                />
                                <span
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                  onClick={() => removeImage("images", i)}
                                >
                                  &times;
                                </span>
                              </div>
                            ))
                          ) : (
                            <img
                              src={image_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#details-photo-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Images
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      <div>
                        <Header
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="mb-2 text-[#203F58]"
                        >
                          Main Video
                        </Header>
                        <input
                          type="file"
                          accept="video/*"
                          id="main-video-input"
                          onChange={(e) => handleFileChange(e, setMainVideo)}
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {mainVideo ? (
                            <div className="relative">
                              <video
                                src={URL.createObjectURL(mainVideo)}
                                className="w-28 max-h-28 object-cover mb-4"
                                controls
                              />
                              <span
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                onClick={() => removeImage("mainvideo", 0)}
                              >
                                &times;
                              </span>
                            </div>
                          ) : (
                            <img
                              src={video_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#main-video-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Video
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
                          Other Video
                        </Header>
                        <input
                          type="file"
                          id="other-video-input"
                          accept="video/*"
                          multiple
                          onChange={(e) =>
                            handleMultiFileChange(e, setOtherVideos)
                          }
                          className="hidden"
                        />
                        <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                          {otherVideos && otherVideos.length > 0 ? (
                            otherVideos.map((v, i) => (
                              <div key={i} className="relative">
                                <video
                                  src={URL.createObjectURL(v)}
                                  className="w-28 max-h-28 object-cover mb-4"
                                  controls
                                />
                                <span
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                  onClick={() =>
                                    removeImage("inProcessPhotos", 0)
                                  }
                                >
                                  &times;
                                </span>
                              </div>
                            ))
                          ) : (
                            <img
                              src={video_icon}
                              alt="icon"
                              className="w-28 max-h-28 min-h-28 object-cover mb-4"
                            />
                          )}

                          <P
                            variant={{
                              size: "base",
                              theme: "dark",
                              weight: "normal",
                            }}
                            className="text-center"
                          >
                            Drag and drop image here, or click add image
                          </P>
                          <span
                            onClick={() =>
                              document
                                .querySelector("#other-video-input")
                                .click()
                            }
                            className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                          >
                            Add Videos
                          </span>
                        </div>
                      </div>
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
                        <option value="" disabled selected>
                          Select type
                        </option>
                        {technicLoading
                          ? null
                          : technicData?.data?.map((item, i) => (
                              <option>{item.technicName}</option>
                            ))}
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      Artwork theme
                      <Field
                        as="select"
                        id="artworkTheme"
                        name="artworkTheme"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select type
                        </option>
                        {themeLoading ? (
                          <option value="" disabled selected>
                            Loading...
                          </option>
                        ) : (
                          themeData?.data?.map((item, i) => (
                            <option key={i}>{item.themeName}</option>
                          ))
                        )}
                      </Field>
                    </label>
                  </div>

                  <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                    Artwork orientation
                    <Field
                      as="select"
                      id="artworkOrientation"
                      name="artworkOrientation"
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="" disabled selected>
                        Select type
                      </option>
                      <option>Square </option>
                      <option>Rectengle</option>
                      <option>Circle</option>
                      <option>Star</option>
                    </Field>
                  </label>

                  <div className="grid md:grid-cols-2 gap-3 mt-4 mb-4">
                    <label className="text-[#203F58] font-semibold">
                      Material
                      <Field
                        as="select"
                        id="Material"
                        name="material"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select type
                        </option>
                        <option>Paper</option>
                        <option>Watercolor Paper</option>
                        <option>Mixed Media Paper</option>
                        <option>Glaze Paper</option>
                        <option>Drawing Paper</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      Offensive
                      <Field
                        as="select"
                        id="Offensive"
                        name="offensive"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
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
                        id="hangingAvailable"
                        name="hangingAvailable"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Short Description for hanging
                      <Field
                        type="text"
                        id="hangingDescription"
                        name="hangingDescription"
                        placeholder="Type Hanging description here. . .. . ."
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
                      ></Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-bas  font-semibold ">
                      Farmed
                      <Field
                        as="select"
                        id="Farmed"
                        name="framed"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base  font-semibold ">
                      Framed Description
                      <Field
                        type="text"
                        id="framedDescription"
                        name="framedDescription"
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
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder}
                            // value={value}
                            className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                          />
                        </span>
                      ))}
                    </div>

                    <div className="">
                      <Select
                        options={options}
                        // defaultValue={value}
                        placeholder="Select Artwork Style"
                        isMulti
                        name="artworkStyleType"
                        value={values.artworkStyleType} // Bind to Formik's values
                        onChange={(selectedOptions) =>
                          setFieldValue("artworkStyleType", selectedOptions)
                        }
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
                        name="emotions"
                        value={values.emotions} // Bind to Formik's values
                        onChange={(selectedOptions) =>
                          setFieldValue("emotions", selectedOptions)
                        }
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
                        placeholder="Select Color"
                        name="colors"
                        value={values.colors}
                        onChange={(selectedOption) => {
                          const selectedValues = Array.isArray(selectedOption)
                            ? selectedOption // Multiple selection (array)
                            : selectedOption
                            ? [selectedOption] // Single selection (object, convert to array)
                            : []; // No selection

                          setFieldValue("colors", selectedValues);
                        }}
                        isMulti={true} // Set this to true or false based on your requirement
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
                        id="artworkStyle"
                        name="artworkStyle"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
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
                      Purchase Catalog
                      <Field
                        as="select"
                        id="textclass"
                        name="purchaseCatalog"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Artist Fees
                      <Field
                        type="text"
                        id="artistFees"
                        name="artistFees"
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
                        id="downwardOffer"
                        name="downwardOffer"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Upwork Offer
                      <Field
                        as="select"
                        id="upworkOffer"
                        name="upworkOffer"
                        placeholder="Select"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Accept Offer Price
                      <Field
                        type="text"
                        id="acceptOfferPrice"
                        name="acceptOfferPrice"
                        placeholder="20%"
                        className="bg-[#E0E2E7] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      ></Field>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="text-[#203F58] sm:text-base font-semibold ">
                      Price Request
                      <Field
                        type="text"
                        id="priceRequest"
                        name="priceRequest"
                        placeholder="20%"
                        className="bg-[#E0E2E7] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      ></Field>
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
                      name="basePrice"
                      id="basePrice"
                      placeholder="$ Type base price here..."
                      value={values.basePrice}
                      className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 "
                    />
                  </>
                  {touched.basePrice && errors.basePrice ? (
                    <div className="error text-red-500">{errors.basePrice}</div>
                  ) : null}
                  <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                    Discount Percentage
                  </label>
                  <Field
                    type="text"
                    name="dpersentage"
                    id="dpersentage"
                    placeholder="$ 00  %"
                    value={values.dpersentage}
                    className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 "
                  />

                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="text-[#203F58] text-sm sm:text-base  font-semibold">
                      Artist Base Fess
                      <Field
                        id="artistbaseFees"
                        name="artistbaseFees"
                        placeholder="Artist Base Fess"
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      ></Field>
                    </label>
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                      VAT Amount (%)
                      <Field
                        type="text"
                        id="vatAmount"
                        name="vatAmount"
                        placeholder="Type VAT amount. . ."
                        value={values.vatAmount}
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      ></Field>
                      {touched.vatAmount && errors.vatAmount ? (
                        <div className="error text-red-500">
                          {errors.vatAmount}
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
                      name="location"
                      id="location"
                      placeholder="India"
                      value={values.location}
                      className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                    />
                  </span>

                  {/* <Header
                    variant={{
                      size: "lg",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-2"
                  >
                    Package Dimensions
                  </Header> */}

                  {/* <div className="grid grid-cols-4 gap-3">
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
                  </div> */}
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
                    {isPending ? "Previewing..." : "Save & Preview"}
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