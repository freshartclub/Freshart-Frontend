import { useEffect, useRef, useState, useCallback } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";

export const MagnifierImage = ({ src, alt, isOffensive, safeMode, enableZoom = false }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const imgRef = useRef(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [zoomLevelIndex, setZoomLevelIndex] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 });
  const [touchZoomDistance, setTouchZoomDistance] = useState(null);

  const zoomLevels = [1.5, 2.5, 3.5, 4.5, 5];
  const zoomScale = zoomLevels[zoomLevelIndex];

  const highResSrc = src.replace(lowImageUrl, `${imageUrl}/users`);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isHovering) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isHovering]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isZoomed) return;
      if (!containerRef.current || !magnifierRef.current || !imgRef.current) return;

      const container = containerRef.current;
      const magnifier = magnifierRef.current;
      const img = imgRef.current;

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const posX = e.clientX - imgRect.left;
      const posY = e.clientY - imgRect.top;

      const percX = Math.max(0, Math.min(100, (posX / imgRect.width) * 100));
      const percY = Math.max(0, Math.min(100, (posY / imgRect.height) * 100));
      const backgroundPos = `${percX}% ${percY}%`;

      const screenWidth = window.innerWidth;
      const baseMagnifierSize = screenWidth < 768 ? 80 : 120;
      const magnifierSize = Math.min(Math.max(imgRect.width * 0.15, baseMagnifierSize), 200);
      const magnifierOffset = magnifierSize / 2;

      let magnifierX = e.clientX - containerRect.left - magnifierOffset;
      let magnifierY = e.clientY - containerRect.top - magnifierOffset;

      magnifierX = Math.max(0, Math.min(magnifierX, containerRect.width - magnifierSize));
      magnifierY = Math.max(0, Math.min(magnifierY, containerRect.height - magnifierSize));

      const zoomLevel = imgRect.width < 400 ? 3 : 2;

      Object.assign(magnifier.style, {
        width: `${magnifierSize}px`,
        height: `${magnifierSize}px`,
        left: `${magnifierX}px`,
        top: `${magnifierY}px`,
        backgroundPosition: backgroundPos,
        backgroundSize: `${imgRect.width * zoomLevel}px ${imgRect.height * zoomLevel}px`,
        display: "block",
      });
    },
    [isZoomed]
  );

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isZoomed && magnifierRef.current) {
      magnifierRef.current.style.display = "block";
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
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

      if (magnifierRef.current) {
        magnifierRef.current.style.display = "none";
      }
      setIsHovering(true);
    } else {
      setIsZoomed(false);
      setZoomLevelIndex(1);
      setIsHovering(false);
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

  const handleZoomedMouseMove = useCallback(
    (e) => {
      if (!isZoomed || !isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = (e.clientX - lastPosition.x) / containerRect.width;
      const deltaY = (e.clientY - lastPosition.y) / containerRect.height;

      setZoomPosition((prev) => ({
        x: Math.max(0, Math.min(1, prev.x - (deltaX / zoomScale) * 2)),
        y: Math.max(0, Math.min(1, prev.y - (deltaY / zoomScale) * 2)),
      }));

      setLastPosition({ x: e.clientX, y: e.clientY });
    },
    [isZoomed, isDragging, zoomScale, lastPosition.x, lastPosition.y]
  );

  const handleZoomWheel = useCallback(
    (e) => {
      if (!isZoomed) return;

      e.preventDefault();

      const direction = e.deltaY < 0 ? 1 : -1;

      setZoomLevelIndex((prevIndex) => Math.max(0, Math.min(zoomLevels.length - 1, prevIndex + direction)));
    },
    [isZoomed, zoomLevels.length]
  );

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setLastPosition({ x: touch.clientX, y: touch.clientY });
      setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      setTouchZoomDistance(distance);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();

      if (!isZoomed) {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          const deltaX = Math.abs(touch.clientX - touchStartPos.x);
          const deltaY = Math.abs(touch.clientY - touchStartPos.y);

          if (deltaX < 10 && deltaY < 10 && imgRef.current) {
            const imgRect = imgRef.current.getBoundingClientRect();
            const touchX = (touch.clientX - imgRect.left) / imgRect.width;
            const touchY = (touch.clientY - imgRect.top) / imgRect.height;

            setZoomPosition({ x: touchX, y: touchY });
            setIsZoomed(true);
            return;
          }
        }
      } else {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          if (isDragging && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const deltaX = (touch.clientX - lastPosition.x) / containerRect.width;
            const deltaY = (touch.clientY - lastPosition.y) / containerRect.height;

            setZoomPosition((prev) => ({
              x: Math.max(0, Math.min(1, prev.x - (deltaX / zoomScale) * 2)),
              y: Math.max(0, Math.min(1, prev.y - (deltaY / zoomScale) * 2)),
            }));

            setLastPosition({ x: touch.clientX, y: touch.clientY });
          }
        } else if (e.touches.length === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

          if (touchZoomDistance !== null) {
            const delta = distance - touchZoomDistance;

            const direction = delta > 0 ? 1 : -1;

            if (Math.abs(delta) > 10) {
              setZoomLevelIndex((prevIndex) => {
                const newIndex = Math.max(0, Math.min(zoomLevels.length - 1, prevIndex + direction));
                return newIndex;
              });
              setTouchZoomDistance(distance);
            }
          }
        }
      }
    },
    [isZoomed, isDragging, zoomScale, lastPosition, touchStartPos, touchZoomDistance, zoomLevels.length]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchZoomDistance(null);
  }, []);

  const handleDoubleTap = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevelIndex(1);
    }
  }, [isZoomed]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const [lastTap, setLastTap] = useState(0);

  const handleTap = useCallback(
    (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        handleDoubleTap();
        e.preventDefault();
      }

      setLastTap(currentTime);
    },
    [lastTap, handleDoubleTap]
  );

  if (!enableZoom) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${isOffensive && safeMode === "Off" ? "blur-lg brightness-75" : ""} 
          mx-auto overflow-hidden object-contain md:w-[25rem] h-[350px] md:h-[280px] lg:w-full`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${dark ? "bg-gray-700" : "bg-gray-200"} px-2 w-full h-full`}
      style={{ cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      onMouseMove={isZoomed ? handleZoomedMouseMove : handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleZoomWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={handleTap}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`
          ${isOffensive && safeMode === "Off" ? "blur-lg brightness-75" : ""}
          mx-auto overflow-hidden object-contain md:w-[25rem] lg:w-full h-[350px] md:h-[280px]
          ${isZoomed ? "opacity-0" : ""}
        `}
      />

      {isZoomed && (
        <div
          className={`absolute top-0 left-0 w-full h-full overflow-hidden ${isOffensive && safeMode === "Off" ? "blur" : ""}`}
          style={{
            backgroundImage: `url(${highResSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
            transition: "background-size 0.2s ease",
          }}
        >
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
            {window.innerWidth > 768 ? (
              <>Double-click to exit zoom {Math.round(zoomScale * 100)}%</>
            ) : (
              <>Tap twice to exit • {Math.round(zoomScale * 100)}%</>
            )}
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
            {window.innerWidth > 768 ? <>Use scroll wheel to adjust zoom • Drag to pan</> : <>Pinch to zoom • Drag to pan</>}
          </div>
        </div>
      )}

      <div
        ref={magnifierRef}
        className={`magnifier ${isOffensive && safeMode === "Off" ? "blur  " : ""}`}
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
          transition: "transform 0.1s ease",
        }}
      />

      {!isZoomed && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
          {window.innerWidth > 768 ? <>Double-click to zoom</> : <>Tap to zoom</>}
        </div>
      )}
    </div>
  );
};
