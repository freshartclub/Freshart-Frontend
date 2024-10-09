import CircleRight from "./CircleRight";
import CirleLeft from "./CirleLeft";

const CircleDescription = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 mt-10">
      <CirleLeft />
      <CircleRight />
    </div>
  );
};

export default CircleDescription;
