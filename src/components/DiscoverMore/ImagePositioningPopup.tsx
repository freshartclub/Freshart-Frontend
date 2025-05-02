import React, { useState, useRef, useEffect } from 'react';
import { useGetAllUploadedImages } from './http/useGetAllUploadedImages';
import { imageUrl } from '../utils/baseUrls';
import { useAppSelector } from '../../store/typedReduxHooks';

const ImagePositioningPopup = ({ onClose, artwork }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const artworkRef = useRef(null);
  const containerRef = useRef(null);

  const dark = useAppSelector((state) => state.theme.mode);

  // Get all uploaded images
  const { data: uploadedImages, isLoading } = useGetAllUploadedImages();
  
  // Track selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Fullscreen state
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [fullscreenIsDragging, setFullscreenIsDragging] = useState(false);
  const [fullscreenDragStart, setFullscreenDragStart] = useState({ x: 0, y: 0 });
  const fullscreenContainerRef = useRef(null);
  const fullscreenArtworkRef = useRef(null);

  // Set the first image as selected when data loads
  useEffect(() => {
    if (uploadedImages?.data?.length > 0 && !selectedImage) {
      setSelectedImage(uploadedImages.data[0].image);
    }
  }, [uploadedImages, selectedImage]);

  // Initialize image position to center when component mounts or selected image changes
  useEffect(() => {
    if (containerRef.current && artworkRef.current && selectedImage) {
      centerArtwork();
    }
  }, [selectedImage]);

  const centerArtwork = () => {
    if (containerRef.current && artworkRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const artworkWidth = artworkRef.current.clientWidth;
      const artworkHeight = artworkRef.current.clientHeight;
      
      setPosition({
        x: (containerWidth - artworkWidth) / 2,
        y: (containerHeight - artworkHeight) / 2
      });
    }
  };

  // Standard view dragging handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const artworkRect = artworkRef.current.getBoundingClientRect();
      
      // Calculate new position
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      
      const maxX = containerRect.width - artworkRect.width * zoom;
      const maxY = containerRect.height - artworkRect.height * zoom;
      
      newX = Math.min(Math.max(newX, maxX < 0 ? maxX : 0), maxX > 0 ? maxX : 0);
      newY = Math.min(Math.max(newY, maxY < 0 ? maxY : 0), maxY > 0 ? maxY : 0);
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Fullscreen dragging handlers
  const handleFullscreenMouseDown = (e) => {
    e.stopPropagation(); // Prevent closing fullscreen when dragging starts
    setFullscreenIsDragging(true);
    
    // Calculate drag start coordinates
    setFullscreenDragStart({
      x: e.clientX - (position.x * fullscreenZoom),
      y: e.clientY - (position.y * fullscreenZoom)
    });
  };

  const handleFullscreenMouseMove = (e) => {
    if (fullscreenIsDragging && fullscreenContainerRef.current) {
      // Calculate new position
      let newX = (e.clientX - fullscreenDragStart.x) / fullscreenZoom;
      let newY = (e.clientY - fullscreenDragStart.y) / fullscreenZoom;
      
      // Update the main position state
      setPosition({ x: newX, y: newY });
    }
  };

  const handleFullscreenMouseUp = () => {
    setFullscreenIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleSave = () => {
    // Here you would save the positioning data
    const positionData = {
      x: position.x,
      y: position.y,
      zoom: zoom,
      artworkId: artwork?.data?._id,
      uploadedImageId: selectedImage ? selectedImage : null
    };
    
    console.log("Saving position data:", positionData);
    // Call your API to save the position
    // savePositionData(positionData).then(() => onClose());
    
    // For now, just close
    onClose();
  };

  const handleReset = () => {
    centerArtwork();
    setZoom(1);
  };
  
  // Function to toggle fullscreen preview
  const toggleFullscreenPreview = () => {
    setFullscreenActive(prev => !prev);
    setFullscreenZoom(1); // Reset zoom when entering fullscreen
  };
  
  // Function to close fullscreen preview
  const closeFullscreenPreview = () => {
    setFullscreenActive(false);
  };
  
  // Handle fullscreen zoom
  const handleFullscreenZoomIn = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleFullscreenZoomOut = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const handleFullscreenReset = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    setFullscreenZoom(1);
    centerArtwork();
  };

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && fullscreenActive) {
        closeFullscreenPreview();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [fullscreenActive]);

  // Create reusable preview button component
  const PreviewButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-2 right-2 ${dark ? 'bg-gray-800' : 'bg-black'} bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white transition-all`}
      title="View Fullscreen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" />
      </svg>
    </button>
  );

  return (
    <div className={`fixed inset-0 ${dark ? 'bg-gray-900' : 'bg-black'} bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      <div className={`${dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`flex justify-between items-center border-b ${dark ? 'border-gray-700' : 'border-gray-200'} p-4`}>
          <h3 className="text-xl font-semibold">Position Your Artwork</h3>
          <button 
            onClick={onClose}
            className={`${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
       
        <div className="flex flex-col md:flex-row p-4 gap-4 h-[80%]">
          {/* Left Side - Positioned Artwork */}
          <div 
            ref={containerRef}
            className={`flex-1 relative border ${dark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-100'} rounded-lg overflow-hidden`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {selectedImage && (
                <img 
                  src={`${imageUrl}/users/${selectedImage}` || "/api/placeholder/500/300"}
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              )}
              <PreviewButton onClick={toggleFullscreenPreview} />
              
              {artwork?.data?.media?.mainImage && (
                <img
                  ref={artworkRef}
                  src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || "/api/placeholder/200/200"} 
                  alt="Artwork"
                  className="absolute cursor-move"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: 'top left',
                    maxWidth: '80%',
                    maxHeight: '80%'
                  }}
                  onMouseDown={handleMouseDown}
                  draggable="false"
                />
              )}
            </div>
            
            {/* Controls */}
            <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${dark ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-80'} rounded-lg p-2 flex items-center`}>
              <button 
                onClick={handleZoomOut}
                className={`p-2 ${dark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} rounded-md`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className={`mx-2 text-sm font-medium ${dark ? 'text-white' : ''}`}>{Math.round(zoom * 100)}%</span>
              <button 
                onClick={handleZoomIn}
                className={`p-2 ${dark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} rounded-md`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className={`ml-2 p-2 ${dark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} rounded-md`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className={`absolute top-4 left-4 ${dark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'} bg-opacity-70 rounded px-2 py-1 text-sm`}>
              <p>Drag to position • Scroll to zoom</p>
            </div>
          </div>

          {/* Right Side - Preview & Image Selection */}
          <div className="flex-1 flex flex-col">
            {/* Image Selection Gallery */}
            <div className="mb-4">
              <h4 className={`text-lg font-medium ${dark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Select Background Image</h4>
              
              {isLoading ? (
                <div className={`flex justify-center items-center h-24 ${dark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                  <p>Loading images...</p>
                </div>
              ) : (
                <div className={`grid grid-cols-3 gap-2 h-full overflow-y-auto p-2 ${dark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  {uploadedImages?.data?.length > 0 ? (
                    uploadedImages.data.map((img) => (
                      <div 
                        key={img._id}
                        className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === img.image ? (dark ? 'border-blue-400 ring-2 ring-blue-500' : 'border-blue-500 ring-2 ring-blue-300') : 'border-transparent'}`}
                        onClick={() => setSelectedImage(img.image)}
                      >
                        <img 
                          src={`${imageUrl}/users/${img.image}`} 
                          alt="User uploaded"
                          className="w-full h-24 object-cover"
                        />
                        {selectedImage === img.image && (
                          <div className={`absolute top-1 right-1 ${dark ? 'bg-blue-400' : 'bg-blue-500'} rounded-full p-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex justify-center items-center h-24">
                      <p className={dark ? 'text-gray-400' : 'text-gray-500'}>No images available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${dark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} px-4 py-3 flex justify-end border-t`}>
          {/* <button
            onClick={onClose}
            className={`px-4 py-2 ${dark ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-md focus:outline-none focus:ring-2 ${dark ? 'focus:ring-gray-500' : 'focus:ring-gray-500'} mr-2`}
          >
            Cancel
          </button> */}
          <button
            onClick={handleSave}
            className={`px-4 py-2 ${dark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
           Done
          </button>
        </div>
      </div>

      {/* Fullscreen Preview - Shows both background and positioned artwork */}
      {fullscreenActive && (
        <div 
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && closeFullscreenPreview()}
          ref={fullscreenContainerRef}
          onMouseMove={handleFullscreenMouseMove}
          onMouseUp={handleFullscreenMouseUp}
          onMouseLeave={handleFullscreenMouseUp}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background image */}
            {selectedImage && (
              <img 
                src={`${imageUrl}/users/${selectedImage}` || "/api/placeholder/500/300"}
                alt="Background Fullscreen"
                className="w-full h-full object-contain"
                style={{
                  transform: `scale(${fullscreenZoom})`,
                  transformOrigin: 'center center'
                }}
              />
            )}
            
            {/* Overlay artwork in position - with dragging ability */}
            {artwork?.data?.media?.mainImage && (
              <img
                ref={fullscreenArtworkRef}
                src={`${imageUrl}/users/${artwork?.data?.media?.mainImage}` || "/api/placeholder/200/200"} 
                alt="Positioned Artwork"
                className="absolute cursor-move"
                style={{
                  transform: `translate(${position.x * fullscreenZoom}px, ${position.y * fullscreenZoom}px) scale(${zoom * fullscreenZoom})`,
                  transformOrigin: 'top left',
                  maxWidth: '80%',
                  maxHeight: '80%'
                }}
                onMouseDown={handleFullscreenMouseDown}
                draggable="false"
              />
            )}
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreenPreview();
              }}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none transition-all z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Zoom controls */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-2 flex items-center z-10">
              <button 
                onClick={handleFullscreenZoomOut}
                className="p-2 text-white hover:bg-gray-800 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="mx-2 text-sm font-medium text-white">{Math.round(fullscreenZoom * 100)}%</span>
              <button 
                onClick={handleFullscreenZoomIn}
                className="p-2 text-white hover:bg-gray-800 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleFullscreenReset}
                className="ml-2 p-2 text-white hover:bg-gray-800 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg text-sm z-10">
              Drag artwork to position • Use controls to zoom • Press ESC to exit fullscreen
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePositioningPopup;