import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsArrowsMove } from 'react-icons/bs';
import { AiOutlineCamera, AiOutlineLoading3Quarters, AiOutlineArrowLeft } from 'react-icons/ai';
import { useAppSelector } from '../../store/typedReduxHooks';

import Button from '../ui/Button';
import P from '../ui/P';
import Header from '../ui/Header';

import { imageUrl } from '../utils/baseUrls';


const MobileArtworkVisualizer = ({artwork, isLoading , error}) => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [artworkScale, setArtworkScale] = useState(1);
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [instructionStep, setInstructionStep] = useState(0);
  const [takingPhoto, setTakingPhoto] = useState(false);
  
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const artworkContainerRef = useRef(null);

 
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
    
   
    const handleResize = () => {
      if (videoRef.current && streamRef.current) {
        
        const track = streamRef.current.getVideoTracks()[0];
        if (track) {
          const capabilities = track.getCapabilities();
          if (capabilities) {
            const constraints = {
              width: { ideal: window.innerWidth },
              height: { ideal: window.innerHeight }
            };
            track.applyConstraints(constraints).catch(err => console.error('Error applying constraints:', err));
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (cameraActive) {
    const setupCamera = async () => {
  try {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    const constraints = {
      video: {
        facingMode: 'environment',
        // Let the browser choose optimal resolution
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    streamRef.current = stream;
    
    // Try to disable zoom if supported
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack && 'applyConstraints' in videoTrack) {
      try {
        await videoTrack.applyConstraints({
          advanced: [{ zoom: 1 }]
        });
      } catch (zoomError) {
        console.log('Zoom adjustment not supported');
      }
    }
    
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
      
     
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [cameraActive]);

 
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

 
  useEffect(() => {
    if (instructionStep === 2 && artworkContainerRef.current) {
      // Center positioning logic
      setArtworkPosition({ x: 0, y: 0 });
    }
  }, [instructionStep]);

  const handleStartCamera = async () => {
    setCameraActive(true);
    setInstructionStep(1);
  };

  const handleBack = () => {
    if (instructionStep > 0) {
      setInstructionStep(instructionStep - 1);
      if (instructionStep === 1) {
        setCameraActive(false);
      }
    } else {
      navigate(-1);
    }
  };
  
  const handleNextStep = () => {
    setInstructionStep(instructionStep + 1);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setTakingPhoto(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    
  
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    
    if (artworkContainerRef.current && artwork?.images?.[0]?.url) {
     
      const artworkRect = artworkContainerRef?.current?.getBoundingClientRect();
      const videoRect = video?.getBoundingClientRect();
      
      
      const xRatio = canvas?.width / videoRect?.width;
      const yRatio = canvas?.height / videoRect?.height;
      
      const x = (artworkRect?.left - videoRect.left) * xRatio;
      const y = (artworkRect?.top - videoRect.top) * yRatio;
     
      const img = new Image();
      img.onload = () => {
       
        const width = artworkRect.width * xRatio * artworkScale;
        const height = artworkRect.height * yRatio * artworkScale;
        
        ctx.drawImage(img, x, y, width, height);
        
        
        try {
          const dataUrl = canvas.toDataURL('image/jpeg');
          
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${artwork.artworkName || 'artwork'}-visualization.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(() => setTakingPhoto(false), 1000);
        } catch (err) {
          console.error('Error creating snapshot:', err);
          setTakingPhoto(false);
        }
      };
      
      img.onerror = () => {
        console.error('Error loading artwork image for snapshot');
        setTakingPhoto(false);
      };
      
      img.src = `${imageUrl}/users/${artwork?.data?.media?.mainImage}`;
    } else {
      // Just capture the video if no artwork is displayed
      try {
        const dataUrl = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'space-visualization.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Error creating snapshot:', err);
      } finally {
        setTakingPhoto(false);
      }
    }
  };

  const handleAdjustScale = (delta) => {
    const newScale = Math.max(0.3, Math.min(2, artworkScale + delta));
    setArtworkScale(newScale);
  };
 
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
          text: "Drag to position and use the controls to resize the artwork. Tap and hold to move.",
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
  const bgClass = dark ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = dark ? 'text-gray-100' : 'text-gray-800';
  const buttonBgClass = dark ? 'bg-gray-800' : 'bg-white';
  const textColorClass = dark ? 'text-white' : 'text-gray-800';

  if (isLoading) {
    return (
      <div className={`${bgClass} min-h-screen flex items-center justify-center ${textClass}`}>
        <AiOutlineLoading3Quarters className="animate-spin mr-2" size={24} />
        <span>Loading artwork details...</span>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className={`${bgClass} min-h-screen p-4 ${textClass}`}>
        <div className="max-w-md mx-auto bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6">
          <Header 
            variant={{ size: 'lg', theme: dark ? 'light' : 'dark', weight: 'semiBold' }} 
            className="mb-4"
          >
            Error Loading Artwork
          </Header>
          <P variant={{ size: 'base', theme: dark ? 'light' : 'dark', weight: 'normal' }} className="mb-4">
            We couldn't load the artwork details. Please try again later.
          </P>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => navigate(-1)}
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
          {artwork?.data && (
            <div className="my-6">
              <img 
                src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || 'https://via.placeholder.com/400x300?text=Artwork'} 
                alt={artwork?.data?.artworkName || 'Artwork image'}
                className="max-w-full h-auto rounded shadow-lg mx-auto"
              />
              <P variant={{ size: 'sm', theme: dark ? 'light' : 'dark', weight: 'normal' }} className="mt-2 text-center">
                {artwork?.data?.artworkName } by {artwork?.data?.owner?.artistName || 'Artist'}
              </P>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => navigate(-1)}
              variant={{
                theme: dark ? " dark" : "dark",
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
    
      {cameraActive && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      
      
      {!cameraActive && (
        <div className={`absolute inset-0 ${bgClass}`}>
          {artwork && (
            <div className="w-full h-full flex items-center justify-center p-6">
              <img 
                src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}`|| 'https://via.placeholder.com/400x300?text=Artwork'} 
                alt={artwork?.data?.artworkName || 'Artwork'}
                className="max-w-full max-h-64 object-contain opacity-30"
              />
            </div>
          )}
        </div>
      )}
      
      
      <canvas ref={canvasRef} className="hidden" />
      
      
      {cameraActive && instructionStep >= 2 && artwork?.data && (
        <motion.div
          ref={artworkContainerRef}
          drag
          dragMomentum={false}
          initial={{ x: artworkPosition.x, y: artworkPosition.y, opacity: 0 }}
          animate={{ x: artworkPosition.x, y: artworkPosition.y, opacity: 1 }}
          transition={{ opacity: { duration: 0.5 } }}
          className="absolute cursor-move touch-manipulation"
          style={{ 
            top: '50%', 
            left: '50%',
            marginLeft: artwork.images?.[0]?.width ? `-${(artwork.images[0].width / 4)}px` : '-150px', 
            marginTop: artwork.images?.[0]?.height ? `-${(artwork.images[0].height / 4)}px` : '-100px' 
          }}
          onDragEnd={(_, info) => {
            setArtworkPosition({
              x: artworkPosition.x + info.offset.x,
              y: artworkPosition.y + info.offset.y
            });
          }}
        >
          <img 
            src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || 'https://via.placeholder.com/400x300?text=Artwork'} 
            alt={artwork?.data?.artworkName || 'Artwork'}
            className="shadow-xl max-w-xs"
            style={{ 
              transform: `scale(${artworkScale})`,
              transition: 'transform 0.3s ease',
              transformOrigin: 'center center',
              maxHeight: '50vh',
              maxWidth: '80vw'
            }}
          />
          
          
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
            <BsArrowsMove size={40} color="white" />
          </div>
        </motion.div>
      )}
      
      
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center z-10">
        <button 
          onClick={handleBack}
          className={`p-2 rounded-full ${buttonBgClass} shadow-lg`}
          aria-label="Go back"
        >
          <AiOutlineArrowLeft size={24} className={textColorClass} />
        </button>
        {artwork?.data && (
          <Header 
            variant={{ size: 'base', theme: 'light', weight: 'semiBold' }}
            className="ml-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded truncate max-w-xs"
          >
            {artwork?.data?.artworkName || 'Artwork ss'}
          </Header>
        )}
      </div>
      
   
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
          
        
          {cameraPermission === 'denied' && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              Camera access was denied. Please enable camera permissions in your browser settings.
            </div>
          )}
          
          
          {instructionStep >= 2 && artwork?.data && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <P variant={{ size: 'sm', theme: dark ? 'light' : 'dark', weight: 'semiBold' }} className="mb-1">
                    {artwork.data?.owner?.artistName || 'Artist'}
                  </P>
                  <P variant={{ size: 'xs', theme: dark ? 'light' : 'dark', weight: 'normal' }} className="opacity-70">
                    {artwork.dimensions || `${artwork.images?.[0]?.width || '?'}x${artwork.images?.[0]?.height || '?'}`}
                  </P>
                </div>
                <Button
                  onClick={captureImage}
                  variant={{
                    theme: dark ? "light" : "dark",
                    rounded: "lg",
                  }}
                  disabled={takingPhoto}
                  className="flex items-center gap-1"
                >
                  {takingPhoto ? (
                    <AiOutlineLoading3Quarters className="animate-spin" size={16} />
                  ) : (
                    <AiOutlineCamera size={16} />
                  )}
                  {takingPhoto ? 'Processing...' : 'Take Photo'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      
      {instructionStep >= 2 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-20">
          <button 
            onClick={() => handleAdjustScale(-0.1)}
            className={`p-3 rounded-full ${buttonBgClass} shadow-lg active:shadow-sm transition-shadow`}
            aria-label="Decrease size"
          >
            <FaChevronLeft size={20} className={textColorClass} />
          </button>
          <button 
            onClick={() => handleAdjustScale(0.1)}
            className={`p-3 rounded-full ${buttonBgClass} shadow-lg active:shadow-sm transition-shadow`}
            aria-label="Increase size"
          >
            <FaChevronRight size={20} className={textColorClass} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileArtworkVisualizer;