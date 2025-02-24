import underConstruction from "./assets/underconstruction.jpg";

const UnderConstruction = () => {
  return (
    <div className="h-screen">
      <img
        src={underConstruction}
        className="w-full h-full  object-fill"
        alt=""
      />
    </div>
  );
};

export default UnderConstruction;
