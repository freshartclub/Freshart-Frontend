import { useState } from "react";
import Button from "../ui/Button";
import P from "../ui/P";
import image_icon from "./assets/primary-shape3.png";
import stream from "./assets/primary-shape4.png";
import CircleUserComment from "./CircleUserComment";
import { RxCross2 } from "react-icons/rx";
import useCirclePostMutation from "./https/useCirclePostMutation";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/typedReduxHooks";

const CircleRight = ({ data }) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const { mutateAsync, isPending } = useCirclePostMutation();
  const userId = useAppSelector((state) => state?.user?.user?._id);

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handlePost = () => {
    if (!textAreaContent) {
      toast("Please add some content or attach a file before posting.");
      return;
    }
    const newData = {
      content: textAreaContent,
      circleFile: file,
      id: data?.data?._id,
    };
    mutateAsync(newData).then(() => {
      setTextAreaContent("");
      setPreviewUrl(null);
      setFile(null);
    });
  };

  const isManager =
    data?.data?.managers?.some((manager) => manager?._id === userId) || false;

  return (
    <div className="2xl:w-[75%] xl:w-[70%] lg:w-[65%] w-full">
      {isManager ? (
        <div className="shadow-xl sm:p-6 p-3 w-full rounded-lg ">
          <textarea
            placeholder="Share what you are thinking here..."
            className="border w-full p-2 h-32 rounded-lg outline-none"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <div className="flex  flex-wrap gap-2 items-center sm:justify-normal justify-center">
              <div>
                <input
                  type="file"
                  accept="image/*, video/*"
                  hidden
                  onChange={handleImage}
                />

                <div className="flex items-center gap-5">
                  <Button
                    variant={{ rounded: "full" }}
                    className="flex gap-2 bg-[#919EAB14]"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    <img src={image_icon} alt="image/video" />
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Image/Video
                    </P>
                  </Button>
                  <Button
                    variant={{ rounded: "full" }}
                    className="flex gap-2 bg-[#919EAB14]"
                  >
                    <img src={stream} alt="image" />
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      Streaming
                    </P>
                  </Button>
                </div>

                {previewUrl && (
                  <div className="mt-4 relative">
                    {file.type.startsWith("image") ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full object-contain h-[30vh]"
                      />
                    ) : file.type.startsWith("video") ? (
                      <video controls className="w-full h-auto">
                        <source src={previewUrl} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    <span
                      onClick={() => {
                        setPreviewUrl(null);
                        setFile(null);
                      }}
                      className="absolute bg-white top-0 right-0 cursor-pointer rounded-full p-1"
                    >
                      <RxCross2 size="2em" />
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <Button
                onClick={handlePost}
                className="px-4 py-2 bg-black text-white font-semibold"
              >
                {isPending ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <CircleUserComment />
    </div>
  );
};

export default CircleRight;
