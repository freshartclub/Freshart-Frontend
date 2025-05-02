import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";

export const MagnifierImage = ({ src, alt, isOffensive, safeMode }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const imgRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0.5, y: 0.5 });
  const [zoomScale, setZoomScale] = useState(2.5);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [zoomLevelIndex, setZoomLevelIndex] = useState(1);
  const [isHovering, setIsHovering] = useState(false);


  useEffect(() => {
    const handleWheel = (e) => {
      if (isHovering) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering]);

  const zoomLevels = [1.5, 2.5, 3.5,4.5, 5];
  
  
  const highResSrc = src.replace(lowImageUrl, `${imageUrl}/users`)



  console.log(highResSrc)


  const handleMouseMove = (e) => {
    if (isZoomed) return;
    if (!containerRef.current || !magnifierRef.current || !imgRef.current) return;

    const container = containerRef.current;
    const magnifier = magnifierRef.current;
    const img = imgRef.current;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const posX = e.clientX - imgRect.left;
    const posY = e.clientY - imgRect.top;

    const percX = (posX / imgRect.width) * 100;
    const percY = (posY / imgRect.height) * 100;
    const backgroundPos = `${percX}% ${percY}%`;

    const magnifierSize = Math.min(Math.max(imgRect.width * 0.15, 100), 200);
    const magnifierOffset = magnifierSize / 2;

    let magnifierX = e.clientX - containerRect.left - magnifierOffset;
    let magnifierY = e.clientY - containerRect.top - magnifierOffset;

    magnifierX = Math.max(0, Math.min(magnifierX, containerRect.width - magnifierSize));
    magnifierY = Math.max(0, Math.min(magnifierY, containerRect.height - magnifierSize));

    const zoomLevel = imgRect.width < 400 ? 3 : 2;

    magnifier.style.width = `${magnifierSize}px`;
    magnifier.style.height = `${magnifierSize}px`;
    magnifier.style.left = `${magnifierX}px`;
    magnifier.style.top = `${magnifierY}px`;
    magnifier.style.backgroundPosition = backgroundPos;
    magnifier.style.backgroundSize = `${imgRect.width * zoomLevel}px ${imgRect.height * zoomLevel}px`;
  };


  const handleMouseEnter = () => {
    if (!isZoomed && magnifierRef.current) {
      magnifierRef.current.style.display = "block";
    }
  };


  const handleMouseLeave = () => {
    if (!isZoomed && magnifierRef.current) {
      magnifierRef.current.style.display = "none";
    }
  };


  const handleDoubleClick = (e) => {
    if (!imgRef.current) return;
    
    const imgRect = imgRef.current.getBoundingClientRect();
    
    if (!isZoomed) {

      const clickX = (e.clientX - imgRect.left) / imgRect.width;
      const clickY = (e.clientY - imgRect.top) / imgRect.height;

      setZoomPosition({ x: clickX, y: clickY });
      setIsZoomed(true);
      setZoomScale(zoomLevels[zoomLevelIndex]);

      if (magnifierRef.current) {
        magnifierRef.current.style.display = "none";
      }
       setIsHovering(true)
         

    } else {
      setIsZoomed(false);
      setZoomLevelIndex(1);
      setIsHovering(false) 
      
    }
  };


  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    
    e.preventDefault();
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };


  const handleZoomedMouseMove = (e) => {
    if (!isZoomed || !isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = (e.clientX - lastPosition.x) / containerRect.width;
    const deltaY = (e.clientY - lastPosition.y) / containerRect.height;
    
    setZoomPosition(prev => ({
      x: Math.max(0, Math.min(1, prev.x - (deltaX / zoomScale * 2))),
      y: Math.max(0, Math.min(1, prev.y - (deltaY / zoomScale * 2)))
    }));
    
    setLastPosition({ x: e.clientX, y: e.clientY });
  };


  const handleZoomWheel = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    
    const direction = e.deltaY < 0 ? 1 : -1;
    
    const newIndex = Math.max(0, Math.min(zoomLevels.length - 1, zoomLevelIndex + direction));
    setZoomLevelIndex(newIndex);
    setZoomScale(zoomLevels[newIndex]);
  };


  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${dark ? "bg-gray-800" : "bg-zinc-100"} p-2 w-full h-full`}
      style={{ cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      onMouseMove={isZoomed ? handleZoomedMouseMove : handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleZoomWheel}
    //   onMouseLeave={()=>setIsHovering(false)}
    >
      <img
        ref={imgRef}
       
        src={src}
        alt={alt}
        className={`
          ${isOffensive && safeMode === "Off" ? "blur-lg brightness-75" : ""}
          mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[20rem] md:h-[60vh]
          ${isZoomed ? "opacity-0" : ""}
        `}
      />
      
      {isZoomed && (
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{
            backgroundImage: `url(${highResSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
            transition: "background-size 0.2s ease",
          }}
        >
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
            Double-click to exit zoom {Math.round(zoomScale * 100)}%
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
            Use scroll wheel to adjust zoom • Drag to pan
          </div>
        </div>
      )}
      
      <div
        ref={magnifierRef}
        className="magnifier"
        style={{
          display: "none",
          position: "absolute",
          borderRadius: "50%",
          border: "3px solid #fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          backgroundColor: "white",
          backgroundImage: `url(${highResSrc})`,
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 100,
          transition: "all 0.1s ease",
        }}
      />
      
      {!isZoomed && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
          Double-click to zoom
        </div>
      )}
    </div>
  );
};