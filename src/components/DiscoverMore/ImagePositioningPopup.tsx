import React, { useState, useRef, useEffect } from 'react';
import { useGetUpLoadedImgaes } from './http/useGetUpLoadedImgaes';
import { imageUrl } from '../utils/baseUrls';

const ImagePositioningPopup = ({ onClose, artwork, uploadedImage }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const artworkRef = useRef(null);
  const containerRef = useRef(null);


  const { data, isLoading } = useGetUpLoadedImgaes(artwork?.data?._id);

  // Initialize image position to center when component mounts
  useEffect(() => {
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
  }, [uploadedImage]);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };



  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleSave = () => {
    // Here you would save the positioning data
    // For example:
    const positionData = {
      x: position.x,
      y: position.y,
      zoom: zoom,
      artworkId: artwork?.data?._id,
      uploadedImageId: uploadedImage?.id
    };
    
    console.log("Saving position data:", positionData);
    // Call your API to save the position
    // savePositionData(positionData).then(() => onClose());
    
    // For now, just close
    onClose();
  };

  const handleReset = () => {
    if (containerRef.current && artworkRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const artworkWidth = artworkRef.current.clientWidth;
      const artworkHeight = artworkRef.current.clientHeight;
      
      setPosition({
        x: (containerWidth - artworkWidth) / 2,
        y: (containerHeight - artworkHeight) / 2
      });
      setZoom(1);
    }
  };

  console.log(artwork?.data?.media?.mainImage)




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-xl font-semibold text-gray-800">Position Your Artwork</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
       
        <div className="flex flex-col md:flex-row p-4 gap-4 h-96">
          {/* Left Side - Positioned Artwork */}
          <div 
            ref={containerRef}
            className="flex-1 relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={`${imageUrl}/users/${uploadedImage}` || "/api/placeholder/500/300"}
                alt="Background" 
                className="w-full h-full object-cover"
              />
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
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-lg p-2 flex items-center">
              <button 
                onClick={handleZoomOut}
                className="p-2 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="mx-2 text-sm font-medium">{Math.round(zoom * 100)}%</span>
              <button 
                onClick={handleZoomIn}
                className="p-2 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className="ml-2 p-2 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-4 left-4 bg-white bg-opacity-70 rounded px-2 py-1 text-sm">
              <p>Drag to position • Scroll to zoom</p>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Preview</h4>
            
            <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 mb-4 relative">
              <img 
                src={`${imageUrl}/users/${uploadedImage}` || "/api/placeholder/500/300"}
                alt="Uploaded Image" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Instructions</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Drag the artwork to position it</li>
                <li>• Use the zoom controls to resize</li>
                <li>• Click Reset to center the artwork</li>
                <li>• Click Save when you're satisfied with the positioning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Positioning
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePositioningPopup;