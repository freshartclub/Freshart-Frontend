import { motion } from "framer-motion";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import P from "../ui/P";
import CircleUserComment from "./CircleUserComment";
import useCirclePostMutation from "./https/useCirclePostMutation";

interface CircleRightProps {
  data: any;
  dark: boolean;
}

const CircleRight = ({ data, dark }: CircleRightProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending } = useCirclePostMutation();
  const userId = useAppSelector((state) => state?.user?.user?._id);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files).slice(0, 5 - files.length);
    if (selectedFiles.length === 0) return;
    if (files.length + selectedFiles.length > 5) {
      return toast.error("You can't add more than 5 files");
    }

    const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const handlePost = async () => {
    if (!content && files.length === 0) {
      return toast.error("Please add at least one file or write something in the text area");
    }

    const newData = {
      content: content,
      title: title,
      circleFile: files,
      id: data?.data?._id,
    };

    try {
      await mutateAsync(newData);
      setContent("");
      setTitle("");
      setPreviewUrls([]);
      setFiles([]);
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const isManager = data?.data?.managers?.some((manager: any) => manager?._id === userId) || false;

  return (
    <div className={`md:w-[55%] w-full ${dark ? "text-gray-100" : "text-gray-800"}`}>
      {isManager && (
        <motion.div
          className={`rounded-xl shadow-sm mb-6 p-4 w-full ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input
            className={`w-full p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 ${
              dark ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "bg-white border border-gray-300 focus:ring-blue-400"
            }`}
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Share what you're thinking..."
            className={`w-full p-3 h-32 rounded-lg focus:outline-none focus:ring-2 ${
              dark ? "bg-gray-700 border-gray-600 text-white focus:ring-[#EE1D52]" : "bg-white border border-gray-300 focus:ring-[#EE1D52]"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*, video/*" multiple hidden ref={fileInputRef} onChange={handleImage} />
              <Button
                variant={{ rounded: "lg" }}
                className={`flex gap-2 items-center ${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <MdOutlinePhotoLibrary className={dark ? "text-blue-400" : "text-gray-700"} size={20} />
                <P
                  variant={{
                    theme: dark ? "light" : "dark",
                    weight: "medium",
                  }}
                >
                  Media
                </P>
              </Button>
            </div>

            <Button onClick={handlePost} className={`px-5 py-2.5 bg-[#EE1D52] hover:bg-[#ff386a] text-white font-medium`} disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                "Create Post"
              )}
            </Button>
          </div>

          {previewUrls.length > 0 && (
            <motion.div
              className="mt-4 flex flex-wrap gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {previewUrls.map((url, index) => (
                <motion.div key={index} className="relative w-24 h-24" whileHover={{ scale: 1.03 }}>
                  {files[index].type.startsWith("image") ? (
                    <img src={url} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : files[index].type.startsWith("video") ? (
                    <video controls className="w-full h-full object-cover rounded-lg">
                      <source src={url} type={files[index].type} />
                    </video>
                  ) : null}
                  <button
                    onClick={() => {
                      setPreviewUrls(previewUrls.filter((_, i) => i !== index));
                      setFiles(files.filter((_, i) => i !== index));
                    }}
                    className={`absolute -top-2 -right-2 cursor-pointer rounded-full p-1 ${
                      dark ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"
                    } shadow-md`}
                  >
                    <RxCross2 size="1em" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      <CircleUserComment isManager={isManager} dark={dark} />
    </div>
  );
};

export default CircleRight;
