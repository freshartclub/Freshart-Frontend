import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { lowImageUrl } from "../utils/baseUrls";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23666666'%3EArtwork%3C/text%3E%3C/svg%3E";

const RoomVisualization = ({
  artwork,
  rooms,
  selectedRoom,
  selectedRoomImageIndex,
  setSelectedRoomImageIndex,
  isMobile,
  isTablet,
  isDesktop,
  isFullscreen,
  dark,
}) => {
  const visualizerRef = useRef(null);
  const currentRoom = rooms?.find((r) => r?.id === selectedRoom) || rooms[0];
  const currentImage = currentRoom.images[selectedRoomImageIndex % currentRoom.images.length];
  const roomBackgroundImage = currentImage?.url || placeholderImage;

  const height = artwork?.data?.additionalInfo?.height;
  const width = artwork?.data?.additionalInfo?.width;

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef?.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const visualizerDimensions = {
    height: isMobile ? "60vh" : isTablet ? "70vh" : "80vh",
    maxWidth: isFullscreen ? "100vw" : "100%",
  };

  return (
    <>
      {selectedRoom !== "custom" && currentRoom?.images && currentRoom?.images?.length > 1 && (
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
            backgroundImage: `url(${roomBackgroundImage})`,
            backgroundSize: isMobile ? "cover" : "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            maxWidth: visualizerDimensions?.maxWidth,
          }}
        >
          {currentImage && (
            <div
              className="absolute bg-green-300 flex items-center justify-center bg"
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
  );
};

export default RoomVisualization;