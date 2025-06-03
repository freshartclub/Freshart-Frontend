import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Home, Bed, ChefHat, Briefcase, Plus, AlertTriangle, CheckCircle, Info, StoreIcon } from 'lucide-react';
import { useAppSelector } from '../../store/typedReduxHooks';
import { useGetArtVisulaization } from './http/useGetArtVisulaization';
import { imageUrl } from '../utils/baseUrls';
import { original } from '@reduxjs/toolkit';
import Loader from '../ui/Loader';
import { TbDeviceMobileRotated } from 'react-icons/tb';
import MobileArtworkVisualizer from './MobileArtworkVisualizer';
import CustomPop from './CustomPop';

const ArtworkVisualizer = ({ artwork: orignalArtwork, isLoading, error }) => {

  const [selectedRoom, setSelectedRoom] = useState('livingRoom');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [customBackground, setCustomBackground] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isAuthorized = useAppSelector((state) => state.user.isAuthorized)

  const dark = useAppSelector((state) => state.theme.mode);

  const [selectedRoomImageIndex, setSelectedRoomImageIndex] = useState(0);
  const [customImage, setCustomImage] = useState(null);

  const [isCustom, setIsCustom] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const [isMobileVisualize, setIsMobileVisualize] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fileInputRef = useRef(null);
  const visualizerRef = useRef(null);

  const userId = useAppSelector((state) => state?.user?.user?._id)


  const { data, isLoading: visualizationLoading } = useGetArtVisulaization(userId);

  const [roomData, setRoomData] = useState({
    livingRoom: [],
    bedroom: [],
    kitchen: [],
    bathroom: [],
    office: [],
    custom: []
  });

  useEffect(() => {
    if (!data?.data) return;

    const mapRoomItems = (items) =>
      items?.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name || "Untitled Room",
        backgroundUrl: `${imageUrl}/users/${item?.image}`,
        wallWidth: item.dimension_width || item?.width || 400,
        wallHeight: item.dimension_height || item?.height || 280,
        artworkArea: item.artworkArea || {
          x1: item.area_x1,
          y1: item.area_y1,
          x2: item.area_x2,
          y2: item.area_y2
        }
      })) || [];

    const livingRoom = mapRoomItems(data.data["Living Room"]);
    const bedroom = mapRoomItems(data.data["Bed Room"]);
    const kitchen = mapRoomItems(data.data.Kitchen);
    const bathroom = mapRoomItems(data.data.bathroom);
    const office = mapRoomItems(data.data.Office);
    const custom = mapRoomItems(data?.images)

    const allRooms = { livingRoom, bedroom, kitchen, bathroom, office, custom };


    Object.values(allRooms).flat().forEach(room => {
      if (room?.backgroundUrl) {
        const img = new Image();
        img.src = room.backgroundUrl;
      }
    });


    setRoomData(allRooms);

  }, [data, imageUrl]);

  console.log(roomData)


  const artwork = {
    imageUrl: `${imageUrl}/users/${orignalArtwork?.data?.media?.mainImage}`,
    name: orignalArtwork?.data?.artworkName,
    width: orignalArtwork?.data?.additionalInfo?.width,
    height: orignalArtwork?.data?.additionalInfo?.height
  };

  const rooms = [
    { id: 'livingRoom', name: 'Living Room', icon: Home },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
    { id: 'office', name: 'Office', icon: Briefcase },

    { id: 'custom', name: 'Custom', icon: StoreIcon }
  ];

  const currentRoomVariants = roomData[selectedRoom] || [];
  const currentRoom = currentRoomVariants[selectedVariant] || currentRoomVariants[0];


  const calculateArtworkStyle = useMemo(() => {

    if (!currentRoom) return { fits: false };

    const { wallWidth, wallHeight, artworkArea } = currentRoom;
    const { x1, y1, x2, y2 } = artworkArea;


    const availableWidth = wallWidth - x1 - x2;
    const availableHeight = wallHeight - y1 - y2;


    if (availableWidth <= 0 || availableHeight <= 0) {
      return {
        fits: false,
        fitStatus: 'no-space',
        error: 'Margins exceed wall dimensions'
      };
    }


    const fitsAtOriginalSize = artwork.width <= availableWidth && artwork.height <= availableHeight;


    const minScaleX = artwork.width / availableWidth;
    const minScaleY = artwork.height / availableHeight;
    const minScaleNeeded = Math.max(minScaleX, minScaleY);


    const canFitWithScaling = minScaleNeeded <= 1;

    if (!canFitWithScaling) {
      return {
        fits: false,
        fitStatus: 'too-large',
        minScaleNeeded,
        availableSpace: { width: availableWidth, height: availableHeight }
      };
    }


    const scaleToFitWidth = availableWidth / artwork.width;
    const scaleToFitHeight = availableHeight / artwork.height;


    const optimalScale = Math.min(scaleToFitWidth, scaleToFitHeight, 1);


    const scaledWidth = artwork.width * optimalScale;
    const scaledHeight = artwork.height * optimalScale;


    const centerX = x1 + (availableWidth - scaledWidth) / 2;
    const centerY = y1 + (availableHeight - scaledHeight) / 2;


    const leftPercent = (centerX / wallWidth) * 100;
    const topPercent = (centerY / wallHeight) * 100;
    const widthPercent = (scaledWidth / wallWidth) * 100;
    const heightPercent = (scaledHeight / wallHeight) * 100;


    let fitStatus = 'perfect';
    if (fitsAtOriginalSize && optimalScale === 1) {
      fitStatus = 'perfect';
    } else if (optimalScale < 1) {
      fitStatus = 'scaled-down';
    } else {
      fitStatus = 'fits';
    }

    return {

      left: `${leftPercent.toFixed(2)}%`,
      top: `${topPercent.toFixed(2)}%`,
      width: `${widthPercent.toFixed(2)}%`,
      height: `${heightPercent.toFixed(2)}%`,


      scale: optimalScale,
      fits: true,
      fitsAtOriginalSize,
      fitStatus,


      availableSpace: {
        width: availableWidth,
        height: availableHeight
      },
      finalDimensions: {
        width: scaledWidth,
        height: scaledHeight
      },
      margins: {
        left: x1,
        top: y1,
        right: x2,
        bottom: y2
      },

      
      minScaleNeeded: minScaleNeeded,
      wasScaled: optimalScale < 1,
      centerPosition: {
        x: centerX,
        y: centerY
      }
    };
  }, [currentRoom, artwork]);

  const handleCustomUpload = (event) => {
    setIsCustom(!isCustom);
    if (!isCustom) {
      fileInputRef.current?.click();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const backgroundImage = customBackground || currentRoom?.backgroundUrl;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const buttonBgClass = dark ? "bg-gray-800" : "bg-white";
  const buttonHoverClass = dark ? "hover:bg-gray-700" : "hover:bg-gray-100";

  const handleMobileVisualization = () => {
    setIsMobileVisualize(!isMobileVisualize);
  };

  if (visualizationLoading) {
    return <Loader />
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

      <div className="bg-gray-50 px-6 py-4 border-b flex  justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Artwork Visualizer</h2>

        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
          <button
            onClick={handleMobileVisualization}
            className={`p-1.5 sm:p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
            aria-label="Mobile visualization"
          >
            <TbDeviceMobileRotated size={isMobile ? 14 : 18} />
          </button>
        </div>
      </div>

      {isMobileVisualize ? <MobileArtworkVisualizer artwork={artwork} isLoading={isLoading} error={error} /> : null}

      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-2 justify-center">
          {rooms?.map((room) => {
            const Icon = room?.icon;

            if (room?.name === 'Custom' && !isAuthorized) return null;

            return (
              <button
                key={room?.id}
                onClick={() => {
                  setSelectedRoom(room?.id);
                  setSelectedVariant(0);
                  setCustomBackground(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedRoom === room?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{room?.name}</span>
              </button>
            );
          })}

          {isAuthorized ? <button
            onClick={handleCustomUpload}
            className={`flex flex-col items-center px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 rounded-lg transition-colors whitespace-nowrap ${selectedRoom === "custom"
              ? dark
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
              : dark
                ? "text-gray-400 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <Plus size={isMobile ? 16 : isTablet ? 18 : 20} />
            <span className="text-xs mt-1">Custom</span>
          </button> : null}

          
        </div>
      </div>


      {currentRoom && (
        <div className="px-6 py-3 border-b">

          {calculateArtworkStyle?.fitStatus === 'too-large' && (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="font-medium text-red-800">Artwork Too Large</div>
                <div className="text-sm text-red-600">
                  This artwork ({artwork?.width}×{artwork?.height}cm) is too large for the available space
                  ({calculateArtworkStyle?.availableSpace?.width?.toFixed(1)}×{calculateArtworkStyle?.availableSpace?.height?.toFixed(1)}cm)
                  Consider choosing a smaller artwork or a different room.
                </div>
              </div>
            </div>
          )}

          {calculateArtworkStyle?.fitStatus === 'scaled-down' && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Info className="text-yellow-600 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="font-medium text-yellow-800">Artwork Scaled Down</div>
                <div className="text-sm text-yellow-700">
                  This artwork has been scaled to {(calculateArtworkStyle.scale * 100).toFixed(0)}%
                  to fit the available space. Actual display size will be {calculateArtworkStyle.finalDimensions.width.toFixed(1)}×{calculateArtworkStyle.finalDimensions.height.toFixed(1)}cm.
                </div>
              </div>
            </div>
          )}

          {calculateArtworkStyle?.fitStatus === 'perfect' && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="font-medium text-green-800">Perfect Fit</div>
                <div className="text-sm text-green-700">
                  This artwork fits perfectly in the selected space at its actual size
                  ({artwork.width}×{artwork.height}cm).
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {currentRoomVariants?.length > 1 && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex gap-2 justify-center">
            {currentRoomVariants?.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${selectedVariant === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
              >
                {index + 1}
              </button>
            ))}

          </div>
        </div>
      )}


      <div className="p-6">
        <span className="text-base px-2">
          {currentRoom?.name}
        </span>

        <div
          ref={visualizerRef}
          className="relative w-full mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-inner"
          style={{
            aspectRatio: currentRoom ? `${currentRoom?.wallWidth}/${currentRoom?.wallHeight}` : '4/3',
            maxHeight: '70vh'
          }}
        >

          {backgroundImage && (
            <img
              src={backgroundImage}
              alt="Room background"
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}


          {currentRoom && (
            <div
              className="absolute border-2 border-dashed border-red-300 bg-red-50 bg-opacity-30"
              style={{
                left: `${(currentRoom?.artworkArea.x1 / currentRoom?.wallWidth) * 100}%`,
                top: `${(currentRoom?.artworkArea.y1 / currentRoom?.wallHeight) * 100}%`,
                right: `${(currentRoom?.artworkArea.x2 / currentRoom?.wallWidth) * 100}%`,
                bottom: `${(currentRoom?.artworkArea.y2 / currentRoom?.wallHeight) * 100}%`
              }}
            />
          )}


          {currentRoom && calculateArtworkStyle?.fits && (
            <div
              className="absolute flex items-center justify-center"
              style={calculateArtworkStyle}
            >
              <img
                src={artwork?.imageUrl}
                alt={artwork?.name}
                className={`max-w-full max-h-full object-contain shadow-lg rounded transition-opacity duration-300 ${calculateArtworkStyle?.fitStatus === 'scaled-down' ? 'opacity-80' : 'opacity-100'
                  }`}
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                }}
              />

              {/* Scale indicator for scaled artwork */}
              {calculateArtworkStyle?.fitStatus === 'scaled-down' && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {(calculateArtworkStyle?.scale * 100).toFixed(0)}%
                </div>
              )}
            </div>
          )}


          {currentRoom && !calculateArtworkStyle?.fits && (
            <div
              className="absolute flex items-center justify-center bg-red-100 border-2 border-dashed border-red-300 rounded-lg"
              style={{
                left: `${(currentRoom?.artworkArea.x1 / currentRoom?.wallWidth) * 100}%`,
                top: `${(currentRoom?.artworkArea.y1 / currentRoom?.wallHeight) * 100}%`,
                right: `${(currentRoom?.artworkArea.x2 / currentRoom?.wallWidth) * 100}%`,
                bottom: `${(currentRoom?.artworkArea.y2 / currentRoom?.wallHeight) * 100}%`
              }}
            >
              <div className="text-center text-red-600 p-4">
                <AlertTriangle size={32} className="mx-auto mb-2" />
                <div className="font-medium">Artwork Too Large</div>
                <div className="text-sm">
                  {artwork.width}×{artwork.height}cm
                </div>
                <div className="text-xs mt-1">
                  Available: {calculateArtworkStyle?.availableSpace?.width.toFixed(1)}×{calculateArtworkStyle?.availableSpace?.height?.toFixed(1)}cm
                </div>
              </div>
            </div>
          )}


          {currentRoomVariants?.length > 1 && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setSelectedVariant((prev) =>
                  prev === 0 ? currentRoomVariants.length - 1 : prev - 1
                )}
                className="p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setSelectedVariant((prev) =>
                  (prev + 1) % currentRoomVariants.length
                )}
                className="p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>


        {currentRoom && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {artwork?.width} × {artwork?.height} cm
                </div>
                <div className="text-sm text-gray-600">Artwork Size</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {calculateArtworkStyle?.availableSpace?.width?.toFixed(1)} × {calculateArtworkStyle?.availableSpace?.height?.toFixed(1)} cm
                </div>
                <div className="text-sm text-gray-600">Available Space</div>
              </div>
              <div>
                <div className={`text-lg font-semibold ${calculateArtworkStyle?.fits ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateArtworkStyle?.fits ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600">Fits in Space</div>
              </div>
              {/* <div>
                <div className="text-lg font-semibold text-gray-800">
                  {calculateArtworkStyle?.fits
                    ? `${calculateArtworkStyle?.finalDimensions?.width?.toFixed(1)} × ${calculateArtworkStyle?.finalDimensions?.height?.toFixed(1)} cm`
                    : 'N/A'
                  }
                </div>
                <div className="text-sm text-gray-600">Display Size</div>
              </div> */}
              <div>
                <div className={`text-lg font-semibold ${calculateArtworkStyle?.scale === 1 ? 'text-green-600' :
                  calculateArtworkStyle?.scale < 1 ? 'text-yellow-600' : 'text-gray-800'
                  }`}>
                  {calculateArtworkStyle?.fits
                    ? `${(calculateArtworkStyle?.scale * 100).toFixed(0)}%`
                    : `${(calculateArtworkStyle?.minScaleNeeded * 100).toFixed(0)}% needed`
                  }
                </div>
                <div className="text-sm text-gray-600">Scale Factor</div>
              </div>

              <div><div className={`text-lg font-semibold `}>
                  {currentRoom?.wallWidth +" x "+ currentRoom.wallHeight + " "
                  } cm
                </div>
                <div>Wall Size</div>
                </div>
             
            </div>


            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700">Status: </span>
                <span className={`text-sm font-semibold ${calculateArtworkStyle?.fitStatus === 'perfect' ? 'text-green-600' :
                  calculateArtworkStyle?.fitStatus === 'scaled-down' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                  {calculateArtworkStyle?.fitStatus === 'perfect' ? 'Perfect Fit' :
                    calculateArtworkStyle?.fitStatus === 'scaled-down' ? 'Scaled to Fit' :
                      'Too Large for Space'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {isCustom && <CustomPop onClose={() => setIsCustom(false)} artwork={orignalArtwork} />}

    </div>
  );
};

export default ArtworkVisualizer;