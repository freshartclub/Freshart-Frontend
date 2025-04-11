import CircleRight from "./CircleRight";

interface CircleDescriptionProps {
  data: any;
  dark: boolean;
}

const CircleDescription = ({ data, dark }: CircleDescriptionProps) => {
  return (
    <div
      className={`flex w-full mx-auto flex-col items-center gap-5 mt-5 ${
        dark ? "bg-gray-900" : ""
      }`}
    >
      <CircleRight data={data} dark={dark} />
    </div>
  );
};

export default CircleDescription;
