import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoCloseSharp } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import QRCode from "react-qr-code";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import Loader from "../../ui/Loader";
import { artwork_orientation, Framed_dimension, package_dimension } from "../../utils/mockData";
import ArtworkRight from "./ArtworkRight";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import { useGetTechnic } from "./http/useGetTechnic";
import { useGetTheme } from "./http/useGetTheme";
import usePostArtWorkMutation from "./http/usePostArtwork";
import logoIcon from "/logofarc.svg";
import logoWIcon from "/logofarcwhite.svg";

import html2canvas from "html2canvas";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { baseUrl, imageUrl } from "../../utils/baseUrls";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import { useGetArtistDetails } from "../ArtistEditProfile/http/useGetDetails";
import Dicipline from "./Dicipline";
import useDeleteSeriesMutation from "./http/useDeleteSeries";
import { useGetMediaSupport } from "./http/useGetMediaSupport";
import { useGetSeries } from "./http/useGetSeries";
import usePostModifyArtworkMutation from "./http/usePostModifyArtwork";
import { SeriesPop } from "./SeriesPop";

const AddArtwork = () => {
  const [copySuccess, setCopySuccess] = useState("");
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogPrice, setCatalogPrice] = useState(null);

  const user = useAppSelector((state) => state.user.user);
  const dark = useAppSelector((state) => state.theme.mode);

  const { t } = useTranslation();

  const [showCalendar, setShowCalendar] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const navigate = useNavigate();
  const imageRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const CustomYearPicker = ({ selectedYear, toggleCalendar, showCalendar, field }) => {
    const dark = useAppSelector((state) => state.theme.mode);
    const { t } = useTranslation();

    const handleYearSelect = (year: number | string) => {
      setValue("artworkCreationYear", year);
      toggleCalendar();
    };

    return (
      <div className="relative w-full">
        <div
          onClick={toggleCalendar}
          className={`mt-1 border rounded-lg w-full p-3 text-left cursor-pointer ${dark ? "bg-gray-700 border-gray-600 text-gray-400" : "bg-[#F9F9FC] border-gray-300 text-gray-900"
            }`}
        >
          {selectedYear ? `${selectedYear}` : t("Select Year")}
        </div>

        {showCalendar && (
          <div className={`absolute z-10 mt-1 shadow-lg rounded-lg px-10 py-2 ${dark ? "bg-gray-600" : "bg-white"}`}>
            <Calendar
              view="decade"
              defaultView="decade"
              onClickYear={(date) => {
                const year = date.getFullYear();
                handleYearSelect(year);
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
  const [isComingSoon, setIsComingSoon] = useState(null);
  const [isArtProviderField, setIsArtProviderField] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ispreviewed, setIsPreviewed] = useState(false);
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const id = searchParams.get("id");
  const query = searchParams.get("view");

  const { data, isLoading, refetch: refetchData } = useGetArtWorkById(id);
  const { data: userData, isLoading: userIsLoading } = useGetArtistDetails();


  console.log(data)

  const userID = userData?.data?.artist?._id;

  const isArtProvider = userData?.data?.artist?.commercilization?.artProvider;
  const { data: technicData, isLoading: technicLoading } = useGetTechnic();
  const { data: themeData, isLoading: themeLoading } = useGetTheme();
  const { mutateAsync: seriesDelete } = useDeleteSeriesMutation();

  const { data: getMediaSupport, isLoading: getMediaSupportLoding } = useGetMediaSupport();

  const { data: seriesData, isLoading: seriesLoading, refetch } = useGetSeries(userID);

  const { mutate, isPending } = usePostArtWorkMutation();
  const { mutate: modifyMuatate, isPending: modifyIsPending } = usePostModifyArtworkMutation();

  const vatAmount = data?.data?.pricing?.vatAmount ? data?.data?.pricing?.vatAmount : userData?.data?.artist?.invoice?.vatAmount;

  useEffect(() => {
    refetch();
    refetchData();
  }, [id]);

  useEffect(() => {
    if (isLoading || userIsLoading || technicLoading || themeLoading || seriesLoading || getMediaSupportLoding) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, userIsLoading, technicLoading, themeLoading, seriesLoading, getMediaSupportLoding]);

  const getOutDiscipline = seriesData?.discipline?.map((item) => item?.discipline);

  const newTechnic = technicData?.data?.filter(
    (item) => item.discipline && item.discipline.some((newItem) => newItem.disciplineName.includes(artDicipline))
  );
  const newTheme = themeData?.data?.filter(
    (item) => item.discipline && item.discipline.some((newItem) => newItem.disciplineName.includes(artDicipline))
  );
  const newArtworkStyle = seriesData?.discipline?.find((item) => item?.discipline === artDicipline)?.style || [];

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  useEffect(() => {
    if (id) {
      setIsArtProviderField(ispreviewed ? data?.data?.reviewDetails?.isArtProvider : data?.data?.isArtProvider || "");
      setArtDicipline(ispreviewed ? data?.data?.reviewDetails?.discipline?.artworkDiscipline : data?.data?.discipline?.artworkDiscipline || "");
      setActiveTab(ispreviewed ? data?.data?.reviewDetails?.commercialization?.activeTab : data?.data?.commercialization?.activeTab || "");
      setInternalTags(ispreviewed ? data?.data?.reviewDetails?.tags?.intTags : data?.data?.tags?.intTags || []);
      setExternalTags(ispreviewed ? data?.data?.reviewDetails?.tags?.extTags : data?.data?.tags?.extTags || []);
      setCatalogPrice(ispreviewed ? data?.data?.reviewDetails?.pricing?.artistFees : data?.data?.pricing?.artistFees || 0);
      setValue("currency", ispreviewed ? data?.data?.reviewDetails?.pricing?.currency : data?.data?.pricing?.currency || "EUR");
      setValue(
        "purchaseCatalog",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.purchaseCatalog : data?.data?.commercialization?.purchaseCatalog || ""
      );
      setValue("availableTo", ispreviewed ? data?.data?.reviewDetails?.restriction?.availableTo : data?.data?.restriction?.availableTo || "");
      setValue("collectionList", ispreviewed ? data?.data?.reviewDetails?.collectionList : data?.data?.collectionList || "");
      setValue(
        "discountAcceptation",
        ispreviewed ? data?.data?.reviewDetails?.restriction?.discountAcceptation : data?.data?.restriction?.discountAcceptation || ""
      );
      setValue("provideArtistName", ispreviewed ? data?.data?.reviewDetails?.provideArtistName : data?.data?.provideArtistName || "");
      setValue("artworkSeries", ispreviewed ? data?.data?.reviewDetails?.artworkSeries : data?.data?.artworkSeries || "");
      setValue("artworkCreationYear", ispreviewed ? data?.data?.reviewDetails?.artworkCreationYear : data?.data?.artworkCreationYear || "");
      setValue("artworkName", ispreviewed ? data?.data?.reviewDetails?.artworkName : data?.data?.artworkName || "");
      setValue("productDescription", ispreviewed ? data?.data?.reviewDetails?.productDescription : data?.data?.productDescription || "");
      setValue(
        "artworkTechnic",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.artworkTechnic : data?.data?.additionalInfo?.artworkTechnic || ""
      );
      setValue(
        "artworkTheme",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.artworkTheme : data?.data?.additionalInfo?.artworkTheme || ""
      );
      setValue(
        "artworkOrientation",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.artworkOrientation : data?.data?.additionalInfo?.artworkOrientation || ""
      );
      setValue("material", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.material : data?.data?.additionalInfo?.material || "");
      setValue("weight", ispreviewed ? String(data?.data?.reviewDetails?.additionalInfo?.weight) : String(data?.data?.additionalInfo?.weight) || "");
      setValue("length", ispreviewed ? String(data?.data?.reviewDetails?.additionalInfo?.length) : String(data?.data?.additionalInfo?.length) || "");
      setValue("height", ispreviewed ? String(data?.data?.reviewDetails?.additionalInfo?.height) : String(data?.data?.additionalInfo?.height) || "");
      setValue("width", ispreviewed ? String(data?.data?.reviewDetails?.additionalInfo?.width) : String(data?.data?.additionalInfo?.width) || "");
      setValue(
        "hangingAvailable",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.hangingAvailable : data?.data?.additionalInfo?.hangingAvailable || ""
      );
      setValue(
        "hangingDescription",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.hangingDescription : data?.data?.additionalInfo?.hangingDescription || ""
      );
      setValue("framed", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.framed : data?.data?.additionalInfo?.framed || "");
      setValue(
        "framedDescription",
        ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.framedDescription : data?.data?.additionalInfo?.framedDescription || ""
      );
      setValue("frameHeight", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.frameHeight : data?.data?.additionalInfo?.frameHeight || "");
      setValue("frameLength", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.frameLength : data?.data?.additionalInfo?.frameLength || "");
      setValue("frameWidth", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.frameWidth : data?.data?.additionalInfo?.frameWidth || "");
      setValue(
        "artworkStyleType",
        ispreviewed
          ? data?.data?.reviewDetails?.additionalInfo?.artworkStyle?.map((opt) => ({
            value: opt,
            label: t(opt),
          }))
          : data?.data?.additionalInfo?.artworkStyle?.map((opt) => ({
            value: opt,
            label: t(opt),
          })) || ""
      );
      setValue(
        "emotions",
        ispreviewed
          ? data?.data?.reviewDetails?.additionalInfo?.emotions?.map((opt) => ({
            value: opt,
            label: t(opt),
          }))
          : data?.data?.additionalInfo?.emotions?.map((opt) => ({
            value: opt,
            label: t(opt),
          })) || ""
      );
      setValue(
        "colors",
        ispreviewed
          ? data?.data?.reviewDetails?.additionalInfo?.colors?.map((opt) => ({
            value: opt,
            label: t(opt),
          }))
          : data?.data?.additionalInfo?.colors?.map((opt) => ({
            value: opt,
            label: t(opt),
          })) || ""
      );
      setValue("offensive", ispreviewed ? data?.data?.reviewDetails?.additionalInfo?.offensive : data?.data?.additionalInfo?.offensive || "");
      setValue(
        "exclusive",
        ispreviewed
          ? data?.data?.reviewDetails?.exclusive === true
            ? "Yes"
            : data?.data?.reviewDetails?.exclusive === false
              ? "No"
              : ""
          : data?.data?.exclusive === true
            ? "Yes"
            : data?.data?.exclusive === false
              ? "No"
              : ""
      );
      setValue(
        "purchaseType",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.purchaseType : data?.data?.commercialization?.purchaseType || ""
      );
      setValue(
        "downwardOffer",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.downwardOffer : data?.data?.commercialization?.downwardOffer || ""
      );
      setValue(
        "upworkOffer",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.upworkOffer : data?.data?.commercialization?.upworkOffer || ""
      );
      setValue("acceptOfferPrice", ispreviewed ? data?.data?.reviewDetails?.pricing?.acceptOfferPrice : data?.data?.pricing?.acceptOfferPrice || "");
      setValue(
        "priceRequest",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.priceRequest : data?.data?.commercialization?.priceRequest || ""
      );
      setValue(
        "artistbaseFees",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.artistbaseFees : data?.data?.commercialization?.artistbaseFees || ""
      );
      setValue("basePrice", ispreviewed ? String(data?.data?.reviewDetails?.pricing?.basePrice) : String(data?.data?.pricing?.basePrice) || "");
      setValue("dpersentage", ispreviewed ? data?.data?.reviewDetails?.pricing?.dpersentage : data?.data?.pricing?.dpersentage || 0);
      setValue("pCode", ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.pCode : data?.data?.inventoryShipping?.pCode || "");
      setValue("location", ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.location : data?.data?.inventoryShipping?.location || "");
      setValue("artworkTags", ispreviewed ? data?.data?.reviewDetails?.discipline?.artworkTags : data?.data?.discipline?.artworkTags || []);
      setValue("existingVideo", ispreviewed ? data?.data?.reviewDetails?.media?.otherVideo : data?.data?.media?.otherVideo || []);
      setValue("existingImage", ispreviewed ? data?.data?.reviewDetails?.media?.images : data?.data?.media?.images || []);
      setValue("promotion", ispreviewed ? data?.data?.reviewDetails?.promotions?.promotion : data?.data?.promotions?.promotion || "");
      setValue("promotionScore", ispreviewed ? data?.data?.reviewDetails?.promotions?.promotionScore : data?.data?.promotions?.promotionScore || "");
      setValue("isArtProvider", ispreviewed ? data?.data?.reviewDetails?.isArtProvider : data?.data?.isArtProvider || "");
      setValue(
        "subscriptionCatalog",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.subscriptionCatalog : data?.data?.commercialization?.subscriptionCatalog || ""
      );
      setValue(
        "purchaseOption",
        ispreviewed ? data?.data?.reviewDetails?.commercialization?.purchaseOption : data?.data?.commercialization?.purchaseOption || ""
      );
      setValue("intTags", ispreviewed ? data?.data?.reviewDetails?.intTags : data?.data?.intTags || []);
      setValue("extTags", ispreviewed ? data?.data?.reviewDetails?.extTags : data?.data?.extTags || []);
      setValue(
        "packageMaterial",
        ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.packageMaterial : data?.data?.inventoryShipping?.packageMaterial || ""
      );
      setValue(
        "packageWeight",
        ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.packageWeight : data?.data?.inventoryShipping?.packageWeight || ""
      );
      setValue(
        "packageHeight",
        ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.packageHeight : data?.data?.inventoryShipping?.packageHeight || ""
      );
      setValue(
        "packageLength",
        ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.packageLength : data?.data?.inventoryShipping?.packageLength || ""
      );
      setValue(
        "packageWidth",
        ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.packageWidth : data?.data?.inventoryShipping?.packageWidth || ""
      );

      setIsComingSoon(ispreviewed ? data?.data?.reviewDetails?.inventoryShipping?.comingSoon : data?.data?.inventoryShipping?.comingSoon || Boolean);
    } else {
      setValue("provideArtistName", name(user));
    }
  }, [id, data, inProcessImage, seriesData, ispreviewed]);

  const status = data?.data?.status;

  const url = `${baseUrl}/discover_more/${id}?referral=${"QR"}`;
  const seriesOptions = seriesData?.seriesList?.map((item) => item);

  const currentPageUrl = url;

  const handleAddExternalTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagValue = e.target.value.trim();

    if (tagValue && !externalTags.includes(tagValue)) {
      setExternalTags((prevTags) => [...prevTags, tagValue]);

      e.target.value = "";
    }
  };

  const handleRemoveExternalTag = (index: number) => {
    setExternalTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleGenerateQRCode = () => {
    setQrVisible(true);
  };

  const picklist = RenderAllPicklists([
    "Commercialization Options",
    "Currency",
    "Package Material",
    "Emotions",
    "Colors",
    "Artwork Available To",
    "Artwork Discount Options",
    "Artwork Orientation",
  ]);

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
  const orientation = picklistMap["Artwork Orientation"];

  let getMaterial = getMediaSupport?.data?.filter(
    (item) => item.discipline && item.discipline.some((newItem) => newItem.disciplineName.includes(artDicipline))
  );

  getMaterial = getMaterial?.map((item) => {
    return {
      label: item.mediaName,
      value: item.mediaName,
    };
  });

  const handleNavigate = () => {
    navigate("/artist-panel/artwork");
    window.scrollTo(0, 0);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const imageUrls = URL.createObjectURL(file);
      setMainImage(imageUrls);
      setHasMainImg(true);
    }
  };

  const handleFileChangeBackImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBackImage(file);
      const imageUrls = URL.createObjectURL(file);
      setBackImage(imageUrls);
      setHasBackImg(true);
    }
  };

  const handleFileChangeInprocessImage = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewInProcessImage(file);
      const imageUrls = URL.createObjectURL(file);
      setInProcessImage(imageUrls);
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
    if (typeFile === "File") {
      setOtherVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
    }
  };

  const [packageHeightError, setPackageHeightError] = useState(null);
  const [packageWidthError, setPackageWidthError] = useState(null);
  const [packageDepthError, setPackageDepthError] = useState(null);
  const [basePriceError, setBasePriceError] = useState(null);
  const [packageWeightError, setPackageWeightError] = useState(null);

  useEffect(() => {
    if (activeTab === "purchase") {
      const purchaseItem = seriesData?.purchaseCatalog?.find((item) => item?._id === getValues("purchaseCatalog"));

      if (purchaseItem && purchaseItem.details) {
        const { maxHeight, maxWeight, maxWidth, maxDepth, maxPrice } = purchaseItem.details;

        setBasePriceError(maxPrice ? maxPrice : null);
        setPackageHeightError(maxHeight ? maxHeight : null);
        setPackageWeightError(maxWeight ? maxWeight : null);
        setPackageWidthError(maxWidth ? maxWidth : null);
        setPackageDepthError(maxDepth ? maxDepth : null);
      }
    } else if (activeTab === "subscription") {
      const subscriptionItem = seriesData?.subscriptionCatalog?.find((item) => item?._id === getValues("subscriptionCatalog"));

      if (subscriptionItem && subscriptionItem.details) {
        const { maxHeight, maxWeight, maxWidth, maxDepth, maxPrice } = subscriptionItem.details;

        setBasePriceError(maxPrice ? maxPrice : null);
        setPackageHeightError(maxHeight ? maxHeight : null);
        setPackageWeightError(maxWeight ? maxWeight : null);
        setPackageWidthError(maxWidth ? maxWidth : null);
        setPackageDepthError(maxDepth ? maxDepth : null);
      }
    }
  }, [activeTab, watch("purchaseType"), watch("purchaseOption"), id, data, seriesData]);

  const onSubmit = handleSubmit(async (values: any) => {
    if (
      parseInt(values.basePrice) <= basePriceError &&
      parseInt(values.packageLength) <= packageDepthError &&
      parseInt(values.packageHeight) <= packageHeightError &&
      parseInt(values.packageWidth) <= packageWidthError &&
      parseInt(values.packageWeight) <= packageWeightError
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
      values.isArtProvider = isArtProviderField;
      values.artworkDiscipline = artDicipline;
      values.vatAmount = vatAmount;
      values.artistFees = catalogPrice;

      values.hasMainImg = hasMainImg;
      values.hasBackImg = hasBackImg;
      values.hasInProcessImg = hasInProcessImg;
      values.hasMainVideo = hasMainVideo;
      values.comingSoon = isComingSoon;

      if (isArtProvider === "Yes") {
        values.isArtProvider = "Yes";
      } else {
        values.isArtProvider = "No";
      }

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

      if (status === "published" || status === "modified") {
        modifyMuatate(newData);
      } else {
        mutate(newData);
      }
    } else {
      return toast(t("Please Check Base Price & Package Dimesions Values"));
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
    watch("existingVideo");
    watch("framed");
  }, []);

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
  const exVidoes = getValues("existingVideo");

  const removeExistingImage = (index: number, typeFile: string) => {
    if (typeFile === "Url") {
      const filteredimg = newImages.filter((_, i) => i !== index);

      setValue("existingImage", filteredimg);
    }
  };

  const removeExistingVideo = (index: number, typeFile: string) => {
    if (typeFile === "Url") {
      const filteredVideo = exVidoes.filter((_, i) => i !== index);

      setValue("existingVideo", filteredVideo);
    }
  };

  useEffect(() => {
    if (data && id) {
      const media = data?.data?.media;
      const reviewMedia = data?.data?.reviewDetails?.media;
  
      setMainImage(media?.mainImage ? `${imageUrl}/users/${media.mainImage}` : null);
  
      const backImage = ispreviewed
        ? reviewMedia?.backImage
          ? `${imageUrl}/users/${reviewMedia.backImage}`
          : null
        : media?.backImage
        ? `${imageUrl}/users/${media.backImage}`
        : null;
      setBackImage(backImage);
  
      setInProcessImage(media?.inProcessImage ? `${imageUrl}/users/${media.inProcessImage}` : null);
      setMainVideo(media?.mainVideo ? `${imageUrl}/videos/${media.mainVideo}` : null);
    }
  }, [data, id, ispreviewed]);
  
  console.log(backImage)

  const handleCheckArtistFee = (values) => {
    const catalogType = values.target.id;
    const catalogValue = values.target.value;

    if (catalogType === "subscriptionCatalog") {
      const selectedCatalog = seriesData?.subscriptionCatalog?.find((item) => item?._id === catalogValue);
      setCatalogPrice(selectedCatalog?.artistFees);
    } else if (catalogType === "purchaseCatalog") {
      const selectedCatalog = seriesData?.purchaseCatalog?.find((item) => item?._id === catalogValue);

      setCatalogPrice(selectedCatalog?.artistFees);
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
    setErrorMessage("");

    try {
      if (!qrCodeRef.current) {
        setErrorMessage("QR element not found.");
        setIsLoadingPdf(false);
        return;
      }

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(qrCodeRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      setErrorMessage("Failed to download QR code.");
    }

    setIsLoadingPdf(false);
  };

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


  console.log(ispreviewed)

  if (loading) return <Loader />;

  return (
    <>
      <div className={`${qrVisible ? "blur-sm" : ""} ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="p-4">
          <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}> {t("Add Artwork")}</h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>{t("Add your artwork here")}</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col lg:flex-row w-fit gap-4 flex-wrap m-3 mt-1">
            {query && (
              <span
                onClick={handleGenerateQRCode}
                className={`flex items-center gap-2 cursor-pointer border px-5 py-3 rounded-xl text-sm md:text-base font-semibold ${dark ? "bg-gray-700 border-gray-600 hover:bg-gray-800" : "bg-gray-900 hover:bg-gray-700"
                  } transition-all text-white duration-200 shadow-md hover:shadow-lg active:scale-95`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t("Generate QR Code")}
              </span>
            )}

            <span
              className={`flex items-center cursor-pointer gap-2 px-5 py-3 rounded-xl text-white text-sm md:text-base font-semibold bg-[#EE1D52] hover:bg-[#EE1D52]/80 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t("Generate Certificate Of Authenticity")}
            </span>

            {status === "modified" && (
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setIsPreviewed(false)}
                  className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all ${!ispreviewed
                      ? dark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : dark
                        ? "bg-gray-700 text-gray-300 opacity-75"
                        : "bg-gray-200 text-gray-700 opacity-75"
                    }`}
                >
                  {t("Old Version")}
                </span>
                <span
                  onClick={() => setIsPreviewed(true)}
                  className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all ${ispreviewed
                      ? dark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : dark
                        ? "bg-gray-700 text-gray-300 opacity-75"
                        : "bg-gray-200 text-gray-700 opacity-75"
                    }`}
                >
                  {t("Modified Version")}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-3 pb-3">
            <div className="col-span-2 space-y-4">
              {/* General Information Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("General Information")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Name")} *</label>
                  <input
                    {...register("artworkName", { required: t("Artwork Name is required") })}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    type="text"
                    id="artworkName"
                    placeholder={t("Enter Artwork Name")}
                    readOnly={query ? true : false}
                  />
                  {errors.artworkName && <p className="mt-1 text-sm text-red-500">{t(`${errors.artworkName.message}`)}</p>}
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

                {isArtProvider === "Yes" && (
                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Name")}</label>
                    <input
                      {...register("provideArtistName")}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      name="provideArtistName"
                      id="provideArtistName"
                      readOnly={query ? true : false}
                      placeholder={t("Type artist name here (if different from artist)...")}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                      {t("Artwork Creation Year")} *
                    </label>
                    <Controller
                      name="artworkCreationYear"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomYearPicker {...field} selectedYear={field.value} toggleCalendar={toggleCalendar} showCalendar={showCalendar} />
                      )}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`block text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Select Series")}</label>
                      {!query && (
                        <span onClick={() => setIsPopupOpen(true)} className="text-blue-500 hover:text-blue-600">
                          <TiPlus size={20} />
                        </span>
                      )}
                    </div>

                    <SeriesPop isOpen={isPopupOpen} onClose={closePopup} />

                    <div className="relative">
                      <input
                        {...register("artworkSeries")}
                        value={getValues("artworkSeries")}
                        type="text"
                        readOnly={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        placeholder={t("Select Series")}
                        autoComplete="off"
                        onClick={handleDropDown}
                      />
                      {isDropdownOpen && !query && (
                        <div className={`absolute z-10 mt-1 w-full rounded-lg shadow-lg overflow-hidden ${dark ? "bg-gray-700" : "bg-white"}`}>
                          {seriesOptions?.map((option, index: number) => (
                            <div
                              key={index}
                              className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-opacity-10 ${dark ? "!text-white hover:bg-gray-300" : "hover:bg-gray-100"
                                }`}
                            >
                              <span
                                onClick={() => {
                                  handleSelectOption(option);
                                  handleDropDown();
                                }}
                                className="flex-1"
                              >
                                {option}
                              </span>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveSeries(option);
                                }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <MdDelete size={18} />
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Description")} *</label>
                  <textarea
                    {...register("productDescription", { required: t("Artwork description is required") })}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    name="productDescription"
                    placeholder={t("Type product description here...")}
                    readOnly={query ? true : false}
                  />
                  {errors.productDescription && <p className="mt-1 text-sm text-red-500">{t(`${errors.productDescription.message}`)}</p>}
                </div>
              </div>

              {/* Media Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Media")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Photo */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Main Photo")} *</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                        } ${!mainImage ? "min-h-[200px]" : ""}`}
                      onClick={() => document.getElementById("main-photo-input")?.click()}
                    >
                      <input
                        type="file"
                        id="main-photo-input"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setMainImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      {mainImage ? (
                        <div className="relative w-full">
                          <img
                            id="mainImage"
                            src={mainImage}
                            alt="Main artwork"
                            className="w-full h-48 object-contain rounded-lg"
                          />

                         
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage("mainImage", 0);
                            }}
                            className={`absolute top-2 right-2 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} text-white z-10`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>

                          {/* Fullscreen Toggle Button */}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const img = document.getElementById("mainImage");
                              if (!document.fullscreenElement) {
                                img.requestFullscreen();
                              } else {
                                document.exitFullscreen();
                              }
                            }}
                            className={`absolute top-2 right-10 p-1 rounded-full ${dark ? "bg-blue-600" : "bg-blue-500"} text-white z-10`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                d="M3 3h6v2H5v4H3V3zm14 0v6h-2V5h-4V3h6zm0 14h-6v-2h4v-4h2v6zM3 17v-6h2v4h4v2H3z"
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
                          <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {t("Drag and drop image here, or click add image")}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Back Photo */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Back Photo")}</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                        } ${!backImage ? "min-h-[200px]" : ""}`}
                      onClick={() => document.getElementById("back-photo-input")?.click()}
                    >
                      <input
                        type="file"
                        id="back-photo-input"
                        accept="image/*"
                        onChange={(e) => handleFileChangeBackImage(e, setBackImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      {backImage ? (
                        <div className="relative w-full">
                          <img src={backImage} alt="Back of artwork" id="backImage" className="w-full h-48 object-contain rounded-lg" />
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage("backImage", 0);
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

                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const img = document.getElementById("backImage");
                              if (!document.fullscreenElement) {
                                img.requestFullscreen();
                              } else {
                                document.exitFullscreen();
                              }
                            }}
                            className={`absolute top-2 right-10 p-1 rounded-full ${dark ? "bg-blue-600" : "bg-blue-500"} text-white z-10`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                d="M3 3h6v2H5v4H3V3zm14 0v6h-2V5h-4V3h6zm0 14h-6v-2h4v-4h2v6zM3 17v-6h2v4h4v2H3z"
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
                          <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {" "}
                            {t("Drag and drop image here, or click add image")}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Inprocess Photo */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Inprocess Photo")}</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                        } ${!inProcessImage ? "min-h-[200px]" : ""}`}
                      onClick={() => document.getElementById("inprocess-photo-input")?.click()}
                    >
                      <input
                        type="file"
                        id="inprocess-photo-input"
                        accept="image/*"
                        onChange={(e) => handleFileChangeInprocessImage(e, setInProcessImage)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      {inProcessImage ? (
                        <div className="relative w-full">
                          <img src={inProcessImage} alt="Artwork in process" id="inProcessImage" className="w-full h-48 object-contain rounded-lg" />
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage("inProcessImage", 0);
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

                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const img = document.getElementById("inProcessImage");
                              if (!document.fullscreenElement) {
                                img.requestFullscreen();
                              } else {
                                document.exitFullscreen();
                              }
                            }}
                            className={`absolute top-2 right-10 p-1 rounded-full ${dark ? "bg-blue-600" : "bg-blue-500"} text-white z-10`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                d="M3 3h6v2H5v4H3V3zm14 0v6h-2V5h-4V3h6zm0 14h-6v-2h4v-4h2v6zM3 17v-6h2v4h4v2H3z"
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
                          <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {t("Drag and drop image here, or click add image")}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Photos */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {t("Details Photos (max 3 images)")}
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                      }`}
                    onClick={() => document.getElementById("details-photo-input")?.click()}
                  >
                    <input
                      type="file"
                      id="details-photo-input"
                      accept="image/*"
                      multiple
                      name="images"
                      onChange={(e) => handleFileChangeDetailsImage(e, setImages)}
                      className="hidden"
                      disabled={query ? true : false}
                    />
                    <div className="flex flex-wrap gap-4 w-full">
                      {images &&
                        images.length > 0 &&
                        images.map((img, index: number) => (
                          <div key={index} className="relative w-32 h-32">
                            <img src={URL.createObjectURL(img)} id="images" alt={`Detail ${index + 1}`} className="w-full h-full object-contain rounded-lg" />
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage("images", index, "File");
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

                            <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const img = document.getElementById("images");
                              if (!document.fullscreenElement) {
                                img.requestFullscreen();
                              } else {
                                document.exitFullscreen();
                              }
                            }}
                            className={`absolute top-2 right-10 p-1 rounded-full ${dark ? "bg-blue-600" : "bg-blue-500"} text-white z-10`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                d="M3 3h6v2H5v4H3V3zm14 0v6h-2V5h-4V3h6zm0 14h-6v-2h4v-4h2v6zM3 17v-6h2v4h4v2H3z"
                              />
                            </svg>
                          </span>
                          </div>
                        ))}

                      {getValues("existingImage") &&
                        getValues("existingImage").length > 0 &&
                        getValues("existingImage")?.map((img: string, i: number) => {
                          const index = i + (images?.length || 0);
                          return (
                            <div key={index} className="relative">
                              <img src={`${imageUrl}/users/${img}`} alt="image" className="w-full h-full object-contain rounded-lg" />
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeExistingImage(i, "Url");
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
                          );
                        })}
                      {(typeof getValues("existingImage")?.length == "undefined" || getValues("existingImage")?.length == 0) &&
                        images.length === 0 && (
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
                            <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                              {t("Drag and drop image here, or click add image")}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  {/* Main Video */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Main Video")}</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                        } ${!mainVideo ? "min-h-[200px]" : ""}`}
                      onClick={() => document.getElementById("main-video-input")?.click()}
                    >
                      <input
                        type="file"
                        id="main-video-input"
                        accept="video/*"
                        onChange={(e) => handleMainVideo(e, setMainVideo)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      {mainVideo ? (
                        <div className="relative w-full">
                          <video src={mainVideo} controls className="w-full h-48 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage("mainvideo", 0);
                            }}
                            className={`absolute top-2 right-2 p-1 rounded-full ${dark ? "bg-red-600" : "bg-red-500"} ${query ? "pointer-events-none opacity-50" : ""
                              } text-white`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
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
                          <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {t("Drag and drop video here, or click add video")}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Other Videos */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Other Videos")}</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:border-blue-500 ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                        } ${otherVideo.length === 0 ? "min-h-[200px]" : ""}`}
                      onClick={() => document.getElementById("other-video-input")?.click()}
                    >
                      <input
                        type="file"
                        id="other-video-input"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleOtherVideo(e, setOtherVideos)}
                        className="hidden"
                        disabled={query ? true : false}
                      />
                      <div className="flex flex-wrap gap-4 w-full">
                        {otherVideo &&
                          otherVideo.length > 0 &&
                          otherVideo.map((video, index) => (
                            <div key={index} className="relative w-32 h-32">
                              <video src={URL.createObjectURL(video)} controls className="w-full h-full object-contain rounded-lg" />
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeVideo(index, "File");
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

                        {exVidoes &&
                          exVidoes.length > 0 &&
                          exVidoes.map((video: string, i: number) => {
                            const index = i + (otherVideo?.length || 0);
                            return (
                              <div key={index} className="relative">
                                <video src={`${imageUrl}/videos/${video}`} className="w-full h-full object-cover rounded-lg" controls />
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeExistingVideo(i, "Url");
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
                            );
                          })}
                        {(typeof exVidoes?.length == "undefined" || exVidoes?.length == 0) && otherVideo.length === 0 && (
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
                            <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                              {t("Drag and drop video here, or click add video")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descriptive Information Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Descriptive Information And Categorization")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <Dicipline
                  query={query}
                  setArtDicipline={setArtDicipline}
                  artDicipline={artDicipline}
                  control={control}
                  errors={errors}
                  getOutDiscipline={getOutDiscipline}
                  setValue={setValue}
                  dark={dark}
                />

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Technic")} *</label>
                    <select
                      {...register("artworkTechnic", { required: "Artwork Technic is required" })}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      id="artworkTechnic"
                      disabled={query ? true : false}
                    >
                      <option value="">{t("Select Type")}</option>
                      {newTechnic && newTechnic.length > 0 ? (
                        newTechnic?.map((item, index: number) => (
                          <option key={index} value={item.technicName}>
                            {t(item.technicName)}
                          </option>
                        ))
                      ) : (
                        <option disabled>{t("No Technics Available")}</option>
                      )}
                    </select>
                    {errors.artworkTechnic && <p className="mt-1 text-sm text-red-500">{t(`${errors.artworkTechnic.message}`)}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Theme")} *</label>
                    <select
                      {...register("artworkTheme", { required: "Artwork Theme is required" })}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      disabled={query ? true : false}
                      id="artworkTheme"
                    >
                      <option value="">{t("Select Type")}</option>
                      {newTheme && newTheme.length > 0 ? (
                        newTheme?.map((item, index) => (
                          <option key={index} value={item.themeName}>
                            {t(item.themeName)}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {t("No Themes Available")}
                        </option>
                      )}
                    </select>
                    {errors.artworkTheme && <p className="mt-1 text-sm text-red-500">{t(`${errors.artworkTheme.message}`)}</p>}
                  </div>
                </div>

                {/* Artwork Style */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Style")} *</label>
                  <Select
                    options={newArtworkStyle?.map((item) => ({
                      value: item,
                      label: t(item),
                    }))}
                    isMulti
                    placeholder={t("Select Artwork Style") + " *"}
                    isDisabled={query ? true : false}
                    value={getValues("artworkStyleType")}
                    {...register("artworkStyleType", {
                      required: "Artwork Style is required",
                    })}
                    onChange={(selectedOptions) => setValue("artworkStyleType", selectedOptions)}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#f9fafb",
                        borderColor: dark ? "#4b5563" : "#d1d5db",
                        minHeight: "48px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#ffffff",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? dark
                            ? "#3b82f6"
                            : "#3b82f6"
                          : state.isFocused
                            ? dark
                              ? "#4b5563"
                              : "#f3f4f6"
                            : dark
                              ? "#374151"
                              : "#ffffff",
                        color: state.isSelected ? "#ffffff" : dark ? "#e5e7eb" : "#111827",
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#3b82f6" : "#3b82f6",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                        ":hover": {
                          backgroundColor: dark ? "#2563eb" : "#2563eb",
                        },
                      }),
                    }}
                  />
                  {errors.artworkStyleType && <p className="mt-1 text-sm text-red-500">{t(`${errors.artworkStyleType.message}`)}</p>}
                </div>

                {/* Emotions */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Emotions")} *</label>
                  <Select
                    options={emotions || []}
                    placeholder={`${t("Select Emotions")} *`}
                    isMulti
                    className="text-sm"
                    isDisabled={query ? true : false}
                    value={getValues("emotions")}
                    {...register("emotions", {
                      required: "Emotions are required",
                    })}
                    onChange={(selectedOptions) => setValue("emotions", selectedOptions)}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#f9fafb",
                        borderColor: dark ? "#4b5563" : "#d1d5db",
                        minHeight: "48px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#ffffff",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? dark
                            ? "#3b82f6"
                            : "#3b82f6"
                          : state.isFocused
                            ? dark
                              ? "#4b5563"
                              : "#f3f4f6"
                            : dark
                              ? "#374151"
                              : "#ffffff",
                        color: state.isSelected ? "#ffffff" : dark ? "#e5e7eb" : "#111827",
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#3b82f6" : "#3b82f6",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                        ":hover": {
                          backgroundColor: dark ? "#2563eb" : "#2563eb",
                        },
                      }),
                    }}
                  />
                  {errors.emotions && <p className="mt-1 text-sm text-red-500">{t(`${errors.emotions.message}`)}</p>}
                </div>

                {/* Colors */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Colors")} *</label>
                  <Select
                    options={colors || []}
                    isMulti
                    className="text-sm"
                    placeholder={`${t("Select Color")} *`}
                    {...register("colors", {
                      required: t("Colors are required"),
                    })}
                    isDisabled={query ? true : false}
                    value={getValues("colors")}
                    onChange={(selectedOptions) => setValue("colors", selectedOptions)}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#f9fafb",
                        borderColor: dark ? "#4b5563" : "#d1d5db",
                        minHeight: "48px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#374151" : "#ffffff",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? dark
                            ? "#3b82f6"
                            : "#3b82f6"
                          : state.isFocused
                            ? dark
                              ? "#4b5563"
                              : "#f3f4f6"
                            : dark
                              ? "#374151"
                              : "#ffffff",
                        color: state.isSelected ? "#ffffff" : dark ? "#e5e7eb" : "#111827",
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: dark ? "#3b82f6" : "#3b82f6",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                        ":hover": {
                          backgroundColor: dark ? "#2563eb" : "#2563eb",
                        },
                      }),
                    }}
                  />
                  {errors.colors && <p className="mt-1 text-sm text-red-500">{t(`${errors.colors.message}`)}</p>}
                </div>

                {/* Offensive */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Offensive")} *</label>
                  <select
                    {...register("offensive", { required: "Offensive is required" })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="No">{t("No")}</option>
                    <option value="Yes">{t("Yes")}</option>
                  </select>
                </div>

                {/* Tags External */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Tags External")}</label>
                  <div className={`flex flex-wrap gap-2 ${externalTags?.length > 0 ? "mb-2" : ""}`}>
                    {externalTags &&
                      externalTags.length > 0 &&
                      externalTags.map((tag, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${dark ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {tag}
                          <span
                            onClick={() => handleRemoveExternalTag(index)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 hover:text-blue-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </span>
                      ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="extTags"
                      name="extTags"
                      readOnly={query ? true : false}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddExternalTag(e);
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      placeholder={t("Enter tags (e.g., #example)")}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Material")} *</label>
                  <select
                    id="Material"
                    {...register("material", {
                      required: "Material is required",
                    })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select Type")}</option>
                    {getMaterial &&
                      getMaterial?.map((item, index: number) => (
                        <option key={index} value={item?.value}>
                          {t(item?.label)}
                        </option>
                      ))}
                  </select>
                  {errors.material ? <div className="text-red-500 mt-1 text-sm">{t(`${errors.material.message}`)}</div> : null}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  {artwork_orientation?.map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(field.label)} *</label>
                      <input
                        type="text"
                        {...register(field.name, {
                          required: t(`${field.label} is required`) ? field.name : "",
                        })}
                        name={field.name}
                        id={field.name}
                        placeholder={t(field.placeholder)}
                        readOnly={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      />

                      {errors[field.name] ? (
                        <div className="error text-red-500 mt-1 text-sm">{t(`${errors[field.name].message} is required`)}</div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Hanging Available")}</label>
                  <select
                    id="hangingAvailable"
                    {...register("hangingAvailable", {
                      required: "Hanging available is required",
                    })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select")}</option>
                    <option value="Yes">{t("Yes")}</option>
                    <option value="No">{t("No")}</option>
                  </select>
                  {errors.hangingAvailable ? <div className="text-red-500 mt-1 text-sm">{t(`${errors.hangingAvailable.message}`)}</div> : null}
                </div>

                <div className="mt-6">
                  {getValues("hangingAvailable") === "Yes" && (
                    <>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        {t("Hanging Description")}
                      </label>
                      <textarea
                        id="hangingDescription"
                        {...register("hangingDescription", {
                          required: t("Hanging Description is required"),
                        })}
                        rows={5}
                        readOnly={query ? true : false}
                        placeholder={t("Type Hanging description here...")}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      />
                    </>
                  )}
                </div>

                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Framed")} *</label>
                  <select
                    id="Farmed"
                    {...register("framed", {
                      required: t("Framed is required"),
                    })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select")}</option>
                    <option value="Yes">{t("Yes")}</option>
                    <option value="No">{t("No")}</option>
                  </select>
                  {errors.framed ? <div className="text-red-500 mt-1 text-sm">{t(`${errors.framed.message}`)}</div> : null}
                </div>

                {getValues("framed") === "Yes" && (
                  <>
                    <div className="mt-6">
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        {t("Frame Description")} *
                      </label>
                      <textarea
                        id="framedDescription"
                        {...register("framedDescription", {
                          required: "Frame Description is required",
                        })}
                        placeholder={t("Type Framed description here...")}
                        readOnly={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      />
                      {errors?.framedDescription && <div className="text-red-500 mt-1 text-sm">{t(`${errors.framedDescription.message}`)}</div>}
                    </div>
                    <div className="grid md:grid-cols-3 my-4 gap-3">
                      {Framed_dimension?.map((field) => (
                        <div key={field.name}>
                          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(field.label)} *</label>
                          <input
                            {...register(field.name, {
                              required: t(`${field.label} is required`),
                            })}
                            type="text"
                            name={field.name}
                            id={field.name}
                            readOnly={query ? true : false}
                            placeholder={t(field.placeholder)}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                                : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                              }`}
                          />

                          {errors?.[field.name] && <div className="text-red-500 mt-1 text-sm">{t(`${errors?.[field.name]?.message}`)}</div>}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Exclusive")} *</label>
                  <select
                    id="Exclusive"
                    {...register("exclusive", {
                      required: t("Exclusive is required"),
                    })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select")}</option>
                    <option value="Yes">{t("Yes")}</option>
                    <option value="No">{t("No")}</option>
                  </select>
                  {errors.exclusive ? <div className="text-red-500 mt-1 text-sm">{t(`${errors.exclusive.message}`)}</div> : null}
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artwork Orientation")} *</label>
                  <select
                    id="artworkOrientation"
                    {...register("artworkOrientation", {
                      required: "Artwork Orientation is required",
                    })}
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select Type")}</option>
                    {orientation &&
                      orientation?.length > 0 &&
                      orientation?.map((item: any, i: number) => (
                        <option value={item?.value} key={i}>
                          {t(item?.value)}
                        </option>
                      ))}
                  </select>
                  {errors.artworkOrientation ? <div className="text-red-500 mt-1 text-sm">{t(`${errors.artworkOrientation.message}`)}</div> : null}
                </div>
              </div>

              {/* Commercialization Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Commercialization")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <div className={`flex border-b ${dark ? "border-gray-600" : "border-gray-300"} ${query ? "pointer-events-none" : ""}`}>
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
                    className={`py-2 font-semibold transition-all ${activeTab === "subscription"
                        ? dark
                          ? "border-b-2 border-blue-400 text-blue-400"
                          : "border-b-2 border-blue-500 text-blue-500"
                        : dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
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
                    className={`py-2 mx-8 font-semibold transition-all ${activeTab === "purchase"
                        ? dark
                          ? "border-b-2 border-blue-400 text-blue-400"
                          : "border-b-2 border-blue-500 text-blue-500"
                        : dark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                  >
                    {t("Purchase")}
                  </span>
                </div>

                {activeTab === "subscription" && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        {t("Subscription Catalog")}
                      </label>
                      <select
                        id="subscriptionCatalog"
                        {...register("subscriptionCatalog")}
                        onChange={(val) => {
                          handleCheckArtistFee(val);
                          setValue("purchaseOption", "");
                          setsubscriptionCatlogValue(val.target.value);
                        }}
                        disabled={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      >
                        <option value="">{t("Select")}</option>
                        {seriesData?.subscriptionCatalog?.map((series, i: number) => (
                          <option key={i} value={series?._id || subscriptionCatlogValue}>
                            {t(series?.catalogName)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Purchase Option")}</label>
                      <select
                        {...register("purchaseOption")}
                        id="purchaseOption"
                        disabled={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      >
                        <option value="">{t("Select")}</option>
                        <option value="Yes">{t("Yes")}</option>
                        <option value="No">{t("No")}</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === "purchase" && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Purchase Catalog")}</label>
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
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      >
                        <option value="">{t("Select")}</option>
                        {seriesData?.purchaseCatalog?.map((item, index: number) => (
                          <option key={index} value={item?._id || purchaseCatlogValue}>
                            {t(item?.catalogName)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Purchase Type")}</label>
                      <select
                        id="purchaseType"
                        {...register("purchaseType")}
                        value={getValues("purchaseType") || ""}
                        disabled={query ? true : false}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                      >
                        <option value="">{t("Select")}</option>
                        {purOption
                          ? purOption?.map((item, index: number) => (
                            <option key={index} value={item?.value}>
                              {t(item?.value)}
                            </option>
                          ))
                          : []}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Pricing")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Currency")}</label>
                  <select
                    {...register("currency")}
                    id="currency"
                    disabled={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    {currency?.map((item, index: number) => (
                      <option key={index} value={item?.value}>
                        {t(item?.value)}
                      </option>
                    ))}
                  </select>
                </div>

                {(activeTab === "subscription" && watch("subscriptionCatalog")) || (activeTab === "purchase" && watch("purchaseCatalog")) ? (
                  <div className={`p-4 rounded-lg mt-6 border ${dark ? "bg-yellow-900 border-yellow-700" : "bg-yellow-100 border-yellow-200"}`}>
                    <p className={`text-sm ${dark ? "text-yellow-200" : "text-yellow-800"}`}>
                      {t("Price must be less than or equal to the specified amount")} - {basePriceError}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Base Price")} *</label>
                  <input
                    {...register("basePrice", { required: "Base Price is Required" })}
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    id="basePrice"
                    placeholder={t("Enter Base Price")}
                    disabled={query ? true : false}
                  />
                  {errors.basePrice && <p className="mt-1 text-sm text-red-500">{t(`${errors.basePrice.message}`)}</p>}
                </div>

                {(watch("purchaseType") === "Downward Offer" ||
                  watch("purchaseType") === "Fixed Price" ||
                  watch("purchaseType") === "Price By Request" ||
                  watch("purchaseType") === "Upward Offer") && (
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                          {t("Discount Percentage")}
                        </label>
                        <input
                          {...register("dpersentage")}
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          name="dpersentage"
                          id="dpersentage"
                          placeholder="0.0 %"
                          readOnly={query ? true : false}
                        />
                      </div>

                      {(watch("purchaseType") === "Downward Offer" || watch("purchaseType") === "Upward Offer") && (
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                            {t("Accept Offer Minimum Price")}
                          </label>
                          <input
                            {...register("acceptOfferPrice")}
                            type="text"
                            id="acceptOfferPrice"
                            placeholder={t("Accept Offer Minimum Price")}
                            readOnly={query ? true : false}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                                : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                              }`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Base Fees")}</label>
                    <input
                      value={catalogPrice || ""}
                      id="artistFees"
                      name="artistFees"
                      placeholder={t("Enter Artist Base Fees")}
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("VAT Amount (%)")}</label>
                    <input
                      type="text"
                      id="vatAmount"
                      {...register("vatAmount")}
                      placeholder={t("Enter VAT amount")}
                      value={vatAmount}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory & Shipping Card */}
              <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Inventory & Shipping")}</h2>
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Product Code")}</label>
                  <input
                    type="text"
                    {...register("pCode")}
                    name="Product Code"
                    id="Product Code"
                    placeholder={t("Product Code")}
                    readOnly={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  />
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Location")}</label>
                  <input
                    type="text"
                    id="location"
                    placeholder={t("Enter Your Location")}
                    {...register("location")}
                    readOnly={query ? true : false}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  />
                </div>

                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Package Material")} *</label>
                  <select
                    disabled={query ? true : false}
                    {...register("packageMaterial", { required: "Package Material is required" })}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                  >
                    <option value="">{t("Select")}</option>
                    {packMaterial?.map((item, index: number) => (
                      <option key={index} value={item?.value}>
                        {t(item?.value)}
                      </option>
                    ))}
                  </select>
                  {errors.packageMaterial && <p className="mt-1 text-sm text-red-500">{t(`${errors.packageMaterial.message}`)}</p>}
                </div>

                <div className={`mt-6 p-4 rounded-lg border ${dark ? "bg-yellow-900 border-yellow-700" : "bg-yellow-100 border-yellow-200"}`}>
                  <p className={`text-sm font-medium ${dark ? "text-yellow-200" : "text-yellow-800"}`}>
                    {t("Max Dimensions should not be greater than the Dimensions in selected Catalog.")}
                  </p>
                  <ul className={`mt-2 text-sm list-disc pl-5 ${dark ? "text-yellow-200" : "text-yellow-800"}`}>
                    <li>
                      {t("Max Height")}: {packageHeightError || "N/A"}
                    </li>
                    <li>
                      {t("Max Width")}: {packageWidthError || "N/A"}
                    </li>
                    <li>
                      {t("Max Depth")}: {packageDepthError || "N/A"}
                    </li>
                    <li>
                      {t("Max Weight")}: {packageWeightError || "N/A"}
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {package_dimension.map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(field.label)} *</label>
                      <input
                        {...register(field.name, { required: `${field.label} is required` })}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${dark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        type="text"
                        id={field.name}
                        readOnly={query ? true : false}
                        placeholder={t(`Enter ${field.placeholder}`)}
                      />
                      {errors[field.name] && <p className="mt-1 text-sm text-red-500">{t(`${field.placeholder} is required`)}</p>}
                    </div>
                  ))}
                </div>

                <div className="flex items-center mt-6 ">
                  <input
                    type="checkbox"
                    id="comingSoon"
                    checked={isComingSoon === true}
                    onChange={() => setIsComingSoon(!isComingSoon)}
                    className={`w-4 h-4 rounded focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  />
                  <label htmlFor="comingSoon" className={`ml-2 text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {t("Coming Soon")}
                  </label>
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
              dark={dark}
            />
          </div>

          {/* Footer Buttons */}
          <div className={`fixed bottom-0  right-0 py-4 px-6 flex justify-end gap-4 w-fit`}>
            {!query && (
              <>
                <button
                  type="button"
                  onClick={handleNavigate}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${dark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                >
                  {t("Cancel")}
                </button>
                {status === "published" ? (
                  <button
                    type="submit"
                    disabled={modifyIsPending}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${modifyIsPending ? "bg-gray-400 cursor-not-allowed" : dark && "bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white"
                      }`}
                  >
                    {modifyIsPending ? t("Modifying...") : t("Modify Artwork")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isPending || (status === "modified" && !ispreviewed)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${isPending || (status === "modified" && !ispreviewed)
                        ? "bg-gray-400 opacity-65 pointer-events-none cursor-not-allowed"
                        : "bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white"
                      }`}
                  >
                    {isPending ? t("Processing...") : t("Save & Preview")}
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>

      {/* QR Code Modal */}
      {qrVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60 backdrop-blur-sm">
          <div
            className={`relative w-full h-[90vh] overflow-y-auto scrollbar max-w-md p-4 border rounded-2xl shadow-2xl ${dark ? "bg-gradient-to-br border-gray-600 from-gray-900 to-gray-800" : "bg-white"
              } transition-all`}
          >
            <span
              onClick={() => {
                setQrVisible(false);
                setCopySuccess("");
                setErrorMessage("");
              }}
              className={`absolute rounded-full cursor-pointer ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"
                } top-4 right-4 text-gray-400 hover:text-red-500 transition-colors`}
            >
              <IoCloseSharp size={26} />
            </span>

            <div className="flex flex-col items-center">
              <h2 className={`text-xl font-bold mb-3 ${dark ? "text-white" : "text-gray-800"}`}>{t("QR Code")}</h2>
              <img src={dark ? logoWIcon : logoIcon} alt="Logo" className="h-12 mb-5" />

              <div ref={qrCodeRef} className={`p-5 rounded-xl mb-6 shadow-inner ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                <QRCode
                  size={180}
                  value={currentPageUrl}
                  viewBox="0 0 256 256"
                  className="rounded-lg"
                  fgColor={dark ? "#ffffff" : "#000000"}
                  bgColor="transparent"
                />
              </div>

              <div className="w-full mb-5">
                <div className="relative">
                  <input
                    type="text"
                    id="linkInput"
                    value={url}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border text-sm font-medium outline-none focus:ring-2 transition-all ${dark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-600"
                        : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-400"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`absolute right-2 top-1.5 px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm transition-all ${dark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                  >
                    {t("Copy Link")}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isLoadingPdf}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isLoadingPdf
                    ? "bg-gray-400 cursor-not-allowed"
                    : dark
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                {isLoadingPdf ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("Downloading Image...")}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("Download Image")}
                  </>
                )}
              </button>

              {copySuccess && (
                <div className={`mt-4 p-2 rounded-md text-sm font-medium ${dark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`}>
                  {t(copySuccess)}
                </div>
              )}
              {errorMessage && (
                <div className={`mt-4 p-2 rounded-md text-sm font-medium ${dark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"}`}>
                  {t(errorMessage)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddArtwork;
