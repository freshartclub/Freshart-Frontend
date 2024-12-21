// import { Field, Formik } from "formik";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsBackspace } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import QRCode from "react-qr-code";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import image_icon from "../../../assets/image_icon.png";
import logoIcon from "../../../assets/loginlogo.png";
import video_icon from "../../../assets/video_icon.png";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import P from "../../ui/P";
import {
  artwork_orientation,
  Framed_dimension,
  package_dimension,
  shipping_inventry,
} from "../../utils/mockData";
import ArtBreadcrumbs from "./ArtBreadcrumb";
import ArtworkRight from "./ArtworkRight";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import { useGetTechnic } from "./http/useGetTechnic";
import { useGetTheme } from "./http/useGetTheme";
import usePostArtWorkMutation from "./http/usePostArtwork";

import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  RenderAllPicklists,
  RenderAllSinglePicklist,
} from "../../utils/RenderAllPicklist";
import { useGetArtistDetails } from "../ArtistEditProfile/http/useGetDetails";
import Dicipline from "./Dicipline";
import { useGetArtWorkStyle } from "./http/useGetArtWorkStyle";
import { useGetSeries } from "./http/useGetSeries";
import { SeriesPop } from "./SeriesPop";
import { Controller, useForm } from "react-hook-form";
import html2canvas from "html2canvas";
import { AiOutlineClose } from "react-icons/ai";
import useDeleteSeriesMutation from "./http/useDeleteSeries";
import toast from "react-hot-toast";

const AddArtwork = () => {
  const [progress, setProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState("");
  const [isLoadingPdf, setIsLoadingPdf] = useState(false); // State to track loading
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogPrice, setCatalogPrice] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

    touched,
    control,
    setValue,
    getValues,
    watch,
    setError,
    trigger,
    clearErrors,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    // resolver: yupResolver(validationSchema),
  });

  const CustomYearPicker = ({
    selectedYear,
    toggleCalendar,
    showCalendar,

    field,
  }) => {
    // Handle year selection and update form value manually
    const handleYearSelect = (year) => {
      // Manually update the value in React Hook Form's form state
      // console.log(field);
      setValue("artworkCreationYear", year);
      toggleCalendar(); // Optionally close calendar after selecting year
    };

    return (
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

                handleYearSelect(year); // Update the form value manually
              }}
              showNeighboringMonth={false}
              value={selectedYear ? new Date(selectedYear, 0) : new Date()}
            />
          </div>
        )}
      </div>
    );
  };

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
  const [purchaseCatlogValue, setPurchaseCatlogValue] = useState(null);
  const [subscriptionCatlogValue, setsubscriptionCatlogValue] = useState(null);
  const [hasBackImg, setHasBackImg] = useState(true);
  const [hasInProcessImg, setHasInProcessImg] = useState(true);
  const [hasMainVideo, setHasMainVideo] = useState(true);
  const [hasMainImg, setHasMainImg] = useState(true);
  const qrCodeRef = useRef(null);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  const vatAmount = userData?.data?.artist?.invoice?.vatAmount;
  const isArtProvider = userData?.data?.artist?.commercilization?.artProvider;

  const { data: technicData, isLoading: technicLoading } = useGetTechnic();

  const { data: themeData, isLoading: themeLoading } = useGetTheme();

  const { mutate: seriesDelete, isPending: isSeriesPendingDelete } =
    useDeleteSeriesMutation();

  const { data: artworkStyleList, isLoading: artworkStyleloading } =
    useGetArtWorkStyle();

  const {
    data: seriesData,
    isLoading: seriesLoading,
    refetch,
  } = useGetSeries(userID);

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
    offensive: "No",
    weight: "",
    length: "",
    height: "",
    width: "",
    emotions: [],
    basePrice: "",
    discounttype: "",
    discountAcceptation: "",
    textclass: "",

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
    purchaseType: {},
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

    extTags: [],
  });

  useEffect(() => {
    refetch();
  }, [userID]);

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

  const getOutDiscipline = seriesData?.discipline?.map(
    (item, i) => item?.discipline
  );

  const getOutStyle = seriesData?.discipline?.map((item, i) => item?.style);

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

  const newArtworkStyle =
    seriesData?.discipline?.find((item) => item?.discipline === artDicipline)
      ?.style || [];

  useEffect(() => {
    if (id) {
      setArtDicipline(data?.data?.discipline?.artworkDiscipline || ""),
        setActiveTab(data?.data?.commercialization?.activeTab || "");
      setInternalTags(data?.data?.tags?.intTags || []);
      setExternalTags(data?.data?.tags?.extTags || []);
      setCatalogPrice(data?.data?.pricing?.artistFees || 0);
      setValue("currency", "EUR");
      setValue(
        "purchaseCatalog",
        data?.data?.commercialization?.purchaseCatalog || ""
      );

      setValue("availableTo", data?.data?.restriction?.availableTo);
      setValue("collectionList", data?.data?.collectionList || "");
      setValue(
        "discountAcceptation",
        data?.data?.restriction?.discountAcceptation
      );
      setValue("provideArtistName", data?.data?.provideArtistName || "");
      setValue("artworkSeries", data?.data?.artworkSeries);
      setValue("artworkCreationYear", data?.data?.artworkCreationYear || "");
      setValue("artworkName", data?.data?.artworkName || "");
      setValue("productDescription", data?.data?.productDescription || "");

      setValue(
        "artworkTechnic",
        data?.data?.additionalInfo?.artworkTechnic || ""
      );
      setValue("artworkTheme", data?.data?.additionalInfo?.artworkTheme || "");
      setValue(
        "artworkOrientation",
        data?.data?.additionalInfo?.artworkOrientation || ""
      );

      setValue("material", data?.data?.additionalInfo?.material || "");
      setValue("weight", data?.data?.additionalInfo?.weight || "");
      setValue("length", data?.data?.additionalInfo?.length || "");
      setValue("height", data?.data?.additionalInfo?.height || "");
      setValue("width", data?.data?.additionalInfo?.width || "");
      setValue(
        "hangingAvailable",
        data?.data?.additionalInfo?.hangingAvailable || ""
      );
      setValue(
        "hangingDescription",
        data?.data?.additionalInfo?.hangingDescription || ""
      );
      setValue("framed", data?.data?.additionalInfo?.framed || "");

      setValue(
        "framedDescription",
        data?.data?.additionalInfo?.framedDescription || ""
      );
      setValue("frameHeight", data?.data?.additionalInfo?.frameHeight || "");
      setValue("frameLength", data?.data?.additionalInfo?.frameLength || "");
      setValue("frameWidth", data?.data?.additionalInfo?.frameWidth || "");

      setValue(
        "artworkStyleType",
        data?.data?.additionalInfo?.artworkStyle?.map((opt) => ({
          value: opt,
          label: opt,
        })) || ""
      );
      setValue(
        "emotions",
        data?.data?.additionalInfo?.emotions?.map((opt) => ({
          value: opt,
          label: opt,
        })) || ""
      );
      setValue(
        "colors",
        data?.data?.additionalInfo?.colors?.map((opt) => ({
          value: opt,
          label: opt,
        })) || ""
      );

      setValue("offensive", data?.data?.additionalInfo?.offensive || "");

      setValue(
        "purchaseCatalog",
        data?.data?.commercialization?.purchaseCatalog || ""
      );
      setValue("purchaseType", data?.data?.commercialization?.purchaseType);

      setValue(
        "downwardOffer",
        data?.data?.commercialization?.downwardOffer || ""
      );
      setValue("upworkOffer", data?.data?.commercialization?.upworkOffer || "");
      setValue("acceptOfferPrice", data?.data?.pricing?.acceptOfferPrice || "");
      setValue(
        "priceRequest",
        data?.data?.commercialization?.priceRequest || ""
      );
      setValue(
        "artistbaseFees",
        data?.data?.commercialization?.artistbaseFees || ""
      );
      setValue("basePrice", data?.data?.pricing?.basePrice || "");
      setValue("dpersentage", data?.data?.pricing?.dpersentage || 0);

      setValue("pCode", data?.data?.inventoryShipping?.pCode || "");
      setValue("location", data?.data?.inventoryShipping?.location || "");

      setValue("artworkTags", data?.data?.discipline?.artworkTags || []);
      setValue("existingVideo", data?.data?.media?.otherVideo || []);
      setValue("existingImage", data?.data?.media?.images || []);
      setValue("promotion", data?.data?.promotions?.promotion || "");
      setValue("promotionScore", data?.data?.promotions?.promotionScore || "");
      setValue("isArtProvider", data?.data?.isArtProvider || "");
      setValue(
        "subscriptionCatalog",
        data?.data?.commercialization?.subscriptionCatalog || ""
      );
      setValue(
        "purchaseOption",
        data?.data?.commercialization?.purchaseOption || ""
      );

      setValue("intTags", data?.data?.intTags || []);
      setValue("extTags", data?.data?.extTags || []);
      setValue("currency", data?.data?.pricing?.currency || "EUR");
      setValue(
        "packageMaterial",
        data?.data?.inventoryShipping?.packageMaterial || ""
      );
      setValue(
        "packageWeight",
        data?.data?.inventoryShipping?.packageWeight || ""
      );
      setValue(
        "packageHeight",
        data?.data?.inventoryShipping?.packageHeight || ""
      );
      setValue(
        "packageLength",
        data?.data?.inventoryShipping?.packageLength || ""
      );
      setValue(
        "packageWidth",
        data?.data?.inventoryShipping?.packageWidth || ""
      );
      setValue(
        "comingSoon",
        data?.data?.inventoryShipping?.comingSoon || false
      );
    }
  }, [id, data, inProcessImage, setInitialValues, seriesData]);

  const url = `https://dev.freshartclub.com/discover_more?id=${id}?referral=${"QR"}`;

  const currentPageUrl = url;

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

  const picklist = RenderAllPicklists([
    "Commercialization Options",
    "Currency",
    "Package Material",
    "Emotions",
    "Colors",
    "Artwork Available To",
    "Artwork Discount Options",
  ]);

  const dPicklist = RenderAllSinglePicklist([
    "Artwork Discount Options",
    "Artwork Available To",
  ]);

  const picklistMapD = dPicklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const purOption = picklistMap["Commercialization Options"];
  const currency = picklistMap["Currency"];
  const packMaterial = picklistMap["Package Material"];
  const emotions = picklistMap["Emotions"];
  const colors = picklistMap["Colors"];
  const availableTo = picklistMap["Artwork Available To"];
  const discountAcceptation = picklistMap["Artwork Discount Options"];

  const handleNavigate = () => {
    navigate("/artist-panel/artwork");
    window.scrollTo(0, 0);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      setMainImage(imageUrl);
      setHasMainImg(true);
    }
  };

  const handleFileChangeBackImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBackImage(file);
      const imageUrl = URL.createObjectURL(file);
      setBackImage(imageUrl);
      setHasBackImg(true);
    }
  };

  const handleFileChangeInprocessImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewInProcessImage(file);
      const imageUrl = URL.createObjectURL(file);
      setInProcessImage(imageUrl);
      setHasInProcessImg(true);
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
      setHasMainVideo(true);
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

  // const watchPackageHeight = watch("packageHeight");
  // const watchPackageWeight = watch("packageWeight");
  // const watchPackageWidth = watch("packageWidth");
  // const watchPackageDepth = watch("packageLength");
  // const watchBasePrice = watch("basePrice");

  const [packageHeightError, setPackageHeightError] = useState(null);
  const [packageWidthError, setPackageWidthError] = useState(null);
  const [packageDepthError, setPackageDepthError] = useState(null);
  const [basePriceError, setBasePriceError] = useState(null);
  const [packageWeightError, setPackageWeightError] = useState(null);

  const packageHeight = getValues("packageHeight");
  const packageWeight = getValues("packageWeight");
  const packageWidth = getValues("packageWidth");
  const packageDepth = getValues("packageLength");
  const basePrice = parseInt(getValues("basePrice"));

  useEffect(() => {
    if (activeTab === "purchase") {
      const purchaseItem = seriesData?.purchaseCatalog?.find(
        (item) => item?._id === getValues("purchaseCatalog")
      );

      if (purchaseItem && purchaseItem.details) {
        const { maxHeight, maxWeight, maxWidth, maxDepth, maxPrice } =
          purchaseItem.details;

        setBasePriceError(maxPrice ? maxPrice : null);
        setPackageHeightError(maxHeight ? maxHeight : null);
        setPackageWeightError(maxWeight ? maxWeight : null);
        setPackageWidthError(maxWidth ? maxWidth : null);
        setPackageDepthError(maxDepth ? maxDepth : null);
      }
    } else if (activeTab === "subscription") {
      const subscriptionItem = seriesData?.purchaseCatalog?.find(
        (item) => item?._id === getValues("subscriptionCatalog")
      );

      if (subscriptionItem && subscriptionItem.details) {
        const { maxHeight, maxWeight, maxWidth, maxDepth, maxPrice } =
          subscriptionItem.details;

        setBasePriceError(maxPrice ? maxPrice : null);
        setPackageHeightError(maxHeight ? maxHeight : null);
        setPackageWeightError(maxWeight ? maxWeight : null);
        setPackageWidthError(maxWidth ? maxWidth : null);
        setPackageDepthError(maxDepth ? maxDepth : null);

        if (maxHeight !== undefined && packageHeight >= maxHeight) {
          setPackageHeightError(maxHeight);
        }

        if (maxWeight !== undefined && packageWeight >= maxWeight) {
          setPackageWeightError(maxWeight);
        }

        if (maxWidth !== undefined && packageWidth >= maxWidth) {
          setPackageWidthError(maxWidth);
        }

        if (maxDepth !== undefined && packageDepth >= maxDepth) {
          setPackageDepthError(maxDepth);
        }

        if (maxPrice !== undefined && basePrice >= maxPrice) {
          setBasePriceError(maxPrice);
        }
      }
    }
  }, [
    activeTab,
    watch("purchaseCatalog"),
    getValues("basePrice"),
    watch("subscriptionCatalog"),
    getValues("subscriptionCatalog"),
    watch("purchaseType"),
    watch("purchaseOption"),
  ]);

  const onSubmit = handleSubmit(async (values: any) => {
    console.log("onSubmit", values);

    if (
      values.basePrice === basePriceError &&
      values.packageDepth === packageDepthError &&
      values.packageHeight === packageHeightError &&
      values.packageWidth === packageWidthError &&
      values.packageWeight === packageWeightError
    ) {
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
      values.artworkDiscipline = artDicipline;
      values.vatAmount = vatAmount;
      values.artistFees = catalogPrice;

      values.hasMainImg = hasMainImg;
      values.hasBackImg = hasBackImg;
      values.hasInProcessImg = hasInProcessImg;
      values.hasMainVideo = hasMainVideo;

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        const value = values[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              console.log(key, value, "this is from formdata loop");
              formData.append(key, JSON.stringify(item));
            }
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
          console.log(key, value, "this is from outside loop");
        }
      });

      for (let [name, value] of formData.entries()) {
        console.log(name, value);
      }

      const newData = {
        id: id,
        data: formData,
      };

      mutate(newData);
    } else {
      return toast("Please Check Base Price & Package Dimesions Values");
    }
  });

  useEffect(() => {
    watch("colors");
    watch("artworkStyleType");
    watch("emotions");
    watch("isArtProvider");
    watch("hangingAvailable");
    watch("artworkSeries");
    watch("purchaseType");
    watch("existingImage");
    watch("packageHeight");
    watch("packageWeight");
    watch("packageWidth");
    watch("packageLength");
    watch("basePrice");
  }, []);

  // console.log(isValid);
  // console.log(errors);
  // console.log(getValues("basePrice"));

  // console.log(packageHeightError);

  const removeImage = (name: string, index: number, typeFile: string) => {
    if (name === "mainImage") {
      setMainImage(null);
      setHasMainImg(false);
    } else if (name === "backImage") {
      setHasBackImg(false);
      setBackImage(null);
    } else if (name === "inProcessImage") {
      setHasInProcessImg(false);
      setInProcessImage(null);
    } else if (name === "images") {
      if (typeFile === "File") {
        setImages(images.filter((_, i) => i !== index));
      }
    } else if (name === "mainvideo") {
      setHasMainVideo(false);
      setMainVideo(null);
    }
  };

  const newImages = getValues("existingImage");

  const removeExistingImage = (index: number, typeFile: string) => {
    console.log(index, typeFile);
    if (typeFile === "Url") {
      const filteredimg = newImages.filter((_, i) => i !== index);

      setValue("existingImage", filteredimg);
    }
  };

  useEffect(() => {
    if (data && id) {
      setMainImage(
        data?.data?.media?.mainImage
          ? `${data?.url}/users/${data?.data?.media?.mainImage}`
          : null
      );
      setBackImage(
        data?.data?.media?.backImage
          ? `${data?.url}/users/${data?.data?.media?.backImage}`
          : null
      );
      setInProcessImage(
        data?.data?.media?.inProcessImage
          ? `${data?.url}/users/${data?.data?.media?.inProcessImage}`
          : null
      );
      setMainVideo(
        data?.data?.media?.mainVideo
          ? `${data?.url}/videos/${data?.data?.media?.mainVideo}`
          : null
      );
    }
  }, [data]);

  const handleCheckArtistFee = (values) => {
    const catalogType = values.target.id;
    const catalogValue = values.target.value;

    let updatedValues = { ...initialValues };

    if (catalogType === "subscriptionCatalog") {
      const selectedCatalog = seriesData?.subscriptionCatalog?.find(
        (item) => item?._id === catalogValue
      );
      setCatalogPrice(selectedCatalog?.artistFees);
    } else if (catalogType === "purchaseCatalog") {
      const selectedCatalog = seriesData?.purchaseCatalog?.find(
        (item) => item?._id === catalogValue
      );

      setCatalogPrice(selectedCatalog?.artistFees);
    }

    if (JSON.stringify(updatedValues) !== JSON.stringify(initialValues)) {
      setInitialValues(updatedValues);
    }
  };

  const handleCopy = () => {
    const copyText = document.getElementById("linkInput");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      setCopySuccess("Link copied!");
    } catch (err) {
      setCopySuccess("Failed to copy link");
    }
  };

  const handleDownloadPDF = async () => {
    setIsLoadingPdf(true);

    try {
      const canvas = await html2canvas(qrCodeRef.current);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      setErrorMessage("Failed to download QR code.");
    }

    setIsLoadingPdf(false);
  };

  const seriesOptions = seriesData?.seriesList?.map((item, i) => item);

  const handleSelectOption = (selectedOption) => {
    if (selectedOption) {
      setValue("artworkSeries", selectedOption);
    }
  };

  const handleRemoveSeries = (value) => {
    try {
      seriesDelete(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`${qrVisible ? "py-10 bg-white blur-sm" : "py-10 bg-white"}`}
      >
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="text-black "
        >
          {t("Add Artwork")}
        </Header>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col 2xl:flex-row justify-between 2xl:items-center mt-3 2xl:mt-0 mb-4 mx-2">
            <ArtBreadcrumbs />

            <div className="flex flex-col lg:flex-row w-fit gap-4 flex-wrap mt-4 md:lg-0">
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
                {t("Generate Certificate Of Authenticity")}
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
                    {t("Artwork Name *")}
                  </label>
                  <input
                    {...register("artworkName", {
                      required: "Artwork Name is required",
                    })}
                    type="text"
                    id="artworkName"
                    readOnly={query ? true : false}
                    placeholder="Type artwork name here..."
                    className="w-full bg-[#F9F9FC] border text-sm sm:text-base border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                  />
                  {errors.artworkName ? (
                    <div className="error text-red-500 mt-1 text-sm">
                      {errors.artworkName.message}
                    </div>
                  ) : null}
                </div>

                {getValues("isArtProvider") === "Yes" ? (
                  <div className="mb-4">
                    <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      {t("Art Provider")}
                    </label>
                    <select
                      {...register("isArtProvider")}
                      as="select"
                      id="isArtProvider"
                      name="isArtProvider"
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="" disabled>
                        {t("Select")}
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {touched.isArtProvider && errors.provideArtistName ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.isArtProvider}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {getValues("isArtProvider") === "yes" ? (
                  <div className="mb-4">
                    <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      {t("Artist name")}
                    </label>
                    <input
                      type="text"
                      {...register("provideArtistName")}
                      name="provideArtistName"
                      id="provideArtistName"
                      readOnly={query ? true : false}
                      placeholder="Type artist name here (if different from artist). . ."
                      className="w-full bg-[#F9F9FC] text-sm sm:text-base border border-gray-300 rounded-md p-1 sm:p-3 outline-none"
                    />
                    {/* {touched.provideArtistName && errors.provideArtistName ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.provideArtistName}
                      </div>
                    ) : null} */}
                  </div>
                ) : null}

                <div className="mb-4 flex flex-col lg:flex-row  gap-2 w-full">
                  <div className="w-full">
                    <label className="block text-sm sm:text-base text-[#203F58] font-semibold mb-2">
                      {t("Artwork Creation Year ")}
                    </label>

                    <Controller
                      name="artworkCreationYear"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomYearPicker
                          {...field}
                          selectedYear={field.value}
                          toggleCalendar={toggleCalendar}
                          showCalendar={showCalendar}
                        />
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm sm:text-base text-[#203F58] font-semibold ">
                        {t("Select Series")}
                      </label>
                      <p className="text-[#5C59E8] text-sm sm:text-base flex items-center gap-[2px] cursor-pointer">
                        <span onClick={() => setIsPopupOpen(true)}>
                          <TiPlus size="1.2em" />
                        </span>
                      </p>
                    </div>

                    <SeriesPop
                      isOpen={isPopupOpen}
                      onClose={closePopup}
                      onAction={handleAction}
                    />

                    <div className="relative w-full">
                      <div className="flex flex-col mb-1">
                        {/* Display the selected value as an input field */}
                        <input
                          {...register("artworkSeries", {
                            required: "Series is required",
                          })}
                          value={getValues("artworkSeries")}
                          type="text"
                          readOnly="true"
                          className="w-full bg-[#F9F9FC] border cursor-pointer  border-gray-300 rounded-md  p-1 sm:p-3 outline-none text-sm sm:text-base"
                          onClick={handleDropDown}
                          autoComplete="off"
                          placeholder="Select Series"
                        />
                      </div>

                      {/* Display the dropdown options if it's open */}
                      {isDropdownOpen && !query && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                          <ul className="max-h-60 overflow-y-auto flex flex-col gap-2 p-2">
                            {seriesOptions.map((option) => (
                              <div className="flex justify-between  ">
                                <li
                                  key={option.value}
                                  onClick={() => {
                                    handleDropDown();
                                    handleSelectOption(option);
                                  }}
                                  className={`flex justify-between w-full items-center py-1 px-2 text-sm cursor-pointer hover:bg-blue-100 `}
                                >
                                  <span className="cursor-pointer w-full">
                                    {option}
                                  </span>
                                </li>
                                <span
                                  onClick={() => handleRemoveSeries(option)}
                                  className="cursor-pointer  bg-black px-2 rounded-md text-white"
                                >
                                  Delete
                                </span>
                              </div>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <>
                  <label className="block text-sm sm:text-base mb-2 font-semibold text-[#203F58]">
                    {t("Artwork Description")}
                  </label>
                  <textarea
                    {...register("productDescription")}
                    rows={6}
                    name="productDescription"
                    placeholder="Type product description here..."
                    readOnly={query ? true : false}
                    className="w-full  bg-[#F9F9FC] border border-gray-300 rounded-md  p-1 sm:p-3 outline-none"
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
                        {t("Main Photo")}
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
                                query ? "pointer-events-none opacity-50" : ""
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document.querySelector("#main-photo-input").click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
                                query ? "pointer-events-none opacity-50" : ""
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document.querySelector("#back-photo-input").click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
                        onChange={(e) =>
                          handleFileChangeInprocessImage(e, setInProcessImage)
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document
                              .querySelector("#inprocess-photo-input")
                              .click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Image")}
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
                        {t("Details Photos (max 3 images)")}
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
                          {getValues("existingImage") &&
                          getValues("existingImage").length > 0 ? (
                            getValues("existingImage")?.map((img, i) => {
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document
                              .querySelector("#details-photo-input")
                              .click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Images")}
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
                        {t("Main Video")}
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
                              className="w-28 max-h-32 object-cover mb-4"
                              controls
                            />
                            <span
                              className={`absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
                                query ? "pointer-events-none opacity-50" : ""
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document.querySelector("#main-video-input").click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
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
                                  onClick={() => removeExistingVideo(i, "Url")}
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
                          {t("Drag and drop image here, or click add image")}
                        </P>
                        <span
                          onClick={() =>
                            document.querySelector("#other-video-input").click()
                          }
                          className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                        >
                          {t("Add Videos")}
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
                  <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                    {t("Artwork Technic *")}
                    <select
                      {...register("artworkTechnic", {
                        required: "ArtworkTechnic is required",
                      })}
                      as="select"
                      id="artworkTechnic"
                      // name="artworkTechnic"
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full  p-1 sm:p-2.5 "
                    >
                      <option value="">Select type</option>
                      {technicLoading ? null : newTechnic &&
                        Array.isArray(newTechnic) &&
                        newTechnic.length > 0 ? (
                        newTechnic.map((item, i) => (
                          <option key={i}>{item.technicName}</option>
                        ))
                      ) : (
                        <option disabled>No technics available</option>
                      )}
                    </select>
                    {errors.artworkTechnic ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkTechnic.message}
                      </div>
                    ) : null}
                  </label>

                  <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                    Artwork theme *
                    <select
                      as="select"
                      id="artworkTheme"
                      {...register("artworkTheme", {
                        required: "Artwork theme is required",
                      })}
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">Select type</option>
                      {themeLoading ? (
                        <option value="" disabled>
                          Loading...
                        </option>
                      ) : newTheme &&
                        Array.isArray(newTheme) &&
                        newTheme.length > 0 ? (
                        newTheme.map((item) => (
                          <option key={item.themeName}>{item.themeName}</option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No themes available
                        </option>
                      )}
                    </select>
                    {errors.artworkTheme ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkTheme.message}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="mt-5">
                  <Select
                    options={newArtworkStyle?.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    placeholder="Select Artwork Style"
                    isMulti
                    isDisabled={query ? true : false}
                    value={getValues("artworkStyleType")}
                    {...register("artworkStyleType")}
                    onChange={(selectedOptions) =>
                      setValue("artworkStyleType", selectedOptions)
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
                  {errors.artworkStyleType ? (
                    <div className="error text-red-500 mt-1 text-sm">
                      {errors.artworkStyleType.message}
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 mb-2">
                  <Select
                    options={emotions ? emotions : []}
                    placeholder="Emotions"
                    isMulti
                    isDisabled={query ? true : false}
                    {...register("emotions", {
                      required: "Emotions are required",
                    })}
                    value={getValues("emotions")}
                    onChange={(selectedOptions) =>
                      setValue("emotions", selectedOptions)
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
                  {errors.emotions ? (
                    <div className="error text-red-500 mt-1 text-sm">
                      {errors.emotions.message}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Select
                    options={colors ? colors : []}
                    placeholder="Select Color"
                    // name="colors"
                    {...register("colors", {
                      required: "Colors are required",
                    })}
                    isDisabled={query ? true : false}
                    value={getValues("colors")}
                    onChange={(selectedOption) => {
                      const selectedValues = Array.isArray(selectedOption)
                        ? selectedOption
                        : selectedOption
                        ? [selectedOption]
                        : [];

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
                  {errors.colors ? (
                    <div className="error text-red-500 mt-1 text-sm">
                      {errors.colors.message}
                    </div>
                  ) : null}
                </div>
                {/* this is for offensive  */}

                <label className="text-[#203F58] text-sm sm:text-base font-semibold  ">
                  Offensive
                  <select
                    as="select"
                    id="offensive"
                    // name="offensive"
                    {...register("offensive", {
                      required: "Offensive option is required",
                    })}
                    disabled={query}
                    className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes </option>
                  </select>
                </label>

                {/* tags */}

                <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                  Tags External
                  <div className="flex flex-wrap gap-2 mt-1">
                    <input
                      type="text"
                      id="extTags"
                      name="extTags"
                      // disabled={query}
                      readOnly={query}
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
                    <select
                      as="select"
                      id="Material"
                      {...register("material", {
                        required: "Material type is required",
                      })}
                      disabled={query}
                      className="bg-[#F9F9FC]  mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">Select type</option>
                      <option>Paper</option>
                      <option>Watercolor Paper</option>
                      <option>Mixed Media Paper</option>
                      <option>Glaze Paper</option>
                      <option>Drawing Paper</option>
                    </select>
                    {errors.material ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.material.message}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="grid grid-cols-4 mb-4 gap-3">
                  {artwork_orientation?.map((field) => (
                    <span key={field.name}>
                      <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        {...register(field.name, {
                          required: `${field.name} is required`
                            ? field.name
                            : "",
                        })}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        readOnly={query ? true : false}
                        className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      />

                      {errors[field.name] ? (
                        <div className="error text-red-500 mt-1 text-sm">
                          {errors[field.name].message}
                        </div>
                      ) : null}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col space-y-4">
                  <label className="text-[#203F58] font-semibold ">
                    Hanging available
                    <select
                      as="select"
                      id="hangingAvailable"
                      {...register("hangingAvailable", {
                        required: "Hanging availability is required",
                      })}
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">Select</option>
                      <option>Yes </option>
                      <option>No</option>
                    </select>
                  </label>

                  {getValues("hangingAvailable") === "Yes" ? (
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Short Description for hanging
                      <textarea
                        id="hangingDescription"
                        // name="hangingDescription"
                        {...register("hangingDescription", {
                          required: "Hanging description is required",
                        })}
                        readOnly={query ? true : false}
                        placeholder="Type Hanging description here. . .. . ."
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full  p-1 sm:p-2.5 pb-10 "
                      />
                    </label>
                  ) : null}

                  <label className="text-[#203F58] text-sm sm:text-bas  font-semibold ">
                    Framed
                    <select
                      as="select"
                      id="Farmed"
                      // name="framed"
                      {...register("framed", {
                        required: "Framed option is required",
                      })}
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">Select</option>
                      <option>Yes </option>
                      <option>No</option>
                    </select>
                    {errors.framed ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.framed.message}
                      </div>
                    ) : null}
                  </label>

                  <label className="text-[#203F58] text-sm sm:text-base  font-semibold ">
                    Framed Description
                    <textarea
                      type="text"
                      id="framedDescription"
                      // name="framedDescription"
                      {...register("framedDescription", {
                        required: "Framed description is required",
                      })}
                      placeholder="Type Framed description here. . ."
                      readOnly={query ? true : false}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5 pb-10 "
                    />
                  </label>

                  <div className="grid grid-cols-3 mb-4 gap-3 ">
                    {Framed_dimension?.map((field) => (
                      <span key={field.name}>
                        <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                          {field.label} (cm)
                        </label>
                        <input
                          {...register(field.name, {
                            required: field.required ? field.required : "",
                          })}
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
                    <select
                      as="select"
                      id="artworkOrientation"
                      // name="artworkOrientation"
                      {...register("artworkOrientation", {
                        required: "Artwork orientation is required",
                      })}
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-1 sm:p-2.5 "
                    >
                      <option value="">Select type</option>
                      <option>Square </option>
                      <option>Rectengle</option>
                      <option>Circle</option>
                      <option>Star</option>
                    </select>
                    {errors.artworkOrientation ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkOrientation.message}
                      </div>
                    ) : null}
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

                <div
                  className={`flex border-b  border-gray-300 ${
                    query ? "pointer-events-none" : ""
                  }`}
                >
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
                    // onChange={() => setPurchaseCatlogValue(null)}
                    className={`py-2 font-bold cursor-pointer ${
                      activeTab === "subscription"
                        ? "border-b-4 border-black"
                        : "text-gray-500"
                    }`}
                  >
                    Subscription
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
                    // onChange={() => setPurchaseCatlogValue(null)}
                    className={`py-2 mx-8 font-bold cursor-pointer ${
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
                          <select
                            // name="subscriptionCatalog"
                            id="subscriptionCatalog"
                            {...register("subscriptionCatalog")}
                            onChange={(val) => {
                              handleCheckArtistFee(val);
                              setValue("purchaseOption", "");
                              setsubscriptionCatlogValue(val.target.value);
                            }}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option value="">Select</option>

                            {seriesData?.subscriptionCatalog?.map(
                              (series, index) => (
                                <option
                                  key={index}
                                  label={series?.catalogName}
                                  value={series?._id || subscriptionCatlogValue}
                                >
                                  {series?.catalogName}
                                </option>
                              )
                            )}
                          </select>
                        </label>
                      </div>

                      <div className="mt-4 space-y-2">
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                          Purches Option
                          <select
                            {...register("purchaseOption")}
                            id="purchaseOption"
                            // name="purchaseOption"
                            disabled={query}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option value="">Select</option>
                            <option>Yes</option>
                            <option>No</option>
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
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                          Purchase Catalog
                          <select
                            id="purchaseCatalog"
                            {...register("purchaseCatalog")}
                            onChange={(val) => {
                              handleCheckArtistFee(val);
                              setPurchaseCatlogValue(val.target.value);

                              setsubscriptionCatlogValue("");
                              setValue("purchaseType", "");
                            }}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                          >
                            <option value="">Select</option>
                            {seriesData?.purchaseCatalog?.map((item, index) => (
                              <option
                                // label={item?.catalogNameabel}
                                value={item?._id || purchaseCatlogValue}
                                label={item?.catalogName}
                                key={index}
                              >
                                {item?.catalogName}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="mt-4">
                        <label className="text-[#203F58] sm:text-base font-semibold ">
                          Purchase Type
                          <select
                            id="purchaseType"
                            {...register("purchaseType")}
                            value={getValues("purchaseType") || ""}
                            disabled={query}
                            className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          >
                            <option value="">Select</option>
                            {purOption
                              ? purOption.map((item, i) => (
                                  <option key={i}>{item?.value}</option>
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
                  Pricing
                </Header>

                <div
                  className={`${
                    activeTab === "subscription"
                  } ? "flex justify-between" : ""`}
                >
                  <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                    Currency
                    <select
                      {...register("currency")}
                      id="currency"
                      // name="currency"
                      disabled={query}
                      className="bg-[#F9F9FC] mb-3 mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                    >
                      {currency?.map((item: any, i: number) => (
                        <option key={i} value={item?.value}>
                          {item?.value}
                        </option>
                      ))}
                    </select>
                  </label>

                  {activeTab === "subscription" &&
                  watch("subscriptionCatalog") ? (
                    <div className="flex items-center border border-zinc-500 w-full py-3 px-4 bg-yellow-100 text-yellow-800">
                      {/* Warning Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                      </svg>

                      {/* Warning Message */}
                      <span>
                        Price must be less than or equal to the specified
                        amount. {basePriceError}
                      </span>
                    </div>
                  ) : null}

                  {activeTab === "subscription" ? (
                    <label className="text-[#203F58] text-sm sm:text-base font-semibold ">
                      Base Price
                      <input
                        {...register("basePrice", {
                          required: "Base Price Required",
                        })}
                        id="basePrice"
                        placeholder="Enter Base Price"
                        // name="currency"
                        disabled={query}
                        className="bg-[#F9F9FC] mb-3 mt-1 border border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                      />
                      {activeTab === "subscription" && errors.basePrice ? (
                        <div className="error text-red-500 mt-1 text-sm">
                          {errors.basePrice.message}
                        </div>
                      ) : null}
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {watch("purchaseType") === "Downword Offer" ||
                watch("purchaseType") === "Fixed Price" ||
                watch("purchaseType") === "Price By Request" ? (
                  <>
                    {activeTab === "purchase" && watch("purchaseCatalog") ? (
                      <div className="flex items-center border border-zinc-500 w-full py-3 px-4 bg-yellow-100 text-yellow-800">
                        {/* Warning Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                          />
                        </svg>

                        {/* Warning Message */}
                        <span>
                          Price must be less than or equal to the specified
                          amount. {basePriceError}
                        </span>
                      </div>
                    ) : null}

                    <span>
                      <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                        Base Price{" "}
                      </label>

                      <div className="flex flex-col space-x-2">
                        <input
                          {...register("basePrice", {
                            required: "Base Price is Required",
                          })}
                          type="text"
                          name="basePrice"
                          id="basePrice"
                          placeholder="€ Type base price here..."
                          // value={values.basePrice}
                          readOnly={query ? true : false}
                          className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                        />

                        {activeTab === "purchase" && errors.basePrice ? (
                          <div className="error text-red-500 mt-1 text-sm">
                            {errors.basePrice.message}
                          </div>
                        ) : null}
                      </div>

                      {/* Discount Percentage Field */}
                      <div
                        className={`${
                          getValues("purchaseType") === "Downword Offer"
                            ? "grid md:grid-cols-2 gap-3"
                            : "w-full"
                        } grid md:grid-cols-2 gap-3`}
                      >
                        <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                          Discount Percentage
                          <input
                            {...register("dpersentage")}
                            type="text"
                            name="dpersentage"
                            id="dpersentage"
                            placeholder="$ 00  %"
                            readOnly={query ? true : false}
                            className="bg-[#F9F9FC] border mb-3 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                          />
                        </label>

                        {watch("purchaseType") === "Downword Offer" ? (
                          <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                            Accept Offer Minimum Price
                            <input
                              {...register("acceptOfferPrice")}
                              type="text"
                              id="acceptOfferPrice"
                              placeholder="Eur "
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
                  <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                    Artist Base Fees
                    <div className="flex space-x-2">
                      <input
                        id="artistFees"
                        name="artistFees"
                        value={catalogPrice}
                        placeholder="€ Artist Base Fees"
                        readOnly={true}
                        className="bg-[#F9F9FC] mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2.5"
                      />
                    </div>
                  </label>

                  {/* VAT Amount Field */}
                  <label className="text-[#203F58] text-sm sm:text-base font-semibold">
                    VAT Amount (%)
                    <input
                      type="text"
                      id="vatAmount"
                      {...register("vatAmount")}
                      placeholder="Type VAT amount..."
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
                  Inventory & Shipping
                </Header>

                <div className="grid md:grid-cols-2 gap-3 items-center">
                  {shipping_inventry.map((shipping) => (
                    <span key={shipping.name}>
                      <label className="p-1 text-[14px] text-sm sm:text-base font-semibold">
                        {shipping.label}
                      </label>
                      <input
                        type="text"
                        {...register(shipping.name)}
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
                    <input
                      type="text"
                      // name="location"
                      id="location"
                      placeholder="Enter Your Location"
                      {...register("location")}
                      readOnly={query ? true : false}
                      className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5"
                    />
                  </span>
                </div>

                <div className="">
                  <label className="text-[#203F58] sm:text-base font-semibold ">
                    Package Material
                    <select
                      as="select"
                      id="packageMaterial"
                      // name="packageMaterial"
                      {...register("packageMaterial", {
                        required: "Package Material is required",
                      })}
                      placeholder="Select"
                      disabled={query}
                      className="bg-[#F9F9FC] mt-1 border mb-3 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg   block w-full p-1  sm:p-2.5 "
                    >
                      <option value="">Select</option>
                      {packMaterial?.map((item, i) => (
                        <option>{item.value}</option>
                      ))}
                    </select>
                    {errors.packageMaterial ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.packageMaterial.message}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="flex items-center border border-zinc-500 w-full py-3 px-4 mb-3 bg-yellow-100 text-yellow-800">
                  {/* Warning Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                  </svg>

                  {/* Warning Message */}
                  <span>
                    The following values must be less than or equal to the
                    specified limits:
                    <ul className="list-disc ml-5 mt-2">
                      <li>
                        Height must be less than or equal to{" "}
                        {packageHeightError}
                      </li>
                      <li>
                        Width must be less than or equal to {packageWidthError}
                      </li>
                      <li>
                        Depth must be less than or equal to {packageDepthError}
                      </li>
                      <li>
                        Weight must be less than or equal to{" "}
                        {packageWeightError}
                      </li>
                    </ul>
                  </span>
                </div>

                <div className="flex  items-center justify-between mb-4 ">
                  {package_dimension.map((field) => (
                    <span key={field.name}>
                      <label className="p-1 text-[14px] text-[#203F58] font-semibold">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        {...register(field.name, {
                          required: `${field.label} is required`,
                        })}
                        id={field.name}
                        readOnly={query ? true : false}
                        placeholder={field.placeholder}
                        className="bg-[#F9F9FC] border mb-2 border-gray-300 outline-none text-[#203F58] text-sm rounded-lg block w-full p-1 sm:p-2.5 "
                      />

                      {errors[field.name] ? (
                        <div className="error text-red-500 mt-1 text-sm">
                          {errors[field.name].message}
                        </div>
                      ) : null}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      {...register("comingSoon")}
                      id="comingSoon"
                      className="mr-2"
                    />
                    <span className="p-1 text-[14px] text-[#203F58] font-semibold">
                      Coming Soon
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {/* ------------------------ */}

            <ArtworkRight
              query={query}
              control={control}
              discountAcceptation={discountAcceptation}
              availableTo={availableTo}
              getValue={getValues}
              setValue={setValue}
            />
          </div>

          <div className="  bg-white pt-40 flex flex-col sm:flex-row items-center justify-end border border-dotted rounded  py-2 w-full">
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
                    // disabled={!isValid}
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

      {qrVisible && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-[80vh] sm:h-[75vh] md:h-[75vh] lg:h-[75vh] p-4 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-lg text-center mt-3">QR Code</h1>
            <img
              src={logoIcon}
              alt="Logo"
              className="object-cover w-[40%] h-[6%] px-3 py-5"
            />
          </div>

          <span
            onClick={() => setQrVisible(false)}
            className="absolute right-5 top-5 cursor-pointer"
          >
            <BsBackspace size="2em" />
          </span>

          <div className="flex flex-col justify-between mt-6">
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 200,
                width: "100%",
              }}
              ref={qrCodeRef}
              className="flex justify-center"
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={currentPageUrl}
                viewBox="0 0 256 256"
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              <input
                type="text"
                value={url}
                id="linkInput"
                readOnly
                className="w-[80%] sm:w-[70%] p-3 text-lg border border-gray-300 rounded-md mb-4"
              />

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  onClick={handleCopy}
                  className="bg-black text-white px-4 py-2 rounded-md text-md cursor-pointer hover:bg-blue-600 transition mb-2 sm:mb-0"
                >
                  Copy Link
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="bg-black text-white px-4 py-2 rounded-md text-md cursor-pointer hover:bg-green-600 transition"
                  disabled={isLoading}
                >
                  {isLoadingPdf ? "Downloading PDF..." : "Download PDF"}
                </button>
              </div>

              {copySuccess && (
                <p className="mt-2 text-green-500 font-semibold">
                  {copySuccess}
                </p>
              )}

              {errorMessage && (
                <p className="mt-2 text-red-500 font-semibold">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddArtwork;
