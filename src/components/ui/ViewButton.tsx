import Button from "./Button";
import arrow from "../../assets/view_arrow.png";

const ViewButton = ({ onClick }: any) => {
  return (
    <Button
      variant={{
        rounded: "full",
        fontWeight: "500",
        fontSize: "base",
      }}
      className="uppercase max-[350px]:w-full w-fit flex justify-center items-center p-2 px-4 border border-[#FF725E] max-[450px]:mt-2"
      onClick={onClick}
    >
      View More
      <img src={arrow} alt="arrow" className="ml-2" />
    </Button>
  );
};

export default ViewButton;
