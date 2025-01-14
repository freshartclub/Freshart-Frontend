import React from "react";
import underConstruction from "./assets/underconstruction.png";

const UnderConstruction = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <img
        src={underConstruction}
        className="w-full h-full  object-fill"
        alt=""
      />
    </div>
  );
};

export default UnderConstruction;
