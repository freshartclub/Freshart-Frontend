import CircleRight from "./CircleRight";
import CirleLeft from "./CirleLeft";

const CircleDescription = ({ data }) => {
  return (
    <div className="flex lg:w-[70%] w-full mx-auto lg:flex-row flex-col gap-2 lg:gap-5 mt-5">
      <CirleLeft data={data} />
      <CircleRight data={data} />
    </div>
  );
};

export default CircleDescription;
