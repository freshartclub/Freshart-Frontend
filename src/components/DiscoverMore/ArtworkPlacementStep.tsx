import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdKitchen, MdOutlineBathroom, MdOutlineBedroomParent, MdWorkOutline } from "react-icons/md";
import { TbDeviceMobileRotated } from "react-icons/tb";
import { useAppSelector } from "../../store/typedReduxHooks";
import Header from "../ui/Header";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import CustomPop from "./CustomPop";
import MobileArtworkVisualizer from "./MobileArtworkVisualizer";
import { useGetArtVisulaization } from "./http/useGetArtVisulaization";
import ArtWork from "../ArtistPortfolioPage/ArtWork";
import { Loader } from "lucide-react";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23666666'%3EArtwork%3C/text%3E%3C/svg%3E";

const ArtworkVisualizer = ({ artwork, isLoading, error }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [selectedRoom, setSelectedRoom] = useState("livingRoom");
  const [selectedRoomImageIndex, setSelectedRoomImageIndex] = useState(0);
  const [customImage, setCustomImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const [isMobileVisualize, setIsMobileVisualize] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading: visualizationLoading } = useGetArtVisulaization();

  // Convert backend data to room images format
  const roomImages = useMemo(() => {
    if (!data?.data) return {
      livingRoom: [],
      bedroom: [],
      kitchen: [],
      bathroom: [],
      office: []
    };

    return {
      livingRoom: data.data["Living Room"]?.map(item => ({
        url: `${imageUrl}/users/${item?.image}`,
        ...item
      })) || [],
      bedroom: data.data["Bed Room"]?.map(item => ({
        url: `${imageUrl}/users/${item?.image}`,
        ...item
      })) || [],
      kitchen: data.data.Kitchen?.map(item => ({
        url: `${imageUrl}/users/${item?.image}`,
        ...item
      })) || [],
      bathroom: data.data.bathroom?.map(item => ({
        url: `${imageUrl}/users/${item?.image}`,
        ...item
      })) || [],
      office: data.data.Office?.map(item => ({
        url: `${imageUrl}/users/${item?.image}`,
        ...item
      })) || []
    };
  }, [data]);

  const handleMobileVisualization = () => {
    setIsMobileVisualize(!isMobileVisualize);
  };

  const fileInputRef = useRef(null);
  const visualizerRef = useRef(null);
  const containerRef = useRef(null);

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
        id: "office",
        name: "Office",
        images: roomImages.office,
        icon: MdWorkOutline,
      },
    ],
    [roomImages]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedRoom === "livingRoom" && roomImages.livingRoom.length > 0) {
      setSelectedId(roomImages.livingRoom[0]?._id);
    } else if (selectedRoom === "kitchen" && roomImages.kitchen.length > 0) {
      setSelectedId(roomImages.kitchen[0]?._id);
    } else if (selectedRoom === "office" && roomImages.office.length > 0) {
      setSelectedId(roomImages.office[0]?._id);
    }
  }, [selectedRoom, roomImages]);

  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef?.current?.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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
  const roomBackgroundImage = customImage || (currentImage?.url || placeholderImage);

  const bgClass = dark ? "bg-gray-900" : "bg-gray-50";
  const buttonBgClass = dark ? "bg-gray-800" : "bg-white";
  const buttonHoverClass = dark ? "hover:bg-gray-700" : "hover:bg-gray-100";

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Calculate artwork position and size based on backend data
  const getArtworkPositionAndSize = () => {
    if (!currentImage) return { width: 100, height: 100, left: '50%', top: '50%' };

    const { dimension_width: widthCm, dimension_height: heightCm, area_x1, area_y1 , area_x2 , area_y2 } = currentImage;


    const widthPx = widthCm
    const heightPx = heightCm ;
   
    const left = area_x1 ;
    const top = area_y1;
    const bottom = area_y2;
    const right =  area_x2 

    return {
      width: widthPx,
      height: heightPx,
      left,
      top,
      bottom,
      right
    };
  };

  const artworkStyle = getArtworkPositionAndSize();

const getCalculatedValues = () => {
  const wallWidthCm = artworkStyle.width;
  const wallHeightCm = artworkStyle.height;

  const leftCm = artworkStyle.left;
  const rightCm = artworkStyle.right;
  const topCm = artworkStyle.top;
  const bottomCm = artworkStyle.bottom;

  
  const leftPercent = (leftCm / wallWidthCm) * 100;
  const rightPercent = (rightCm / wallWidthCm) * 100;
  const topPercent = (topCm / wallHeightCm) * 100;
  const bottomPercent = (bottomCm / wallHeightCm) * 100;

  const artworkHeight = (artwork?.data?.additionalInfo?.height / wallHeightCm ) * 100
const artworkWidth = (artwork?.data?.additionalInfo?.width / wallWidthCm) * 100

 
  const widthCm = wallWidthCm - leftCm - rightCm;
  const heightCm = wallHeightCm - topCm - bottomCm;
  const areaCm2 = widthCm * heightCm;

  return {
    leftPercent: leftPercent.toFixed(2) + '%',
    rightPercent: rightPercent.toFixed(2) + '%',
    topPercent: topPercent.toFixed(2) + '%',
    bottomPercent: bottomPercent.toFixed(2) + '%',
    widthCm,
    heightCm,
     artworkHeight : artworkHeight.toFixed(2) + '%' ,
    artworkWidth :artworkWidth.toFixed(2) + '%' ,
    areaCm2: areaCm2.toFixed(2), 
  };
};

const calculatedValues = getCalculatedValues()


if(visualizationLoading){
  return <Loader/>
}

// Mobile Version
if (isMobile) {
  return (
    <div className={`${bgClass} rounded-lg shadow-lg overflow-hidden w-full`}>
      <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="p-3 border-b flex justify-between items-center">
        <span className="truncate text-sm">Visualize in Your Space</span>
        <div className="flex gap-2">
          <button
            onClick={handleMobileVisualization}
            className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
            aria-label="Mobile visualization"
          >
            <TbDeviceMobileRotated size={16} />
          </button>
        </div>
      </Header>

      {isMobileVisualize ? <MobileArtworkVisualizer artwork={artwork} isLoading={isLoading} error={error} /> : null}

      <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-1">
        {rooms?.map((room) => {
          const RoomIcon = room?.icon;
          return (
            <button
              key={room?.id}
              onClick={() => {
                setSelectedRoom(room.id);
                setSelectedRoomImageIndex(0);
              }}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition-colors min-w-[60px] ${
                selectedRoom === room.id
                  ? dark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                  : dark
                    ? "text-gray-400 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
              disabled={room.images.length === 0}
            >
              <RoomIcon size={16} />
              <span className="text-xs mt-1 text-center leading-tight">{room.name.split(' ').join('\n')}</span>
            </button>
          );
        })}
        <button
          onClick={handleCustom}
          className={`flex flex-col items-center px-2 py-2 rounded-lg transition-colors min-w-[60px] ${
            selectedRoom === "custom"
              ? dark
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
              : dark
                ? "text-gray-400 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs mt-1">Custom</span>
        </button>
      </div>

      {selectedRoom !== "custom" && currentRoom?.images && currentRoom?.images?.length > 1 && (
        <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-2 justify-center">
          {currentRoom?.images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedRoomImageIndex(index);
                setSelectedId(img?._id);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm ${
                selectedRoomImageIndex === index
                  ? dark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                  : dark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        className="flex justify-center w-full p-2"
      >
        <div
          ref={visualizerRef}
          className="relative w-full h-[50vh] overflow-hidden rounded"
          style={{
            backgroundImage: `url(${roomBackgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          {currentImage && (
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: calculatedValues.leftPercent,
                top: calculatedValues.topPercent,
                right: calculatedValues.rightPercent,
                bottom: calculatedValues.bottomPercent,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img
                src={
                  artwork?.data?.media?.mainImage
                    ? `${lowImageUrl}/${artwork?.data?.media?.mainImage}`
                    : placeholderImage
                }
                alt={artwork?.artworkName || "Artwork"}
                className="shadow-sm object-contain"
                style={{
                  height: calculatedValues.artworkHeight,
                  width: calculatedValues.artworkWidth
                }}
              />
            </div>
          )}

          {selectedRoom !== "custom" && currentRoom.images && currentRoom.images.length > 1 && (
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex - 1 + currentRoom.images.length) % currentRoom.images.length)}
                className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
                aria-label="Previous room variant"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex + 1) % currentRoom.images.length)}
                className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
                aria-label="Next room variant"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {isCustom && <CustomPop onClose={() => setIsCustom(false)} artwork={artwork} />}
    </div>
  );
}

// Desktop/Tablet Version
return (
  <div className={`${bgClass} rounded-lg shadow-lg overflow-hidden w-full`}>
    <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="p-4 border-b flex justify-between items-center">
      <span className="truncate">Visualize in Your Space</span>
      <div className="flex gap-2">
        {isMobileVisualize ? null : <button
          onClick={toggleFullscreen}
          className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
          aria-label="Toggle fullscreen"
        >
          <BsArrowsFullscreen size={18} />
        </button>}
        <button
          onClick={handleMobileVisualization}
          className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
          aria-label="Mobile visualization"
        >
          <TbDeviceMobileRotated size={18} />
        </button>
      </div>
    </Header>

    {isMobileVisualize ? <MobileArtworkVisualizer artwork={artwork} isLoading={isLoading} error={error} /> : null}

    <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-2 sm:gap-3 md:justify-center">
      {rooms?.map((room) => {
        const RoomIcon = room?.icon;
        return (
          <button
            key={room?.id}
            onClick={() => {
              setSelectedRoom(room.id);
              setSelectedRoomImageIndex(0);
            }}
            className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors ${selectedRoom === room.id
              ? dark
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
              : dark
                ? "text-gray-400 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
              }`}
            disabled={room.images.length === 0}
          >
            <RoomIcon size={20} className="sm:text-xl" />
            <span className="text-xs mt-1 whitespace-nowrap">{room.name}</span>
          </button>
        );
      })}
      <button
        onClick={handleCustom}
        className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors ${selectedRoom === "custom"
          ? dark
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-800"
          : dark
            ? "text-gray-400 hover:bg-gray-800"
            : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        <AiOutlinePlus size={20} className="sm:text-xl" />
        <span className="text-xs mt-1 whitespace-nowrap">Custom</span>
      </button>
    </div>

    {selectedRoom !== "custom" && currentRoom?.images && currentRoom?.images?.length > 1 && (
      <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-2 md:justify-center">
        {currentRoom?.images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedRoomImageIndex(index);
              setSelectedId(img?._id);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${selectedRoomImageIndex === index
              ? dark
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
              : dark
                ? "bg-gray-800 text-gray-400"
                : "bg-gray-100 text-gray-600"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    )}

    <div
      ref={containerRef}
      style={{
        aspectRatio: "3/4",
      }}
      className="flex justify-center h-[80vh] w-full">
      <div
        ref={visualizerRef}
        className="relative w-full h-[80vh] overflow-hidden"
        style={{
          aspectRatio: "3/4",
          backgroundImage: `url(${roomBackgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {currentImage && (
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: calculatedValues.leftPercent,
              top: calculatedValues.topPercent,
              right: calculatedValues.rightPercent,
              bottom: calculatedValues.bottomPercent,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img
              src={
                artwork?.data?.media?.mainImage
                  ? `${lowImageUrl}/${artwork?.data?.media?.mainImage}`
                  : placeholderImage
              }
              alt={artwork?.artworkName || "Artwork"}
              className="shadow-sm object-contain"
              style={{
                height: calculatedValues.artworkHeight,
                width: calculatedValues.artworkWidth
              }}
            />
          </div>
        )}

        {selectedRoom !== "custom" && currentRoom.images && currentRoom.images.length > 1 && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex - 1 + currentRoom.images.length) % currentRoom.images.length)}
              className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
              aria-label="Previous room variant"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={() => setSelectedRoomImageIndex((prevIndex) => (prevIndex + 1) % currentRoom.images.length)}
              className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
              aria-label="Next room variant"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>

    {isCustom && <CustomPop onClose={() => setIsCustom(false)} artwork={artwork} />}
  </div>
);
};

export default ArtworkVisualizer;