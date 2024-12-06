import Button from "./Button";
import arrow from "../../assets/view_arrow.png";

const ViewButton = ({ onClick }: any) => {
  return (
    <div>
      <Button
        variant={{
          rounded: "full",
          fontWeight: "500",
          fontSize: "base",
        }}
        className="sm:w-auto w-[45%] uppercase flex justify-center items-center py-2 sm:px-4 px-2 border border-[#FF725E] mt-4"
        onClick={onClick}
      >
        View More
        <img src={arrow} alt="arrow" className="ml-2" />
      </Button>
    </div>
  );
};

export default ViewButton;
