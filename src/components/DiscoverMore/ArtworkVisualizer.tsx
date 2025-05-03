import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaImage, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BsArrowsFullscreen, BsQrCode } from 'react-icons/bs';
import { MdOutlineBedroomParent, MdKitchen, MdOutlineBathroom, MdWorkOutline } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAppSelector } from '../../store/typedReduxHooks';
import Button from '../ui/Button';
import P from '../ui/P';
import Header from '../ui/Header';
import { imageUrl } from '../utils/baseUrls';
import CustomPop from './CustomPop';

// High-quality room images
const roomImages = {
  livingRoom: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  bedroom: [
    'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1617325247952-c01021784e29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556911073-a517e752729c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1570222094114-d337fe36e484?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  bathroom: [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1600566752547-20a195f59bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  office: [
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1626897793786-7fdb3a0ca2b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ]
};

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23666666'%3EArtwork%3C/text%3E%3C/svg%3E";

const ArtworkVisualizer = ({ artwork }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [selectedRoom, setSelectedRoom] = useState('livingRoom');
  const [selectedRoomImageIndex, setSelectedRoomImageIndex] = useState(0);
  const [customImage, setCustomImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [artworkScale, setArtworkScale] = useState(1);
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [isCustom, setIsCustom] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const fileInputRef = useRef(null);
  const visualizerRef = useRef(null);

  // Define rooms with their configurations
  const rooms = useMemo(() => [
    {
      id: 'livingRoom',
      name: 'Living Room',
      images: roomImages.livingRoom,
      icon: FaImage,
      defaultPosition: { x: 0, y: 0 },
      defaultScale: 0.8
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      images: roomImages.bedroom,
      icon: MdOutlineBedroomParent,
      defaultPosition: { x: 0, y: -20 },
      defaultScale: 0.7
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      images: roomImages.kitchen,
      icon: MdKitchen,
      defaultPosition: { x: 0, y: -10 },
      defaultScale: 0.6
    },
    {
      id: 'bathroom',
      name: 'Bathroom',
      images: roomImages.bathroom,
      icon: MdOutlineBathroom,
      defaultPosition: { x: 0, y: 0 },
      defaultScale: 0.5
    },
    {
      id: 'office',
      name: 'Office',
      images: roomImages.office,
      icon: MdWorkOutline,
      defaultPosition: { x: 0, y: -15 },
      defaultScale: 0.75
    }
  ], []);

  // Listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update artwork position and scale when changing rooms
  useEffect(() => {
    const currentRoom = rooms.find(room => room.id === selectedRoom);
    if (currentRoom) {
      setArtworkPosition(currentRoom.defaultPosition);
      setArtworkScale(currentRoom.defaultScale);
    }
  }, [selectedRoom, rooms]);

  // Handle fullscreen changes
  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        setSelectedRoom('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef.current?.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCustom = () => {
    
      setIsCustom(!isCustom);
    
  };

  // Get current room data
  const currentRoom = rooms.find(r => r.id === selectedRoom) || rooms[0];
  const roomBackgroundImage = customImage || 
    (currentRoom.images && currentRoom.images[selectedRoomImageIndex % currentRoom.images.length]);

  // Theme classes
  const bgClass = dark ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = dark ? 'text-gray-100' : 'text-gray-800';
  const buttonBgClass = dark ? 'bg-gray-800' : 'bg-white';
  const buttonHoverClass = dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const borderClass = dark ? 'border-gray-700' : 'border-gray-200';

  // Responsive values
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const visualizerHeight = isFullscreen 
    ? 'h-screen' 
    : isMobile 
      ? 'h-64'
      : isTablet
        ? 'h-96'
        : 'h-[500px]';

  // Determine max artwork size based on screen size
  const getMaxArtworkSize = () => {
    if (isMobile) return 200;
    if (isTablet) return 300;
    return 400;
  };
  
  const maxArtworkSize = getMaxArtworkSize();

  return (
    <div className={`${bgClass} rounded-lg shadow-lg overflow-hidden w-full`}>
      <Header 
        variant={{ size: 'lg', theme: dark ? 'light' : 'dark', weight: 'semiBold' }} 
        className="p-4 border-b flex justify-between items-center"
      >
        <span className="truncate">Visualize in Your Space</span>
        <div className="flex gap-2">
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} transition-colors duration-200`}
            aria-label="Toggle fullscreen"
          >
            <BsArrowsFullscreen size={18} />
          </button>
        </div>
      </Header>

      {/* Room selection tabs - horizontally scrollable on mobile */}
      <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-2 sm:gap-3 md:justify-center">
        {rooms.map(room => {
          const RoomIcon = room.icon;
          return (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoom(room.id);
                setSelectedRoomImageIndex(0); 
              }}
              className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors ${
                selectedRoom === room.id
                  ? (dark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')
                  : (dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              <RoomIcon size={20} className="sm:text-xl" />
              <span className="text-xs mt-1 whitespace-nowrap">{room.name}</span>
            </button>
          );
        })}
        <button
          onClick={handleCustom}
          className={`flex flex-col items-center px-3 py-2 sm:px-4 rounded-lg transition-colors ${
            selectedRoom === 'custom'
              ? (dark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')
              : (dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
          }`}
        >
          <AiOutlinePlus size={20} className="sm:text-xl" />
          <span className="text-xs mt-1 whitespace-nowrap">Custom</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
      
      {/* Room variant selection - only show when there are multiple images */}
      {selectedRoom !== 'custom' && currentRoom.images && currentRoom.images.length > 1 && (
        <div className="flex overflow-x-auto scrollbar-thin p-2 border-b gap-2 md:justify-center">
          {currentRoom.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedRoomImageIndex(index)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedRoomImageIndex === index
                  ? (dark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')
                  : (dark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600')
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Visualizer area */}
      <div 
        ref={visualizerRef}
        className={`relative ${visualizerHeight} overflow-hidden`}
        style={{
          backgroundImage: `url(${roomBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Draggable artwork */}
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={visualizerRef}
          initial={{ x: artworkPosition.x, y: artworkPosition.y }}
          animate={{ x: artworkPosition.x, y: artworkPosition.y }}
          className="absolute cursor-move"
          style={{ 
            top: '50%', 
            left: '50%',
            marginLeft: `-${maxArtworkSize / 4}px`,
            marginTop: `-${maxArtworkSize / 4}px`
          }}
          onDragEnd={(_, info) => {
            setArtworkPosition({
              x: artworkPosition.x + info.offset.x,
              y: artworkPosition.y + info.offset.y
            });
          }}
          whileHover={{
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)"
          }}
          whileTap={{ 
            cursor: "grabbing",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)"
          }}
        >
          <img 
            src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || placeholderImage} 
            alt={artwork?.artworkName || 'Artwork'}
            className="shadow-xl rounded-sm"
            style={{ 
              transform: `scale(${artworkScale})`,
              transition: 'transform 0.3s ease',
              maxWidth: `${maxArtworkSize}px`,
              maxHeight: `${maxArtworkSize}px`,
              width: 'auto',
              height: 'auto'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </motion.div>

        {/* Resize controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button 
            onClick={() => setArtworkScale(Math.max(artworkScale - 0.1, 0.2))}
            className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
            aria-label="Decrease size"
          >
            <FaMinus size={isMobile ? 12 : 16} />
          </button>
          <button 
            onClick={() => setArtworkScale(Math.min(artworkScale + 0.1, 2))}
            className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
            aria-label="Increase size"
          >
            <FaPlus size={isMobile ? 12 : 16} />
          </button>
        </div>

        {/* Navigation controls for room variants */}
        {selectedRoom !== 'custom' && currentRoom.images && currentRoom.images.length > 1 && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setSelectedRoomImageIndex((prevIndex) => 
                (prevIndex - 1 + currentRoom.images.length) % currentRoom.images.length
              )}
              className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
              aria-label="Previous room variant"
            >
              <FaChevronLeft size={isMobile ? 12 : 16} />
            </button>
            <button 
              onClick={() => setSelectedRoomImageIndex((prevIndex) => 
                (prevIndex + 1) % currentRoom.images.length
              )}
              className={`p-2 rounded-full ${buttonBgClass} ${buttonHoverClass} shadow-lg`}
              aria-label="Next room variant"
            >
              <FaChevronRight size={isMobile ? 12 : 16} />
            </button>
          </div>
        )}

        {/* Helper text */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-xs sm:text-sm shadow-lg max-w-full truncate">
          {isMobile ? "Drag to position • Resize" : "Drag artwork to position • Use controls to resize • Triple Click"}
        </div>
      </div>
      
      {/* Custom image popup */}
      {isCustom && <CustomPop onClose={() => setIsCustom(false)} artwork={artwork} />}
    </div>
  );
};

export default ArtworkVisualizer;