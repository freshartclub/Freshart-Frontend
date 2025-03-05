import { useState } from "react";
import Button from "../ui/Button";
import P from "../ui/P";
import image_icon from "./assets/primary-shape3.png";
import CircleUserComment from "./CircleUserComment";
import { RxCross2 } from "react-icons/rx";
import useCirclePostMutation from "./https/useCirclePostMutation";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/typedReduxHooks";

const CircleRight = ({ data }) => {
  const [title, setTitle] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);
  const [files, setFiles] = useState([]);

  const { mutateAsync, isPending } = useCirclePostMutation();
  const userId = useAppSelector((state) => state?.user?.user?._id);

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5 - files.length);
    if (selectedFiles.length === 0) return;
    if (selectedFiles.length == 5)
      return toast.error("You can't add more than 5 files");

    const newPreviewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const handlePost = () => {
    if (!textAreaContent && files.length === 0) {
      return toast.error(
        "Please add at least one file or write something in the text area"
      );
    }

    const newData = {
      content: textAreaContent,
      title: title,
      circleFile: files,
      id: data?.data?._id,
    };

    mutateAsync(newData).then(() => {
      setTextAreaContent("");
      setTitle("");
      setPreviewUrls([]);
      setFiles([]);
    });
  };

  const isManager =
    data?.data?.managers?.some((manager) => manager?._id === userId) || false;

  return (
    <div className="2xl:w-[75%] xl:w-[70%] lg:w-[65%] w-full">
      {isManager ? (
        <div className="shadow border mb-3 p-3 w-full rounded-lg">
          <input
            className="border w-full p-2 rounded mb-2 outline-none"
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Share what you are thinking here..."
            className="border w-full p-2 h-32 rounded outline-none"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center sm:justify-normal justify-center">
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                hidden
                onChange={handleImage}
              />

              <Button
                variant={{ rounded: "full" }}
                className="flex gap-2 bg-[#44444414]"
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
            </div>

            <Button
              onClick={handlePost}
              className="px-4 py-2 bg-black text-white font-semibold"
            >
              {isPending ? "Posting..." : "Create Post"}
            </Button>
          </div>
          {previewUrls.length > 0 && (
            <div className="mt-4 flex max-w-full w-full overflow-x-auto gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative flex-none w-24">
                  {files[index].type.startsWith("image") ? (
                    <img
                      src={url}
                      alt="Preview"
                      className="w-24 h-24 object-cover"
                    />
                  ) : files[index].type.startsWith("video") ? (
                    <video controls className="w-24 h-24 object-cover">
                      <source src={url} type={files[index].type} />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                  <span
                    onClick={() => {
                      setPreviewUrls(previewUrls.filter((_, i) => i !== index));
                      setFiles(files.filter((_, i) => i !== index));
                    }}
                    className="absolute bg-white top-0 right-0 cursor-pointer rounded-full p-1"
                  >
                    <RxCross2 size="1.5em" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <CircleUserComment isManager={isManager} />
    </div>
  );
};

export default CircleRight;
