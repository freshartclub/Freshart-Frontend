import banner from "./assets/Image.png";
import CircleDescription from "./CircleDescription";
import CircleHead from "./CircleHead";

const CirclePage = () => {
  return (
    <div>
      <img src={banner} alt="banner image" className="w-full" />
      <div className="container mx-auto sm:px-6 px-3">
        <CircleHead />
        <CircleDescription />
      </div>
    </div>
  );
};

export default CirclePage;
