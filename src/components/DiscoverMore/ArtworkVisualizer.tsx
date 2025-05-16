import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";
import { MdKitchen, MdOutlineBathroom, MdOutlineBedroomParent, MdWorkOutline } from "react-icons/md";
import { TbDeviceMobileRotated } from "react-icons/tb";
import { useAppSelector } from "../../store/typedReduxHooks";
import Header from "../ui/Header";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import CustomPop from "./CustomPop";
import MobileArtworkVisualizer from "./MobileArtworkVisualizer";
import { useGetArtVisulaization } from "./http/useGetArtVisulaization";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23666666'%3EArtwork%3C/text%3E%3C/svg%3E";

const ArtworkVisualizer = ({ artwork, isLoading, error }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [selectedRoom, setSelectedRoom] = useState("livingRoom");
  const [selectedRoomImageIndex, setSelectedRoomImageIndex] = useState(0);
  const [isCustom, setIsCustom] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const [isMobileVisualize, setIsMobileVisualize] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { data } = useGetArtVisulaization();

  console.log(data)

  const height = artwork?.data?.additionalInfo?.height;
  const width = artwork?.data?.additionalInfo?.width;
  const PX_TO_CM = 10;
  
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const roomImages = useMemo(() => {
    if (!data?.data)
      return {
        livingRoom: [],
        bedroom: [],
        kitchen: [],
        bathroom: [],
        office: [],
      };

    return {
      livingRoom:
        data.data["Living Room"]?.map((item) => ({
          url: `${imageUrl}/users/${item?.image}`,
          ...item,
        })) || [],
      bedroom: [],
      kitchen:
        data.data.Kitchen?.map((item) => ({
          url: `${imageUrl}/users/${item?.image}`,
          ...item,
        })) || [],
      bathroom: [],
      office:
        data.data.Office?.map((item) => ({
          url: `${imageUrl}/users/${item?.image}`,
          ...item,
        })) || [],
    };
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleMobileVisualization = () => {
    setIsMobileVisualize(!isMobileVisualize);
  };

  const fileInputRef = useRef(null);
  const visualizerRef = useRef(null);

  const rooms = useMemo(
    () => [
      {
        id: "livingRoom",
        name: "Living Room",
        images: roomImages.livingRoom,
        icon: FaImage,
      },
      {
        id: "bedroom",
        name: "Bedroom",
        images: roomImages.bedroom,
        icon: MdOutlineBedroomParent,
      },
      {
        id: "kitchen",
        name: "Kitchen",
        images: roomImages.kitchen,
        icon: MdKitchen,
      },
      {
        id: "bathroom",
        name: "Bathroom",
        images: roomImages.bathroom,
        icon: MdOutlineBathroom,
      },
      {
        id: "office",
        name: "Office",
        images: roomImages.office,
        icon: MdWorkOutline,
      },
    ],
    [roomImages]
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef?.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const handleCustom = () => {
    setIsCustom(!isCustom);
    if (!isCustom) {
      fileInputRef.current?.click();
    }
  };

  const currentRoom = rooms?.find((r) => r?.id === selectedRoom) || rooms[0];
  const currentImage = currentRoom.images[selectedRoomImageIndex % currentRoom.images.length];

  console.log("this is current image" ,currentImage)
  const roomBackgroundImage = currentImage?.url || placeholderImage;

 
  const bgClass = dark ? "bg-gray-900" : "bg-gray-50";
  const buttonBgClass = dark ? "bg-gray-800" : "bg-white";
  const buttonHoverClass = dark ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const borderClass = dark ? "border-gray-700" : "border-gray-200";

  const getArtworkPositionAndSize = () => {
    if (!currentImage) return { width: 100, height: 100, left: "50%", top: "50%" };

    const { dimension_width: widthCm, dimension_height: heightCm, area_x1, area_y1 } = currentImage;

  
    let widthPx, heightPx;
    
    if (isMobile) {
      widthPx = widthCm * 0.8;
      heightPx = heightCm * 8;
    } else if (isTablet) {
      widthPx = widthCm * 0.9;
      heightPx = heightCm * 9;
    } else {
      widthPx = widthCm;
      heightPx = heightCm * 10;
    }

   
    const left = `${area_x1}%`;
    const top = `${area_y1}%`;

    return {
      width: widthPx,
      height: heightPx,
      left,
      top,
    };
  };

  const artworkStyle = getArtworkPositionAndSize();


  console.log(artworkStyle)

  const visualizerDimensions = {
    height: isMobile ? "60vh" : isTablet ? "70vh" : "80vh",
    maxWidth: isFullscreen ? "100vw" : "100%",
  };

  return (
    <div className={`${bgClass} rounded-lg shadow-lg overflow-hidden w-full ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {!isFullscreen && (
        <Header 
          variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} 
          className="p-4 border-b flex justify-between items-center"
        >
          <span className="truncate">Visualize in Your Space</span>
          <div className="flex gap-2">
            {isMobileVisualize ? null : (
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
                aria-label="Toggle fullscreen"
              >
                <BsArrowsFullscreen size={18} />
              </button>
            )}
            <button
              onClick={handleMobileVisualization}
              className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
              aria-label="Mobile visualization"
            >
              <TbDeviceMobileRotated size={18} />
            </button>
          </div>
        </Header>
      )}

      {isMobileVisualize ? (
        <MobileArtworkVisualizer artwork={artwork} isLoading={isLoading} error={error} />
      ) : (
        <>
          <div className={`flex overflow-x-auto scrollbar-thin p-2 border-b ${borderClass} gap-2 sm:gap-3 md:justify-center`}>
            {rooms?.map((room) => {
              const RoomIcon = room?.icon;
              return (
                <button
                  key={room?.id}
                  onClick={() => {
                    setSelectedRoom(room.id);
                    setSelectedRoomImageIndex(0);
                  }}
                  className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors min-w-fit ${
                    selectedRoom === room.id
                      ? dark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                      : dark
                      ? "text-gray-400 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${room?.images?.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={room?.images?.length === 0}
                  aria-label={`View in ${room?.name}`}
                >
                  <RoomIcon size={20} className="sm:text-xl" />
                  <span className="text-xs mt-1 whitespace-nowrap">{room?.name}</span>
                  {room?.images?.length > 0 && !isMobile && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {room?.images?.length} {room?.images?.length === 1 ? "option" : "options"}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={handleCustom}
              className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors min-w-fit ${
                selectedRoom === "custom"
                  ? dark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                  : dark
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Upload custom room"
            >
              <AiOutlinePlus size={20} className="sm:text-xl" />
              <span className="text-xs mt-1 whitespace-nowrap">Custom</span>
            </button>
          </div>

          {selectedRoom !== "custom" && currentRoom.images && currentRoom.images.length > 1 && (
            <div className={`flex overflow-x-auto scrollbar-thin p-2 border-b ${borderClass} gap-2 md:justify-center`}>
              {currentRoom?.images?.map((img, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedRoomImageIndex(index)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                    selectedRoomImageIndex === index
                      ? dark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                      : dark
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  aria-label={`Room variant ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center w-full" style={{ height: visualizerDimensions.height }}>
            <div
              ref={visualizerRef}
              className="relative w-full h-full overflow-hidden"
              style={{
                // backgroundImage: `url(${roomBackgroundImage})`,
                backgroundColor : "red",
                backgroundSize: isMobile ? "cover" : "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                maxWidth: visualizerDimensions.maxWidth,
              }}
            >
              {currentImage && (
                <div
                  className="absolute bg-green-500 flex items-center justify-center bg"
                  style={{
                    width: `${artworkStyle?.width}px`,
                    height: `${artworkStyle?.height}px`,
                    left: artworkStyle?.left,
                    top: artworkStyle?.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={artwork?.data?.media?.mainImage ? `${lowImageUrl}/${artwork?.data?.media?.mainImage}` : placeholderImage}
                    alt={artwork?.artworkName || "Artwork"}
                    className="shadow-sm object-contain"
                    style={{
                      width: isMobile ? "80%" : width,
                      height: isMobile ? "80%" : height,
                    }}
                  />
                </div>
              )}

              {selectedRoom !== "custom" && currentRoom?.images && currentRoom?.images?.length > 1 && (
                <div className={`absolute ${isMobile ? "bottom-4 right-4" : "top-4 right-4"} flex gap-2`}>
                  <button
                    onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex - 1 + currentRoom?.images?.length) % currentRoom?.images?.length)}
                    className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
                    aria-label="Previous room variant"
                  >
                    <FaChevronLeft size={isMobile ? 12 : 16} />
                  </button>
                  <button
                    onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex + 1) % currentRoom?.images?.length)}
                    className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
                    aria-label="Next room variant"
                  >
                    <FaChevronRight size={isMobile ? 12 : 16} />
                  </button>
                </div>
              )}

              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                  aria-label="Exit fullscreen"
                >
                  <BsArrowsFullscreen size={18} />
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {isCustom && <CustomPop onClose={() => setIsCustom(false)} artwork={artwork} />}
    </div>
  );
};

export default ArtworkVisualizer;