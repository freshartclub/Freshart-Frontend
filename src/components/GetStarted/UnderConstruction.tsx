import React from "react";

import logo from "../../assets/logo-full-t.png"
import colorsVideo from "../../assets/vidoes/video-colores.mp4";

const UnderConstruction = () => {
  return (
    <div className="relative w-full h-screen font-[Montserrat] text-white bg-black overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={colorsVideo} type="video/mp4" />
        Tu navegador no admite la reproducción de vídeos.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

      <div className="relative z-20 max-w-[800px] mx-auto px-4 py-8 text-center top-1/2 -translate-y-1/2 opacity-0 animate-fadeIn">
        <img
          src={logo}
          alt="Fresh Art Club logo"
          className="w-full max-w-[600px] mb-20 mx-auto"
        />
        <div className="text-[1.5rem] font-semibold mb-12">
          La primera plataforma digital donde el arte vive, circula y se comparte.
        </div>
        <div className="text-[1.5rem] font-light tracking-[2px] mb-12">
          PRÓXIMAMENTE
        </div>

        <div className="flex gap-6 justify-center mt-20">
          <a
            href="https://www.instagram.com/freshartclub_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-[1.2rem]"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              width="20"
            />
            @freshartclub_
          </a>
          <a
            href="https://www.tiktok.com/@freshartclub_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-[1.2rem]"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/192px-Tiktok_icon.svg.png?20240827133148"
              alt="TikTok"
              width="20"
            />
            @freshartclub_
          </a>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full text-center bg-black py-4 z-20 text-sm">
        &copy; 2025 Fresh Art Club
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UnderConstruction;
