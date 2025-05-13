import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { FaCommentDots, FaEdit, FaRegCopy, FaShareAlt } from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import CommentBox from "./CommentBox";
import useCirclePostMutation from "./https/useCirclePostMutation";
import { useGetCirclePosts } from "./https/useGetCirclePosts";
import usePostLikeMutation from "./https/usePostLikeMutation";

const reactions = [
  { id: "like", icon: "👍", label: "Like" },
  { id: "love", icon: "❤️", label: "Love" },
  { id: "haha", icon: "😂", label: "Haha" },
  { id: "sad", icon: "😔", label: "Sad" },
  { id: "angry", icon: "😡", label: "Angry" },
];

interface PostProps {
  id: string;
  post: {
    _id: string;
    title: string;
    content: string;
    file: string[];
    owner: {
      image: string;
      artistName: string;
      artistSurname1: string;
      artistSurname2: string;
      nickName?: string;
    };
    createdAt: string;
    commentCount: number;
    totalLikes: number;
    reactType: string | null;
    reaction?: Record<string, number>;
  };
  isManager: boolean;
  dark: boolean;
}

interface CircleUserCommentProps {
  isManager: boolean;
  dark: boolean;
}

const CircleUserComment = ({ isManager, dark }: CircleUserCommentProps) => {
  const id = useParams().id as string;
  const { data, isLoading } = useGetCirclePosts(id);

  if (isLoading) return <Loader />;

  return (
    <div className={`w-full flex flex-col gap-4 mb-5 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      {data && data?.length > 0 ? (
        data.map((item, i: number) => <Post post={item} isManager={isManager} id={id} key={i} dark={dark} />)
      ) : (
        <div className={`rounded-xl p-6 text-center ${dark ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className="text-lg font-medium">No Posts Found</h3>
          <p className="text-sm mt-1 text-gray-500">Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

function Post({ post: item, isManager, id, dark }: PostProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");
  const [isEdit, setIsEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fieldTrue, setFieldTrue] = useState({
    comment: false,
    share: false,
  });
  const swiperRef = useRef<any>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState({
    commet: item?.commentCount || 0,
    like: item?.totalLikes || 0,
  });

  const [selectedReaction, setSelectedReaction] = useState(item?.reactType || "");

  const { mutateAsync } = usePostLikeMutation();
  const { mutateAsync: editPost, isPending: editPending } = useCirclePostMutation();

  useEffect(() => {
    if (!item?.file) return;

    const newFiles = item.file
      .map((img: string) => {
        if (img.match(/\.(jpg|jpeg|png|webp)$/i)) {
          return `${imageUrl}/users/${img}`;
        } else if (img.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
          return `${imageUrl}/videos/${img}`;
        }
        return null;
      })
      .filter(Boolean) as string[];

    setExistingFiles(newFiles);
  }, [item?.file, isEdit]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const maxAllowed = 5 - files.length;

    if (selectedFiles.length === 0) return;
    if (files.length >= 5) {
      return toast.error("You can't add more than 5 files");
    }

    const filesToAdd = selectedFiles.slice(0, maxAllowed);
    setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
  };

  const handleCancel = () => {
    setFiles([]);
    setIsEdit(false);
  };

  const handleLikeClick = async (reaction: string) => {
    const isRemoving = selectedReaction === reaction;
    const newReaction = isRemoving ? "" : reaction;

    setSelectedReaction(newReaction);
    setCount((prev) => ({
      ...prev,
      like: isRemoving ? prev.like - 1 : prev.like + (selectedReaction ? 0 : 1),
    }));

    try {
      const data = {
        postId: item._id,
        reaction: reaction,
      };
      await mutateAsync(data);
    } catch (error) {
      setSelectedReaction(selectedReaction);
      setCount((prev) => ({
        ...prev,
        like: isRemoving ? prev.like + 1 : prev.like - (selectedReaction ? 0 : 1),
      }));
      toast.error("Failed to react to post");
    }
  };

  const sortedReactions = Object.entries(item?.reaction || {})
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleCloseEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setFiles([]);
      setIsEdit(false);
    }
  };

  const handleEdit = async () => {
    const data = {
      id: id,
      postId: item._id,
      title: title,
      content: content,
      circleFile: files,
      existingFiles: existingFiles,
    };

    try {
      await editPost(data);
      setIsEdit(false);
      setFiles([]);
    } catch (error) {
      toast.error("Failed to edit post");
    }
  };

  const formatTextWithLinks = (text: string) => {
    if (!text) return "";
    return text.split(/\s+/).map((word, index) => {
      if (/(https?:\/\/[^\s]+|www\.[^\s]+)/.test(word)) {
        const url = word.startsWith("www") ? `https://${word}` : word;
        return (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {word}{" "}
          </a>
        );
      }
      return word + " ";
    });
  };

  const name = (val: any) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <motion.article
      className={`rounded-xl overflow-hidden transition-all border shadow duration-200 ${dark ? "bg-gray-800 border-gray-700" : "bg-white"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-4">
        <header className="sm:hidden flex mb-4 gap-3 items-center">
          <div className="flex gap-3 items-center">
            {item?.owner?.image ? (
              <img className="w-10 h-10 object-cover rounded-full" src={`${imageUrl}/users/${item?.owner?.image}`} alt="profile" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
            <div className="flex flex-col">
              <h3 className={`font-medium text-sm ${dark ? "text-white" : "text-gray-900"}`}>{name(item?.owner)}</h3>
              <span className="text-xs text-gray-500">
                {new Date(item?.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-2">
          <h3 className={`font-semibold text-md ${dark ? "text-white" : "text-gray-900"}`}>{item?.title}</h3>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
            {formatTextWithLinks(expanded ? item?.content : item?.content?.slice(0, 300))}
            {item?.content?.length > 300 && (
              <button onClick={() => setExpanded(!expanded)} className="text-blue-500 hover:underline text-xs">
                {expanded ? "Show Less" : "Show More"}
              </button>
            )}
          </p>

          {item?.file && item?.file.length > 0 && (
            <div className="relative mt-3">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                className="rounded-lg overflow-hidden"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              >
                {item.file.map((file, index: number) => (
                  <SwiperSlide key={index} className="flex justify-center">
                    {/\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? (
                      <img src={`${imageUrl}/users/${file}`} alt="media" className="rounded-lg w-full max-h-[400px] object-cover" />
                    ) : /\.(mp4|mov|webm)$/i.test(file) ? (
                      <video src={`${imageUrl}/videos/${file}`} controls className="rounded-lg w-full max-h-[400px] object-cover" />
                    ) : null}
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {item.file.map((_, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      swiperRef.current?.slideTo(index);
                    }}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                      activeIndex === index ? (dark ? "bg-white w-4" : "bg-gray-800 w-4") : dark ? "bg-gray-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {isEdit && (
          <motion.section
            className={`rounded-lg p-4 mt-3 ${dark ? "bg-gray-700" : "bg-gray-50"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              className={`w-full p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 ${
                dark ? "bg-gray-600 text-white focus:ring-blue-500" : "bg-white border focus:ring-blue-400"
              }`}
              type="text"
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Share what you are thinking here..."
              className={`w-full p-3 h-32 rounded-lg focus:outline-none focus:ring-2 ${
                dark ? "bg-gray-600 text-white focus:ring-blue-500" : "bg-white border focus:ring-blue-400"
              }`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex flex-col gap-3 mt-3">
              <input ref={fileInputRef} type="file" accept="image/*, video/*" multiple hidden onChange={handleImage} />

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-between items-center">
                <Button
                  variant={{ rounded: "lg" }}
                  className={`flex gap-2 sm:w-fit w-full justify-center items-center ${
                    dark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <MdOutlinePhotoLibrary className={dark ? "text-blue-400" : "text-gray-700"} size={20} />
                  <span className={dark ? "text-gray-200" : "text-gray-700"}>Add Files</span>
                </Button>
                <div className="flex items-center w-full sm:w-auto gap-2">
                  <Button
                    onClick={handleCancel}
                    className={`px-4 w-full py-2.5 ${dark ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"} text-white font-medium`}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEdit}
                    className={`px-5 w-full whitespace-nowrap py-2.5 bg-[#EE1D52] hover:bg-[#ff386a] text-white font-medium`}
                    disabled={editPending}
                  >
                    {editPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>

            {existingFiles.length > 0 && (
              <div className="mt-4">
                <h4 className={`text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>Current Files:</h4>
                <div className="flex flex-wrap gap-2">
                  {existingFiles.map((url, index: number) => (
                    <div key={index} className="relative w-24 h-24">
                      {url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                        <img src={url} alt="Existing file" className="w-full h-full object-cover rounded-lg" />
                      ) : url.match(/\.(mp4|mov|avi|mkv|webm)$/i) ? (
                        <video controls className="w-full h-full object-cover rounded-lg">
                          <source src={url} />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                      <button
                        onClick={() => setExistingFiles(existingFiles.filter((_, i) => i !== index))}
                        className={`absolute top-1 right-1 rounded-full p-1 ${dark ? "bg-gray-800" : "bg-white"} shadow-sm`}
                      >
                        <RxCross2 size="0.8em" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-3">
                <h4 className={`text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>New Files:</h4>
                <div className="flex flex-wrap gap-2">
                  {files.map((file, index: number) => (
                    <div key={index} className="relative w-24 h-24">
                      {file.type.startsWith("image") ? (
                        <img src={URL.createObjectURL(file)} alt="New file" className="w-full h-full object-cover rounded-lg" />
                      ) : file.type.startsWith("video") ? (
                        <video controls className="w-full h-full object-cover rounded-lg">
                          <source src={URL.createObjectURL(file)} type={file.type} />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                      <button
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className={`absolute top-1 right-1 rounded-full p-1 ${dark ? "bg-gray-800" : "bg-white"} shadow-sm`}
                      >
                        <RxCross2 size="0.8em" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}

        {isManager && (
          <button
            onClick={handleCloseEdit}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            aria-label="Edit post"
          >
            <FaEdit size="1.1em" className={dark ? "text-gray-300" : "text-gray-600"} />
          </button>
        )}

        <footer className={`flex justify-between mt-4 pt-3 border-t ${dark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex gap-4 items-center">
            <div className="relative flex items-center gap-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              {selectedReaction ? (
                <motion.button
                  className="text-lg"
                  animate={{
                    scale: selectedReaction ? 1.2 : 1,
                  }}
                  onClick={() => handleLikeClick(selectedReaction)}
                >
                  {reactions.find((i) => i.id === selectedReaction)?.icon}
                </motion.button>
              ) : (
                <button onClick={() => handleLikeClick("like")} className={`p-1 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <BiLike size="1.2em" />
                </button>
              )}

              <AnimatePresence>
                {hovered && (
                  <motion.div
                    className={`absolute z-10 bottom-8 -left-2 flex items-center gap-1 p-2 rounded-full shadow-lg ${
                      dark ? "bg-gray-700" : "bg-white"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {reactions.map((reaction) => (
                      <motion.button
                        key={reaction.id}
                        className="text-2xl hover:scale-110 transition-transform"
                        onClick={() => handleLikeClick(reaction.id)}
                        aria-label={reaction.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {reaction.icon}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{count.like}</span>

              {sortedReactions.length > 0 && (
                <div className="relative flex items-center -space-x-2">
                  {sortedReactions.map(([reactionType], index: number) => (
                    <span
                      key={index}
                      className="text-sm"
                      style={{
                        zIndex: sortedReactions.length - index,
                      }}
                    >
                      {reactions.find((r) => r.id === reactionType)?.icon}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`flex gap-1 items-center p-1 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              onClick={() =>
                setFieldTrue((prev) => ({
                  ...prev,
                  comment: !prev.comment,
                }))
              }
            >
              <FaCommentDots size="1.2em" />
              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                {count.commet >= 1000 ? `${(count.commet / 1000).toFixed(1)}k` : count.commet}
              </span>
            </button>

            <button
              onClick={() =>
                setFieldTrue((prev) => ({
                  ...prev,
                  share: !prev.share,
                }))
              }
              className={`p-1 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <FaShareAlt size="1.2em" />
            </button>
          </div>

          <div className="hidden sm:flex gap-3 items-center">
            {item?.owner?.image ? (
              <img className="w-10 h-10 object-cover rounded-full" src={`${imageUrl}/users/${item?.owner?.image}`} alt="profile" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
            <div className="flex flex-col">
              <h3 className={`font-medium text-sm ${dark ? "text-white" : "text-gray-900"}`}>{name(item?.owner)}</h3>
              <span className="text-xs text-gray-500">
                {new Date(item?.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </footer>

        {fieldTrue.comment && (
          <CommentBox
            circlePostId={item?._id}
            dark={dark}
            onCommentAdded={() =>
              setCount((prev) => ({
                ...prev,
                commet: prev.commet + 1,
              }))
            }
          />
        )}

        {fieldTrue.share && (
          <motion.div
            className={`flex w-full items-center gap-2 mt-3 p-2 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              value={window.location.href}
              readOnly
              className={`px-3 w-full py-2 rounded-lg focus:outline-none ${dark ? "bg-gray-600 text-white" : "bg-white border border-gray-200"}`}
            />
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg font-medium flex items-center ${dark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
              aria-label="Copy link"
            >
              <FaRegCopy size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

export default CircleUserComment;
