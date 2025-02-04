import CircleRight from "./CircleRight";
import CirleLeft from "./CirleLeft";

const CircleDescription = ({data}) => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 mt-10">
      <CirleLeft data={data} />
      <CircleRight />
    </div>
  );
};

export default CircleDescription;
