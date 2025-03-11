import CircleRight from "./CircleRight";

const CircleDescription = ({ data }) => {
  return (
    <div className="flex w-full mx-auto flex-col items-center gap-5 mt-5">
      <CircleRight data={data} />
    </div>
  );
};

export default CircleDescription;
