import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TiPlus } from "react-icons/ti";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import image_icon from "../../../assets/image_icon.png";
import video_icon from "../../../assets/video_icon.png";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import { BsBackspace } from "react-icons/bs";
import P from "../../ui/P";
import {
  artwork_orientation,
  buttonsData,
  Framed_dimension,
  options,
  options_1,
  options_2,
  package_dimension,
  package_dimensions,
  seriesData,
  shipping_inventry,
} from "../../utils/mockData";
import ArtBreadcrumbs from "./ArtBreadcrumb";
import ArtworkRight from "./ArtworkRight";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import { useGetTechnic } from "./http/useGetTechnic";
import { useGetTheme } from "./http/useGetTheme";
import usePostArtWorkMutation from "./http/usePostArtwork";
import QRCode from "react-qr-code";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Dicipline from "./Dicipline";
import { RenderAllPicklist } from "../../utils/RenderAllPicklist";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { SeriesPop } from "./SeriesPop";
import { useGetArtistDetails } from "../ArtistEditProfile/http/useGetDetails";
import { useGetSeries } from "./http/useGetSeries";
import { FaSolarPanel } from "react-icons/fa";

const CustomYearPicker = ({
  field,
  form,
  selectedYear,
  toggleCalendar,
  showCalendar,
}) => (
  <div className="relative w-full">
    <div
      onClick={toggleCalendar}
      className="bg-[#F9F9FC] mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 text-left cursor-pointer"
    >
      {selectedYear ? `${selectedYear}` : "Select Year"}
    </div>

    {showCalendar && (
      <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg px-10 py-2 ">
        <Calendar
          view="decade"
          defaultView="decade"
          onClickYear={(date) => {
            const year = date.getFullYear();
            form.setFieldValue(field.name, year);
            toggleCalendar();
          }}
          showNeighboringMonth={false}
          value={selectedYear ? new Date(selectedYear, 0) : new Date()}
        />
      </div>
    )}
  </div>
);

const AddArtwork = () => {
  const [progress, setProgress] = useState(0);

  const [showCalendar, setShowCalendar] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    artworkName: Yup.string().required("Artwork name is required"),
    artworkCreationYear: Yup.number()
      .required("Artwork creation year is required")
      .positive("Year must be a positive number")
      .integer("Year must be an integer"),

    isArtProvider: Yup.string().required("Art provider selection is required"),
    provideArtistName: Yup.string().required("Provide artist name is required"),

    artworkSeries: Yup.string().nullable(), // Optional field
    productDescription: Yup.string().nullable(), // Optional field

    artworkTechnic: Yup.string().nullable(), // Optional field
    artworkTheme: Yup.string().nullable(), // Optional field
    artworkOrientation: Yup.string().nullable(), // Optional field
    material: Yup.string().nullable(), // Optional field
    offensive: Yup.string().nullable(), // Optional field
    weight: Yup.number()
      .nullable()
      .positive("Weight must be a positive number")
      .integer("Weight must be an integer"), // Optional
    length: Yup.number()
      .nullable()
      .positive("Length must be a positive number")
      .integer("Length must be an integer"), // Optional
    height: Yup.number()
      .nullable()
      .positive("Height must be a positive number")
      .integer("Height must be an integer"), // Optional
    width: Yup.number()
      .nullable()
      .positive("Width must be a positive number")
      .integer("Width must be an integer"), // Optional

    emotions: Yup.array().of(Yup.string()).nullable(), // Optional array
    basePrice: Yup.number()
      .nullable()
      .positive("Base price must be a positive number"), // Optional field

    discounttype: Yup.string().nullable(),
    discountAcceptation: Yup.string().nullable(),
    textclass: Yup.string().nullable(),
    vatAmount: Yup.number()
      .nullable()
      .positive("VAT amount must be a positive number"),
    pCode: Yup.string().nullable(),
    location: Yup.string().nullable(),
    barcode: Yup.string().nullable(),

    hangingAvailable: Yup.string().nullable(),
    hangingDescription: Yup.string().nullable(),
    framedDescription: Yup.string().nullable(),
    framed: Yup.string().nullable(),
    frameHeight: Yup.number()
      .nullable()
      .positive("Frame height must be a positive number"),
    frameLength: Yup.number()
      .nullable()
      .positive("Frame length must be a positive number"),
    frameWidth: Yup.number()
      .nullable()
      .positive("Frame width must be a positive number"),

    artworkStyle: Yup.array().of(Yup.string()).nullable(), // Optional array
    artworkStyleType: Yup.array().of(Yup.string()).nullable(), // Optional array
    colors: Yup.array().of(Yup.string()).nullable(), // Optional array

    purchaseCatalog: Yup.string().nullable(),
    subscriptionCatalog: Yup.string().nullable(),
    subscriptionArtistFees: Yup.string().nullable(),
    artistFees: Yup.number()
      .nullable()
      .positive("Artist fees must be a positive number"),
    purchaseOption: Yup.string().nullable(),
    availableTo: Yup.string().nullable(),

    dicountAcceptation: Yup.string().nullable(),
    downwardOffer: Yup.number()
      .nullable()
      .positive("Downward offer must be a positive number"),
    upworkOffer: Yup.number()
      .nullable()
      .positive("Upwork offer must be a positive number"),
    acceptOfferPrice: Yup.number()
      .nullable()
      .positive("Accept offer price must be a positive number"),

    priceRequest: Yup.number()
      .nullable()
      .positive("Price request must be a positive number"),
    artistbaseFees: Yup.number()
      .nullable()
      .positive("Artist base fees must be a positive number"),
    dpersentage: Yup.number()
      .nullable()
      .positive("Discount percentage must be a positive number"),
    artworkDiscipline: Yup.string().nullable(),
    collectionList: Yup.string().nullable(),
    artworkTags: Yup.array().of(Yup.string()).nullable(), // Optional array

    promotion: Yup.string().nullable(),
    promotionScore: Yup.number()
      .nullable()
      .positive("Promotion score must be a positive number"),

    productcategory: Yup.string().nullable(),
    producttags: Yup.string().nullable(),
    Fieldlocation: Yup.string().nullable(),
    productstatus: Yup.string().nullable(),

    artistFeesCurrency: Yup.string().nullable(),
    baseFeesCurrency: Yup.string().nullable(),
    basePriceCurrency: Yup.string().nullable(),

    existingImage: Yup.array().nullable(), // Optional array of images
    existingVideo: Yup.array().nullable(), // Optional array of videos

    Subscription: Yup.string().nullable(),
  });

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [inProcessImage, setInProcessImage] = useState<string | null>(null);
  const [images, setImages] = useState([]);
  const [mainVideo, setMainVideo] = useState<string | null>(null);
  const [otherVideo, setOtherVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState();
  const [newImage, setNewImage] = useState(null);
  const [newBackImage, setNewBackImage] = useState(null);
  const [newInProcessImage, setNewInProcessImage] = useState([]);
  const [newMainVideo, setNewMainVideo] = useState([]);
  const [existingVideo, setExistingVideo] = useState([]);
  const [existingImage, setExistingImage] = useState([]);
  const [internalTags, setInternalTags] = useState([]);
  const [externalTags, setExternalTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artDicipline, setArtDicipline] = useState("");

  const [newOtherVideo, setNewOtherVideo] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [action, setAction] = useState("");

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const id = searchParams.get("id");
  const query = searchParams.get("view");

  const { data, isLoading, isFetching } = useGetArtWorkById(id);

  const { data: userData, isLoading: userIsLoading } = useGetArtistDetails();
  const userID = userData?.data?.artist?._id;
  const isArtProvider = userData?.data?.artist?.commercilization?.artProvider;

  const { data: technicData, isLoading: technicLoading } = useGetTechnic();

  const { data: themeData, isLoading: themeLoading } = useGetTheme();
  const { data: seriesData, isLoading: seriesLoading } = useGetSeries(userID);
  const { mutate, isPending } = usePostArtWorkMutation();

  const [initialValues, setInitialValues] = useState({
    artworkName: "",
    // isArtProvider: "",
    provideArtistName: "",
    artworkCreationYear: "",
    artworkSeries: "",
    productDescription: "",
    // Depth: "",
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
    vatAmount: seriesData?.vatAmount,
    acceptOfferPrice: "",
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
    // activeTab: "",
    subscriptionCatalog: "",
    subscriptionArtistFees: "",
    artistFees: "",
    purchaseOption: "",
    availableTo: "",
    dicountAcceptation: "",
    downwardOffer: "",
    upworkOffer: "",
    purchaseType: "",
    priceRequest: "",
    artistbaseFees: "",
    dpersentage: "",
    artworkDiscipline: "",
    collectionList: "",
    artworkTags: [],
    promotion: "",
    promotionScore: "",
    productcategory: "",
    producttags: "",
    Fieldlocation: "",
    productstatus: "",
    artistFeesCurrency: "",
    currency: "",
    basePriceCurrency: "",
    existingImage: [],
    existingVideo: [],
    Subscription: "",
    comingSoon: Boolean,
    packageWeight: "",
    packageHeight: "",
    packageLength: "",
    packageWidth: "",
    packageMaterial: "",
    intTags: [],
    extTags: [],
  });

  useEffect(() => {
    if (
      isLoading ||
      userIsLoading ||
      technicLoading ||
      themeLoading ||
      seriesLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, userIsLoading, technicLoading, themeLoading, seriesLoading]);

  const newTechnic = technicData?.data?.filter(
    (item) =>
      item.discipline &&
      item.discipline.some((newItem) =>
        newItem.disciplineName.includes(artDicipline)
      )
  );

  const newTheme = themeData?.data?.filter(
    (item) =>
      item.discipline &&
      item.discipline.some((newItem) =>
        newItem.disciplineName.includes(artDicipline)
      )
  );

  useEffect(() => {
    if (id) {
      setActiveTab(data?.data?.commercialization?.activeTab);
      setInternalTags(data?.data?.tags?.intTags || []);
      setExternalTags(data?.data?.tags?.extTags || []);
      setInitialValues((prevValues) => ({
        ...prevValues,
        // ...response.data.data,
        availableTo: data?.data?.restriction?.availableTo || "",
        collectionList: data?.data?.collectionList || "",
        discountAcceptation: data?.data?.restriction?.discountAcceptation || "",
        provideArtistName: data?.data?.provideArtistName || "",
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
        purchaseType: data?.data?.commercialization?.purchaseType || "",
        downwardOffer: data?.data?.commercialization?.downwardOffer || "",
        upworkOffer: data?.data?.commercialization?.upworkOffer || "",
        acceptOfferPrice: data?.data?.pricing?.acceptOfferPrice || "",
        priceRequest: data?.data?.commercialization?.priceRequest || "",
        artistbaseFees: data?.data?.commercialization?.artistbaseFees || "",
        basePrice: data?.data?.pricing?.basePrice || "",
        dpersentage: data?.data?.pricing?.dpersentage || "",

        artistFees: data?.data?.pricing?.artistFees || "",

        pCode: data?.data?.inventoryShipping?.pCode || "",
        location: data?.data?.inventoryShipping?.location || "",

        artworkDiscipline: data?.data?.discipline?.artworkDiscipline || "",
        artworkTags: data?.data?.discipline?.artworkTags || [],
        existingVideo: data?.data?.media?.otherVideo || [],
        existingImage: data?.data?.media?.images || [],
        promotion: data?.data?.promotions?.promotion || "",
        promotionScore: data?.data?.promotions?.promotionScore || "",
        isArtProvider: data?.data?.isArtProvider || "",
        subscriptionCatalog:
          data?.data?.commercialization?.subscriptionCatalog || "",
        purchaseOption: data?.data?.commercialization?.purchaseOption || "",
        vatAmount: seriesData?.vatAmount || "",
        intTags: data?.data?.intTags || [],
        extTags: data?.data?.extTags || [],
        currency: data?.data?.pricing?.currency || "",
        packageMaterial: data?.data?.inventoryShipping?.packageMaterial || "",
        packageWeight: data?.data?.inventoryShipping?.packageWeight || "",
        packageHeight: data?.data?.inventoryShipping?.packageHeight || "",
        packageLength: data?.data?.inventoryShipping?.packageLength || "",
        packageWidth: data?.data?.inventoryShipping?.packageWidth || "",
        comingSoon: data?.data?.inventoryShipping?.comingSoon || Boolean,
      }));
    }
  }, [id, data, inProcessImage, setInitialValues, seriesData]);

  const url = `https://dev.freshartclub.com/discover_more?id=${id}?referral=${"QR"}`;

  const currentPageUrl = url;

  const handleAddTag = (e) => {
    const tagValue = e.target.value.trim();
    if (tagValue && !internalTags.includes(tagValue)) {
      setInternalTags((prevTags) => [...prevTags, tagValue]);

      e.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    setInternalTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleAddExternalTag = (e) => {
    const tagValue = e.target.value.trim();

    if (tagValue && !externalTags.includes(tagValue)) {
      setExternalTags((prevTags) => [...prevTags, tagValue]);

      e.target.value = "";
    }
  };

  const handleRemoveExternalTag = (index) => {
    setExternalTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleAction = (actionType) => {
    setAction(actionType);
    console.log(`User selected: ${actionType}`);
  };

  const handleGenerateQRCode = () => {
    setQrVisible(true);
  };

  const { t, i18n } = useTranslation();

  const picklist = RenderAllPicklist("Plans");

  const handleNavigate = () => {
    navigate("/artist-panel/artdashboard");
    window.scrollTo(0, 0);
  };
  const handleFileChange = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      setMainImage(imageUrl);
    }
  };

  const handleFileChangeBackImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBackImage(file);
      const imageUrl = URL.createObjectURL(file);
      setBackImage(imageUrl);
    }
  };

  const handleFileChangeInprocessImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewInProcessImage(file);
      const imageUrl = URL.createObjectURL(file);
      setInProcessImage(imageUrl);
    }
  };

  const handleFileChangeDetailsImage = (e, setFile) => {
    const files = e.target.files;

    if (files.length === 1) {
      setImages((images) => [...images, files[0]]);
    } else {
      setImages((images) => [...images, ...Array.from(files)]);
    }
  };

  const handleMainVideo = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMainVideo(file);
      const videoUrl = URL.createObjectURL(file);
      setMainVideo(videoUrl);
    }
  };

  const handleOtherVideo = (e: any, setFile) => {
    const files = e.target.files;

    if (files.length === 1) {
      setOtherVideos((otherVideo) => [...otherVideo, files[0]]);
    } else {
      setOtherVideos((otherVideo) => [...otherVideo, ...Array.from(files)]);
    }
  };

  const removeVideo = (index: number, typeFile: string) => {
    console.log(index, typeFile);
    if (typeFile === "File") {
      setOtherVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
    }
  };

  const removeExistingVideo = (index: number, typeFile: string) => {
    console.log(index, typeFile);
    if (typeFile === "Url") {
      initialValues.existingVideo = initialValues.existingVideo.filter(
        (_, i) => i !== index
      );
      setInitialValues({ ...initialValues });
    }
  };

  const onSubmit = async (values: any) => {
    console.log("onSubmit", values);

    values.mainImage = newImage;
    values.backImage = newBackImage;
    values.inProcessImage = newInProcessImage;
    values.images = images;
    values.mainVideo = newMainVideo;
    values.otherVideo = otherVideo;
    values.activeTab = activeTab;
    values.intTags = internalTags;
    values.extTags = externalTags;
    values.isArtProvider = isArtProvider;

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(key, item);
          } else {
            formData.append(key, JSON.stringify(item));
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    const newData = {
      id: id,
      data: formData,
    };

    mutate(newData);
  };

  const removeImage = (name: string, index: number, typeFile: string) => {
    if (name === "mainImage") {
      setMainImage(null);
    } else if (name === "backImage") {
      setBackImage(null);
    } else if (name === "inProcessImage") {
      setInProcessImage(null);
    } else if (name === "images") {
      if (typeFile === "File") {
        setImages(images.filter((_, i) => i !== index));
      }
    } else if (name === "mainvideo") {
      setMainVideo(null);
    }
  };

  const removeExistingImage = (index: number, typeFile: string) => {
    console.log(index, typeFile);
    if (typeFile === "Url") {
      initialValues.existingImage = initialValues.existingImage.filter(
        (_, i) => i !== index
      );
      setInitialValues({ ...initialValues });
    }
  };

  const [value, setValue] = useState(null);

  useEffect(() => {
    if (data && id) {
      setMainImage(`${data?.url}/users/${data?.data?.media?.mainImage}`);
      setBackImage(`${data?.url}/users/${data?.data?.media?.backImage}`);
      setInProcessImage(
        `${data?.url}/users/${data?.data?.media?.inProcessImage}`
      );
      setMainVideo(`${data?.url}/videos/${data?.data?.media?.mainVideo}`);
    }
  }, [data]);

  const handleCheckArtistFee = (values) => {
    const catalogType = values.target.id;

    let updatedValues = { ...initialValues };

    if (catalogType === "subscriptionCatalog") {
      const selectedCatalog = seriesData?.subscriptionCatalog?.find(
        (item) => item?.catalogName === values.target.value
      );

      if (selectedCatalog) {
        console.log("Subscription", selectedCatalog);
        updatedValues = {
          ...updatedValues,
          artistFees: selectedCatalog.artistFees,
          // subscriptionCatalog: selectedCatalog.subscriptionCatalog,
        };
      }
    } else if (catalogType === "purchaseCatalog") {
      const selectedCatalog = seriesData?.purchaseCatalog?.find(
        (item) => item?.catalogName === values.target.value
      );

      if (selectedCatalog) {
        updatedValues = {
          ...updatedValues,
          artistFees: selectedCatalog.artistFees,
          // If necessary, update purchaseCatalog here
          // purchaseCatalog: selectedCatalog.purchaseCatalog,
        };
      }
    }

    if (JSON.stringify(updatedValues) !== JSON.stringify(initialValues)) {
      setInitialValues(updatedValues);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={true}
      >
        {({ handleSubmit, values, errors, touched, setFieldValue }) => (
          <div
            className={`${
              qrVisible ? "py-10 bg-white blur-sm" : "py-10 bg-white"
            }`}
          >
            <Header
              variant={{ size: "xl", theme: "dark", weight: "bold" }}
              className="text-black "
            >
              {t("Add Artwork")}
            </Header>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col 2xl:flex-row justify-between 2xl:items-center mt-3 2xl:mt-0 mb-4 mx-2">
                <ArtBreadcrumbs />

                <div className="flex flex-col lg:flex-row w-fit gap-4 flex-wrap mt-4 md:lg-0">
                  <h1
                    variant={{
                      fontSize: "base",
                      theme: "dark",
                      fontWeight: "500",
                    }}
                    className="cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-gray-800"
                  >
                    {t("Revalidate")}
                  </h1>

                  {query ? (
                    <h1
                      variant={{
                        fontSize: "base",
                        theme: "dark",
                        fontWeight: "500",
                      }}
                      onClick={() => handleGenerateQRCode()}
                      className="cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-gray-800"
                    >
                      {t("Generate Qr Code")}
                    </h1>
                  ) : null}

                  <h1
                    variant={{
                      fontSize: "base",
                      theme: "dark",
                      fontWeight: "500",
                    }}
                    className="cursor-pointer gap-2 bg-black text-white text-[12px] md:text-[16px] px-2 py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-gray-800"
                  >
                    Generate Certificate Of Authenticity
                  </h1>
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
                      {t("General Information")}
                    </Header>

                    <div className="mb-4">
                      <label className="block  text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                        Artwork name *
                      </label>
                      <Field
                        type="text"
                        name="artworkName"
                        id="artworkName"
                        readOnly={query ? true : false}
                        placeholder="Type artwork name here..."
                        className="w-full bg-[#F9F9FC] border  text-sm sm:text-base border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                      />
                      {touched.artworkName && errors.artworkName ? (
                        <div className="error text-red-500 mt-1 text-sm">
                          {errors.artworkName}
                        </div>
                      ) : null}
                    </div>

                    {isArtProvider === "Yes" ? (
                      <div className="mb-4">
                        <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                          Art Provider
                        </label>
                        <Field
                          as="select"
                          id="isArtProvider"
                          name="isArtProvider"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Field>
                        {touched.isArtProvider && errors.provideArtistName ? (
                          <div className="error text-red-500 mt-1 text-sm">
                            {errors.isArtProvider}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {values.isArtProvider === "yes" ? (
                      <div className="mb-4">
                        <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                          Artist name
                        </label>
                        <Field
                          type="text"
                          name="provideArtistName"
                          id="provideArtistName"
                          readOnly={query ? true : false}
                          placeholder="Type artist name here (if different from artist). . ."
                          className="w-full bg-[#F9F9FC] text-sm sm:text-base border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                        />
                        {touched.provideArtistName &&
                        errors.provideArtistName ? (
                          <div className="error text-red-500 mt-1 text-sm">
                            {errors.provideArtistName}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="mb-4 flex flex-col lg:flex-row  gap-2 w-full">
                      <div className="w-full">
                        <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                          Artwork creation year *
                        </label>

                        <Field
                          name="artworkCreationYear"
                          component={CustomYearPicker}
                          selectedYear={values.artworkCreationYear}
                          toggleCalendar={toggleCalendar}
                          showCalendar={showCalendar}
                          readOnly={query ? true : false}
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <label className="block text-sm sm:text-base text-[#203F58] font-semibold ">
                            Select Series *
                          </label>
                          <p className="text-[#5C59E8] text-sm sm:text-base flex items-center gap-[2px] cursor-pointer">
                            {/* this is commeted for adding a new series */}
                            <span className="border-b-2 border-b-[#5C59E8] ">
                              {" "}
                              <TiPlus />
                            </span>{" "}
                            <span
                              onClick={() => setIsPopupOpen(true)}
                              className={`border-b border-b-[#5C59E8] font-semibold ${
                                query ? "pointer-events-none opacity-50 " : ""
                              }`}
                            >
                              Create New Series
                            </span>
                          </p>
                        </div>

                        <SeriesPop
                          isOpen={isPopupOpen}
                          onClose={closePopup}
                          onAction={handleAction}
                          userID={userID}
                        />

                        <Field
                          as="select"
                          id="artworkSeries"
                          name="artworkSeries"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled selected>
                            Select type
                          </option>
                          {seriesData?.seriesList?.map((series, index) => (
                            <option key={index}>{series}</option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <>
                      <label className="block text-sm sm:text-base mb-2 font-semibold text-[#203F58]">
                        Artwork Description
                      </label>
                      <Field
                        as="textarea"
                        name="productDescription"
                        placeholder="Type product description here..."
                        rows={5}
                        readOnly={query ? true : false}
                        className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md  p-1 sm:p-3 outline-none"
                      />
                      {touched.productDescription &&
                      errors.productDescription ? (
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
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            {data?.data?.media?.mainImage || mainImage ? (
                              <div className="relative">
                                <img
                                  src={mainImage}
                                  alt="image"
                                  className="w-28 h-28 object-cover"
                                />
                                <span
                                  className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                    query
                                      ? "pointer-events-none opacity-50"
                                      : ""
                                  }`}
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
                            onChange={(e) =>
                              handleFileChangeBackImage(e, setBackImage)
                            }
                            className="hidden"
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            {backImage ? (
                              <div className="relative">
                                <img
                                  src={backImage}
                                  alt="image"
                                  className="w-28 h-28 object-cover"
                                />
                                <span
                                  className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                    query
                                      ? "pointer-events-none opacity-50"
                                      : ""
                                  }`}
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
                              handleFileChangeInprocessImage(
                                e,
                                setInProcessImage
                              )
                            }
                            className="hidden"
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            {inProcessImage ? (
                              <div className="relative">
                                <img
                                  src={inProcessImage}
                                  alt="image"
                                  className="w-28 h-28 object-cover"
                                />
                                <span
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                  onClick={() =>
                                    removeImage("inProcessImage", 0)
                                  }
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
                            onChange={(e) =>
                              handleFileChangeDetailsImage(e, setImages)
                            }
                            className="hidden"
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            <div className="flex gap-2 flex-wrap">
                              {images &&
                                images.length > 0 &&
                                images.map((img, i) => {
                                  return (
                                    <div key={i} className="relative">
                                      <img
                                        src={URL.createObjectURL(img)}
                                        alt="image"
                                        className="w-28 h-28 object-cover"
                                      />
                                      <span
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                                        onClick={() =>
                                          removeImage("images", i, "File")
                                        } // Remove image by index
                                      >
                                        &times;
                                      </span>
                                    </div>
                                  );
                                })}
                              {initialValues.existingImage &&
                              initialValues.existingImage.length > 0 ? (
                                initialValues.existingImage?.map((img, i) => {
                                  return (
                                    <div key={i} className="relative">
                                      <img
                                        src={`${data?.url}/users/${img}`}
                                        alt="image"
                                        className="w-28 h-28 object-cover"
                                      />
                                      <span
                                        className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                          query
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          removeExistingImage(i, "Url")
                                        }
                                      >
                                        &times;
                                      </span>
                                    </div>
                                  );
                                })
                              ) : (
                                <img
                                  src={image_icon}
                                  alt="icon"
                                  className="w-28 max-h-28 min-h-28 object-cover mb-4"
                                />
                              )}
                            </div>

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
                            onChange={(e) => handleMainVideo(e, setMainVideo)}
                            className="hidden"
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
                            {mainVideo ? (
                              <div className="relative ">
                                <video
                                  src={mainVideo}
                                  className="w-28 max-h-28 object-cover mb-4"
                                  controls
                                />
                                <span
                                  className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                    query
                                      ? "pointer-events-none opacity-50"
                                      : ""
                                  }`}
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
                              handleOtherVideo(e, setOtherVideos)
                            }
                            className="hidden"
                            disabled={query}
                          />
                          <div className="bg-[#F9F9FC]  border border-dashed py-2 sm:py-6 px-12 flex flex-col items-center">
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
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => removeVideo(i, "File")} // Custom function to remove video from state
                                  >
                                    &times;
                                  </span>
                                </div>
                              ))}
                            {initialValues.existingVideo &&
                            initialValues.existingVideo.length > 0 ? (
                              initialValues.existingVideo.map(
                                (video, i = otherVideo.length + 1) => (
                                  <div key={i} className="relative">
                                    <video
                                      src={`${data?.url}/videos/${video}`} // Use the URL for the video preview
                                      className="w-28 max-h-28 object-cover mb-4"
                                      controls
                                    />
                                    <span
                                      className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                        query
                                          ? "pointer-events-none opacity-50"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        removeExistingVideo(i, "Url")
                                      }
                                    >
                                      &times;
                                    </span>
                                  </div>
                                )
                              )
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
                      Descriptive Information & Categorization
                    </Header>

                    <Dicipline
                      query={query}
                      setArtDicipline={setArtDicipline}
                      artDicipline={artDicipline}
                    />

                    <div className="grid md:grid-cols-2 gap-3 mb-4 mt-3">
                      <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                        Artwork technic
                        <Field
                          as="select"
                          id="artworkTechnic"
                          name="artworkTechnic"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full  p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {technicLoading ? null : newTechnic &&
                            Array.isArray(newTechnic) &&
                            newTechnic.length > 0 ? (
                            newTechnic.map((item, i) => (
                              <option key={i}>{item.technicName}</option>
                            ))
                          ) : (
                            <option disabled>No technics available</option>
                          )}
                        </Field>
                      </label>

                      <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                        Artwork theme
                        <Field
                          as="select"
                          id="artworkTheme"
                          name="artworkTheme"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {themeLoading ? (
                            <option value="" disabled>
                              Loading...
                            </option>
                          ) : newTheme &&
                            Array.isArray(newTheme) &&
                            newTheme.length > 0 ? (
                            newTheme.map((item) => (
                              <option key={item.themeName}>
                                {item.themeName}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No themes available
                            </option>
                          )}
                        </Field>
                      </label>
                    </div>

                    <div className="mt-5">
                      <Select
                        options={options}
                        placeholder="Select Artwork Style"
                        isMulti
                        isDisabled={query ? true : false}
                        name="artworkStyleType"
                        value={values.artworkStyleType}
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

                    <div className="mt-3 mb-2">
                      <Select
                        options={options_1}
                        defaultValue={value}
                        placeholder="Emotions"
                        isMulti
                        isDisabled={query ? true : false}
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

                    <div className="mb-3">
                      <Select
                        options={options_2}
                        placeholder="Select Color"
                        name="colors"
                        isDisabled={query ? true : false}
                        value={values.colors}
                        onChange={(selectedOption) => {
                          const selectedValues = Array.isArray(selectedOption)
                            ? selectedOption
                            : selectedOption
                            ? [selectedOption]
                            : [];

                          setFieldValue("colors", selectedValues);
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
                    </div>
                    {/* this is for offensive  */}

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold  ">
                      Offensive
                      <Field
                        as="select"
                        id="Offensive"
                        name="offensive"
                        disabled={query}
                        className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option>Yes </option>
                        <option>No</option>
                      </Field>
                    </label>

                    {/* tags */}

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Tags Internal
                      <div className="flex flex-wrap gap-2 mt-1">
                        <input
                          type="text"
                          id="intTags"
                          name="intTags"
                          disabled={query}
                          className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none  text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          placeholder="Enter tags (e.g., #example)"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag(e);
                            }
                          }}
                        />
                      </div>
                      <div className="mt-2 mb-3">
                        {internalTags.map((tag, index) => (
                          <span
                            key={index}
                            id="intTags"
                            className="bg-blue-100 border border-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 w-fit"
                          >
                            {tag}
                            <span
                              onClick={() => handleRemoveTag(index)}
                              className="ml-2 cursor-pointer text-black"
                            >
                              X
                            </span>
                          </span>
                        ))}
                      </div>
                    </label>

                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Tags External
                      <div className="flex flex-wrap gap-2 mt-1">
                        <input
                          type="text"
                          id="extTags"
                          name="extTags"
                          disabled={query}
                          className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          placeholder="Enter tags (e.g., #example)"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddExternalTag(e);
                            }
                          }}
                        />
                      </div>
                      <div className="mt-2 mb-3">
                        {externalTags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 border border-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 w-fit"
                          >
                            {tag}
                            <span
                              onClick={() => handleRemoveExternalTag(index)}
                              className="ml-2 cursor-pointer text-black"
                            >
                              X
                            </span>
                          </span>
                        ))}
                      </div>
                    </label>

                    <div className=" md:grid-cols-2 gap-3 mt-4 mb-4">
                      <label className="text-[#203F58] font-semibold">
                        Material
                        <Field
                          as="select"
                          id="Material"
                          name="material"
                          disabled={query}
                          className="bg-[#F9F9FC]  mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          <option>Paper</option>
                          <option>Watercolor Paper</option>
                          <option>Mixed Media Paper</option>
                          <option>Glaze Paper</option>
                          <option>Drawing Paper</option>
                        </Field>
                      </label>
                    </div>

                    <div className="grid grid-cols-4 mb-4 gap-3">
                      {artwork_orientation?.map((field) => (
                        <span key={field.name}>
                          <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                            {field.label}
                          </label>
                          <Field
                            type="text"
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder}
                            readOnly={query ? true : false}
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
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
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
                          readOnly={query ? true : false}
                          placeholder="Type Hanging description here. . .. . ."
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
                        ></Field>
                      </label>

                      <label className="text-[#203F58] text-sm sm:text-bas  font-semibold ">
                        Framed
                        <Field
                          as="select"
                          id="Farmed"
                          name="framed"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
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
                          readOnly={query ? true : false}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 pb-10 "
                        ></Field>
                      </label>

                      <div className="grid grid-cols-3 mb-4 gap-3 ">
                        {Framed_dimension?.map((field) => (
                          <span key={field.name}>
                            <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                              {field.label} (cm)
                            </label>
                            <Field
                              type="text"
                              name={field.name}
                              id={field.name}
                              readOnly={query ? true : false}
                              placeholder={field.placeholder}
                              className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                            />
                          </span>
                        ))}
                      </div>
                      <label className="text-[#203F58] text-sm sm:text-base font-semibold  ">
                        Artwork orientation
                        <Field
                          as="select"
                          id="artworkOrientation"
                          name="artworkOrientation"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          <option>Square </option>
                          <option>Rectengle</option>
                          <option>Circle</option>
                          <option>Star</option>
                        </Field>
                      </label>
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
                      Commercialization
                    </Header>

                    <div className="flex border-b  border-gray-300">
                      <span
                        onClick={() => setActiveTab("subscription")}
                        className={`py-2 font-bold ${
                          activeTab === "subscription"
                            ? "border-b-4 border-black"
                            : "text-gray-500"
                        }`}
                      >
                        Subscription
                      </span>
                      <span
                        onClick={() => setActiveTab("purchase")}
                        className={`py-2 mx-8 font-bold ${
                          activeTab === "purchase"
                            ? "border-b-4 border-black"
                            : "text-gray-500"
                        }`}
                      >
                        Purchase
                      </span>
                    </div>

                    <div className="">
                      {activeTab === "subscription" && (
                        <>
                          <div className="mt-4 space-y-2">
                            <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                              Subscription Catalog
                              <Field
                                as="select"
                                id="subscriptionCatalog"
                                name="subscriptionCatalog"
                                disabled={query}
                                onChange={(e) => {
                                  setFieldValue(
                                    "subscriptionCatalog",
                                    e.target.value
                                  );
                                  handleCheckArtistFee(e);
                                }}
                                // value={values.subscriptionCatalog}
                                className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                              >
                                <option value="" disabled>
                                  Select
                                </option>

                                {seriesData?.subscriptionCatalog?.map(
                                  (series, index) => (
                                    <option
                                      key={index}
                                      value={series?.catalogName}
                                    >
                                      {series?.catalogName}
                                    </option>
                                  )
                                )}
                              </Field>
                            </label>
                          </div>

                          <div className="mt-4 space-y-2">
                            <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                              Purches Option
                              <Field
                                as="select"
                                id="purchaseOption"
                                name="purchaseOption"
                                disabled={query}
                                className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </label>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="py-4">
                      {activeTab === "purchase" && (
                        <div>
                          <div className="space-y-2">
                            <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                              Purchase Catalog
                              <Field
                                as="select"
                                id="purchaseCatalog"
                                name="purchaseCatalog"
                                disabled={query}
                                onChange={(e) => {
                                  setFieldValue(
                                    "purchaseCatalog",
                                    e.target.value
                                  );
                                  handleCheckArtistFee(e);
                                }}
                                className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {seriesData?.purchaseCatalog?.map(
                                  (item, index) => (
                                    <option key={index}>
                                      {item?.catalogName}
                                    </option>
                                  )
                                )}
                              </Field>
                            </label>
                          </div>

                          <div className="mt-4">
                            <label className="text-[#203F58] sm:text-base font-semibold ">
                              Purchase Type
                              <Field
                                as="select"
                                id="purchaseType"
                                name="purchaseType"
                                placeholder="Select"
                                disabled={query}
                                className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option>Fixed Price</option>
                                <option>Downword Offer</option>
                                <option>Upword Offer</option>
                                <option>Price By Request</option>
                              </Field>
                            </label>
                          </div>

                          {/* <div className="mt-4">
                            <label className="text-[#203F58] sm:text-base font-semibold ">
                              Price Request
                              <Field
                                as="select"
                                id="priceRequest"
                                name="priceRequest"
                                placeholder="Select"
                                disabled={query}
                                className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </label>
                          </div> */}
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
                      Pricing
                    </Header>

                    {values.purchaseType === "Downword Offer" ||
                    values.purchaseType === "Fixed Price" ||
                    values.purchaseType === "Price By Request" ? (
                      <span>
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                          Currency
                          <Field
                            as="select"
                            id="currency"
                            name="currency"
                            disabled={query}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option>EUR</option>
                            <option>USD</option>
                            <option>GBP</option>
                          </Field>
                        </label>
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                          Base Price{" "}
                        </label>
                        <div className="flex space-x-2">
                          <Field
                            type="text"
                            name="basePrice"
                            id="basePrice"
                            placeholder="€ Type base price here..."
                            value={values.basePrice}
                            readOnly={query ? true : false}
                            className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </div>
                        {touched.basePrice && errors.basePrice ? (
                          <div className="error text-red-500">
                            {errors.basePrice}
                          </div>
                        ) : null}

                        {/* Discount Percentage Field */}
                        <div
                          className={`${
                            values.purchaseType === "Downword Offer"
                              ? "grid md:grid-cols-2 gap-3"
                              : "w-full"
                          } grid md:grid-cols-2 gap-3`}
                        >
                          <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                            Discount Percentage
                            <Field
                              type="text"
                              name="dpersentage"
                              id="dpersentage"
                              placeholder="$ 00  %"
                              readOnly={query ? true : false}
                              value={values.dpersentage}
                              className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                            />
                          </label>

                          {values.purchaseType === "Downword Offer" ? (
                            <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                              Accpet Minimum Price
                              <Field
                                type="text"
                                name="acceptOfferPrice"
                                id="acceptOfferPrice"
                                placeholder="Eur "
                                readOnly={query ? true : false}
                                value={values.acceptOfferPrice}
                                className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                              />
                            </label>
                          ) : null}
                        </div>
                      </span>
                    ) : (
                      <span>
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                          Currency
                          <Field
                            as="select"
                            id="currency"
                            name="currency"
                            disabled={query}
                            className="bg-[#F9F9FC] mb-3 mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option>EUR</option>
                            <option>USD</option>
                            <option>GBP</option>
                          </Field>
                        </label>

                        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                          Accpet Minimum Price
                          <Field
                            type="text"
                            name="acceptOfferPrice"
                            id="acceptOfferPrice"
                            placeholder="Enter Amount"
                            readOnly={query ? true : false}
                            value={values.acceptOfferPrice}
                            className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </label>
                      </span>
                    )}

                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                        Artist Base Fees
                        <div className="flex space-x-2">
                          <Field
                            id="artistFees"
                            name="artistFees"
                            placeholder="€ Artist Base Fees"
                            readOnly={true}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </div>
                      </label>

                      {/* VAT Amount Field */}
                      <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                        VAT Amount (%)
                        <Field
                          type="text"
                          id="vatAmount"
                          name="vatAmount"
                          placeholder="Type VAT amount..."
                          value={values.vatAmount}
                          readOnly={true}
                          className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />
                        {touched.vatAmount && errors.vatAmount ? (
                          <div className="error text-red-500">
                            {errors.vatAmount}
                          </div>
                        ) : null}
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
                      Inventory & Shipping
                    </Header>

                    <div className="grid md:grid-cols-2 gap-3 items-center">
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
                            readOnly={query ? true : false}
                            className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </span>
                      ))}

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
                          readOnly={query ? true : false}
                          className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                        />
                      </span>
                    </div>

                    <div className="">
                      <label className="text-[#203F58] sm:text-base font-semibold ">
                        Package Material
                        <Field
                          as="select"
                          id="packageMaterial"
                          name="packageMaterial"
                          placeholder="Select"
                          disabled={query}
                          className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option>Plastic</option>
                          <option>Corton</option>
                          <option>Tube</option>
                          <option>Wood</option>
                        </Field>
                      </label>
                    </div>

                    <div className="flex  items-center justify-between mb-4 ">
                      {package_dimension.map((field) => (
                        <span key={field.name}>
                          <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                            {field.label}
                          </label>
                          <Field
                            type="text"
                            name={field.name}
                            id={field.name}
                            readOnly={query ? true : false}
                            placeholder={field.placeholder}
                            className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                          />
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center text-sm">
                        <Field
                          type="checkbox"
                          name="comingSoon"
                          checked={values.comingSoon}
                          onChange={() =>
                            setFieldValue("comingSoon", !values.comingSoon)
                          }
                          className="mr-2"
                        />
                        <span className="p-1 text-[14px] text-[#203F58] font-semibold">
                          Coming Soon
                        </span>
                      </label>
                      {values.comingSoon && (
                        <div className="text-red-500 mt-2">
                          This option is coming soon!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* ------------------------ */}

                <ArtworkRight query={query} />
              </div>

              <div className="  bg-white pt-40 flex flex-col sm:flex-row items-center justify-between border border-dotted rounded  py-2 w-full">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Product Completion</span>
                  <span className="text-red-500 bg-[#FDE7E9] px-2 py-1 text-sm rounded">
                    {progress}%
                  </span>
                </div>

                {!query ? (
                  <div className="flex space-x-2 ">
                    <span
                      onClick={() => handleNavigate()}
                      className="border border-[#7E98B5] rounded px-4 py-3 text-sm font-semibold cursor-pointer"
                    >
                      ✕ Cancel
                    </span>

                    <div className="flex justify-end ">
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
                ) : null}
              </div>
            </form>
          </div>
        )}
      </Formik>
      {qrVisible && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 w-[30vw] h-[40vh]">
          <h1 className="font-bold text-lg text-center mt-5">Qr Code</h1>
          <span
            onClick={() => setQrVisible(false)}
            className=" absolute right-5 top-5 cursor-pointer"
          >
            <BsBackspace size="2em" />{" "}
          </span>

          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 200,
              width: "100%",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={currentPageUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddArtwork;
