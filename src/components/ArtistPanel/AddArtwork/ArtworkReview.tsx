import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import { imageUrl } from "../../utils/baseUrls";
import DiscoverContent from "./DiscoverContent";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import ProductInfo from "./ProductInfo";
import { useAppSelector } from "../../../store/typedReduxHooks";

const DiscoverMore = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const id = useParams().id as string;
  const preview = true;

  const { t } = useTranslation();
  const dark = useAppSelector((state) => state.theme.mode);
  const { data, isLoading } = useGetArtWorkById(id, preview);

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
  };

  const url2 = `${imageUrl}/videos`;

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.mainVideo, alt: "Main Video" },
        ...data?.data.media?.images?.map((item) => ({
          src: item,
          alt: "Additional Image",
        })),
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
        ...data?.data.media?.otherVideo?.map((item) => ({
          src: item,
          alt: "Additional Video",
        })),
      ].filter((image) => image.src)
    : [];

  // Handle slide transition
  useEffect(() => {
    if (sliderRef.current && sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentSlide * containerWidth}px)`;
    }
  }, [currentSlide]);

  if (isLoading) return <Loader />;

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <Header
            variant={{
              size: "xl",
              theme: "dark",
              weight: "semiBold",
            }}
            className={`text-3xl font-bold ${dark ? "text-gray-100" : "text-gray-800"}`}
          >
            {t("Artwork Review")}
          </Header>
          <span className="text-sm text-gray-500">
            {data?.data.artworkName} • ID: {data?.data.artworkId}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row mx-auto lg:max-w-[85%] 2xl:max-w-[77%] gap-6">
          <div className={`lg:w-3/5 rounded-lg border shadow-sm ${dark ? "border-gray-700 bg-gray-800" : "border-zinc-300 bg-white"}`}>
            <div className="flex flex-col lg:flex-row">
              <div
                className={`flex lg:flex-col p-2 gap-2 overflow-x-auto lg:max-h-96 scrollbar lg:overflow-y-auto  ${
                  dark ? "bg-gray-800" : "bg-zinc-100"
                }`}
              >
                {images?.map((thumb, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 cursor-pointer ${currentSlide === index ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {thumb.src.endsWith(".mp4") ? (
                      <video src={`${url2}/${thumb.src}`} className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded" />
                    ) : (
                      <img src={`${imageUrl}/users/${thumb.src}`} alt={thumb.alt} className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded" />
                    )}
                  </div>
                ))}
              </div>

              <div ref={sliderContainerRef} className="relative flex-1 overflow-hidden">
                <div ref={sliderRef} className="flex transition-transform duration-300 ease-in-out h-80 lg:h-96">
                  {images.map((slide, index) => (
                    <div
                      key={index}
                      className={`w-full flex-shrink-0 flex items-center overflow-hidden justify-center rounded-r-xl ${
                        dark ? "bg-gray-800" : "bg-zinc-100"
                      } `}
                    >
                      {slide.src.endsWith(".mp4") ? (
                        <video src={`${url2}/${slide.src}`} className="w-[98%] object-contain" controls autoPlay={currentSlide === index} />
                      ) : (
                        <img src={`${imageUrl}/users/${slide.src}`} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
                      )}
                    </div>
                  ))}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 ${
                        dark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-black"
                      } p-2 rounded-full shadow`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                        dark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-black"
                      } p-2 rounded-full shadow`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-2/5">
            <DiscoverContent data={data?.data} dark={dark} />
          </div>
        </div>

        <div className="py-6">
          <ProductInfo data={data} dark={dark} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverMore;
