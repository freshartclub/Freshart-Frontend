import Button from "../ui/Button";
import P from "../ui/P";
import image_icon from "./assets/primary-shape3.png";
import stream from "./assets/primary-shape4.png";
import CircleUserComment from "./CircleUserComment";

const CircleRight = () => {
  return (
    <div className="2xl:w-[75%] xl:w-[70%] lg:w-[65%] w-full">
      <div className="shadow-xl sm:p-6 p-3 w-full rounded-lg">
        <textarea
          placeholder="Share what you are thinking here..."
          className="border w-full p-2 h-32 rounded-lg outline-none"
        ></textarea>

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2 items-center sm:justify-normal justify-center">
            <Button
              variant={{ rounded: "full" }}
              className="flex gap-2 bg-[#919EAB14]"
            >
              <img src={image_icon} alt="image" />
              <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
                Image/Video
              </P>
            </Button>
            <Button
              variant={{ rounded: "full" }}
              className="flex gap-2 bg-[#919EAB14]"
            >
              <img src={stream} alt="image" />
              <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
                Streaming
              </P>
            </Button>
          </div>
          <div className="">
            <Button
              variant={{ fontSize: "small", theme: "dark", fontWeight: "500" }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      <CircleUserComment />
    </div>
  );
};

export default CircleRight;
