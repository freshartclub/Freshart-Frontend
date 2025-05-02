import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineLoading3Quarters, AiOutlineArrowLeft } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsArrowsMove } from 'react-icons/bs';
import { useAppSelector } from '../../store/typedReduxHooks';
import useGetArtworkDetails from '../pages/http/useGetArtworkDetails';
import Button from '../ui/Button';
import P from '../ui/P';
import Header from '../ui/Header';

/**
 * MobileArtworkVisualizer - AR-like visualization for mobile devices
 * Allows users to see artwork in their space using device camera
 */
const MobileArtworkVisualizer = () => {
  const { artworkId } = useParams();
  const dark = useAppSelector((state) => state.theme.mode);
  const { data: artwork, isLoading } = useGetArtworkDetails(artworkId);
  
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [artworkScale, setArtworkScale] = useState(1);
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [instructionStep, setInstructionStep] = useState(0);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
  }, []);

  // Request and setup camera when activated
  useEffect(() => {
    if (cameraActive) {
      const setupCamera = async () => {
        try {
          const constraints = {
            video: {
              facingMode: 'environment',
              width: { ideal: window.innerWidth },
              height: { ideal: window.innerHeight }
            }
          };
          
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          streamRef.current = stream;
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraPermission('granted');
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          setCameraPermission('denied');
          setCameraActive(false);
        }
      };
      
      setupCamera();
      
      // Cleanup function
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [cameraActive]);

  // Handle camera activation
  const handleStartCamera = async () => {
    setCameraActive(true);
    setInstructionStep(1);
  };

  // Handle back button
  const handleBack = () => {
    if (instructionStep > 0) {
      setInstructionStep(instructionStep - 1);
      if (instructionStep === 1) {
        setCameraActive(false);
      }
    } else {
      // Navigate back
      window.history.back();
    }
  };

  // Handle next instruction step
  const handleNextStep = () => {
    setInstructionStep(instructionStep + 1);
  };

  // Instruction content based on current step
  const getInstructionContent = () => {
    switch (instructionStep) {
      case 0:
        return {
          title: "Visualize Artwork in Your Space",
          text: "Use your camera to see how this artwork would look in your room.",
          action: "Start Camera"
        };
      case 1:
        return {
          title: "Point Camera at Wall",
          text: "Find a suitable wall space where you'd like to visualize the artwork.",
          action: "Next"
        };
      case 2:
        return {
          title: "Position Artwork",
          text: "Drag to position and use the controls to resize the artwork.",
          action: null
        };
      default:
        return {
          title: "Visualize Artwork",
          text: "Drag and resize to see how it fits in your space.",
          action: null
        };
    }
  };

  const instruction = getInstructionContent();

  // UI Theme classes
  const bgClass = dark ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = dark ? 'text-gray-100' : 'text-gray-800';
  const buttonBgClass = dark ? 'bg-gray-800' : 'bg-white';
  const buttonHoverClass = dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  if (isLoading) {
    return (
      <div className={`${bgClass} min-h-screen flex items-center justify-center ${textClass}`}>
        <AiOutlineLoading3Quarters className="animate-spin mr-2" size={24} />
        <span>Loading artwork details...</span>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className={`${bgClass} min-h-screen p-4 ${textClass}`}>
        <div className="max-w-md mx-auto bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6">
          <Header 
            variant={{ size: 'lg', theme: dark ? 'light' : 'dark', weight: 'semiBold' }} 
            className="mb-4"
          >
            Mobile Device Required
          </Header>
          <P variant={{ size: 'base', theme: dark ? 'light' : 'dark', weight: 'normal' }} className="mb-4">
            This feature requires a mobile device with a camera. Please open this link on your smartphone or tablet.
          </P>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => window.history.back()}
              variant={{
                theme: dark ? "light" : "dark",
                rounded: "lg",
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Camera View */}
      {cameraActive && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Non-camera background */}
      {!cameraActive && (
        <div className={`absolute inset-0 ${bgClass}`}></div>
      )}
      
      {/* Artwork overlay when camera is active and instructions are done */}
      {cameraActive && instructionStep >= 2 && (
        <motion.div
          drag
          dragMomentum={false}
          initial={{ x: artworkPosition.x, y: artworkPosition.y, opacity: 0 }}
          animate={{ x: artworkPosition.x, y: artworkPosition.y, opacity: 1 }}
          transition={{ opacity: { duration: 0.5 } }}
          className="absolute cursor-move"
          style={{ 
            top: '50%', 
            left: '50%',
            marginLeft: '-150px', // Half of artwork width
            marginTop: '-100px'  // Half of artwork height
          }}
          onDragEnd={(_, info) => {
            setArtworkPosition({
              x: artworkPosition.x + info.offset.x,
              y: artworkPosition.y + info.offset.y
            });
          }}
        >
          <img 
            src={artwork?.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=Artwork'} 
            alt={artwork?.artworkName || 'Artwork'}
            className="shadow-xl"
            style={{ 
              transform: `scale(${artworkScale})`,
              transition: 'transform 0.3s ease',
              maxWidth: '300px'
            }}
          />
          
          {/* Drag indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
            <BsArrowsMove size={40} color="white" />
          </div>
        </motion.div>
      )}
      
      {/* Header with back button */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center z-10">
        <button 
          onClick={handleBack}
          className={`p-2 rounded-full ${buttonBgClass} shadow-lg`}
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        {artwork && (
          <Header 
            variant={{ size: 'base', theme: dark ? 'light' : 'dark', weight: 'semiBold' }}
            className="ml-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
          >
            {artwork.artworkName}
          </Header>
        )}
      </div>
      
      {/* Instructions Panel */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${instructionStep >= 2 ? 'pb-20' : 'pb-4'}`}>
        <div className={`${buttonBgClass} rounded-lg shadow-lg p-4 bg-opacity-90 backdrop-blur-sm`}>
          <Header 
            variant={{ size: 'lg', theme: dark ? 'light' : 'dark', weight: 'semiBold' }}
            className="mb-2"
          >
            {instruction.title}
          </Header>
          
          <P variant={{ size: 'base', theme: dark ? 'light' : 'dark', weight: 'normal' }} className="mb-4">
            {instruction.text}
          </P>
          
          {instruction.action && (
            <Button
              onClick={instructionStep === 0 ? handleStartCamera : handleNextStep}
              variant={{
                theme: dark ? "light" : "dark",
                rounded: "lg",
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              {instructionStep === 0 && <AiOutlineCamera size={20} />}
              {instruction.action}
            </Button>
          )}
          
          {/* Permission denied message */}
          {cameraPermission === 'denied' && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              Camera access was denied. Please enable camera permissions in your browser settings.
            </div>
          )}
        </div>
      </div>
      
      {/* Size controls when artwork is shown */}
      {instructionStep >= 2 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
          <button 
            onClick={() => setArtworkScale(Math.max(artworkScale - 0.1, 0.2))}
            className={`p-3 rounded-full ${buttonBgClass} shadow-lg`}
            aria-label="Decrease size"
          >
            <FaChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setArtworkScale(Math.min(artworkScale + 0.1, 2))}
            className={`p-3 rounded-full ${buttonBgClass} shadow-lg`}
            aria-label="Increase size"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileArtworkVisualizer;