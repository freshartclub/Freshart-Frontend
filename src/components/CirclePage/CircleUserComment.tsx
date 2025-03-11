import P from "../ui/P";
import { BiLike } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCommentDots, FaEdit, FaRegCopy, FaShareAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import image_icon from "./assets/primary-shape3.png";
import CommentBox from "./CommentBox";
import useCirclePostMutation from "./https/useCirclePostMutation";
import { useGetCirclePosts } from "./https/useGetCirclePosts";
import usePostLikeMutation from "./https/usePostLikeMutation";
import { MdOutlinePhotoLibrary } from "react-icons/md";

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
    };
    createdAt: string;
    commentCount: number;
    totalLikes: number;
    reactType: string | null;
  };
  isManager: boolean;
}

const CircleUserComment = ({ isManager }: PostProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data, isLoading } = useGetCirclePosts(id);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex gap-3 flex-col mb-5">
      {data?.data && data?.data?.length > 0 ? (
        data?.data.map((item, i: number) => (
          <Post post={item} isManager={isManager} id={id} key={i} />
        ))
      ) : (
        <div className="border shadow-md flex h-[7rem] font-semibold rounded-xl justify-center items-center">
          No Post Found
        </div>
      )}
    </div>
  );
};

function Post({ post: item, isManager, id }: PostProps) {
  const fileInputRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");
  const [isEdit, setIsEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fieldTrue, setFieldTrue] = useState({
    comment: false,
    share: false,
  });
  const swiperRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState({
    commet: item?.commentCount || 0,
    like: item?.totalLikes || 0,
  });

  const [selectedReaction, setSelectedReaction] = useState(
    item?.reactType || ""
  );

  const { mutateAsync } = usePostLikeMutation();
  const { mutateAsync: editPost, isPending: editPending } =
    useCirclePostMutation();

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
      .filter(Boolean);

    setExistingFiles(newFiles);
  }, [item?.file, isEdit]);

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxAllowed = 5 - files.length;

    if (selectedFiles.length === 0) return;
    if (files.length >= 5)
      return toast.error("You can't add more than 5 files");

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
        like: isRemoving
          ? prev.like + 1
          : prev.like - (selectedReaction ? 0 : 1),
      }));
    }
  };

  const sortedReactions = Object.entries(item?.reaction)
    .filter(([key, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const handleCopy = async () => {
    navigator.clipboard.writeText("sometext");
    toast.success("Copied");
  };

  const handleCloseEdit = () => {
    if (isEdit == false) {
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

    await editPost(data);

    setIsEdit(false);
    setFiles([]);
  };

  const formatTextWithLinks = (text) => {
    if (!text) return "";
    return text.split(/\s+/).map((word, index) => {
      if (/(https?:\/\/[^\s]+|www\.[^\s]+)/.test(word)) {
        const url = word.startsWith("www") ? `https://${word}` : word;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {word}{" "}
          </a>
        );
      }
      return word + " ";
    });
  };

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="border bg-white px-3 py-2 w-full rounded-lg shadow relative">
      <div className="sm:hidden flex mb-3 gap-5 items-center">
        <div className="flex gap-3">
          {item?.owner?.image ? (
            <img
              className="w-[4vh] h-[4vh] object-cover rounded-full"
              src={`${imageUrl}/users/${item?.owner?.image}`}
              alt="profile image"
            />
          ) : (
            <svg
              className="w-[7vh] h-[7vh] text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-[13px]">
              {name(item?.owner)}
            </span>
            <span className="text-[12px] text-[#919EAB]">
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
      </div>
      <div className="flex gap-1 flex-col">
        <span className="font-semibold text-base">{item?.title}</span>
        <span className="text-[14px]">
          {formatTextWithLinks(
            expanded ? item?.content : item?.content?.slice(0, 300)
          )}
          {item?.content?.length > 300 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-800 hover:underline text-[12px] ml-1"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </span>
        {item?.file && item?.file.length > 0 && (
          <div className="relative mt-2">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              className="rounded-xl"
            >
              {item.file.map((file, index: number) => (
                <SwiperSlide key={index} className="flex justify-center">
                  {/\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? (
                    <img
                      src={`${imageUrl}/users/${file}`}
                      alt="image"
                      className="rounded-xl w-full max-h-[400px] object-cover"
                    />
                  ) : /\.(mp4|mov|webm)$/i.test(file) ? (
                    <video
                      src={`${imageUrl}/videos/${file}`}
                      controls
                      className="rounded-xl w-full max-h-[400px] object-cover"
                    />
                  ) : null}
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute sm:visible hidden bottom-[-20px] left-1/2 transform -translate-x-1/2 sm:flex gap-1">
              {item.file.map((_, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    swiperRef.current?.slideTo(index);
                  }}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-200 ${
                    activeIndex === index
                      ? "bg-slate-600 scale-110"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {isEdit && (
        <div
          className="border border-zinc-300 bg-slate-100 w-full rounded-lg p-2 sm:mt-8 mt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <input
            className="border w-full p-2 rounded mb-2 outline-none"
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Share what you are thinking here..."
            className="border w-full p-2 h-32 rounded-t-lg outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex px-2 pb-2 justify-between items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*, video/*"
              multiple
              hidden
              onChange={handleImage}
            />

            <div className="flex sm:flex-row flex-col gap-2 w-full justify-between items-center">
              <Button
                variant={{ rounded: "full" }}
                className="flex gap-2 bg-[#65656514]"
                onClick={() => fileInputRef.current.click()}
              >
                <MdOutlinePhotoLibrary className="text-green-500" size={20} />
                <P
                  variant={{
                    size: "small",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                >
                  File's
                </P>
              </Button>
              <div className="min-w-[500px]:block sm:w-max w-full flex">
                <Button
                  onClick={handleCancel}
                  className="px-4 w-full py-2 bg-red-500 text-white font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEdit}
                  className="px-5 w-full ml-2 py-2 bg-black text-white font-semibold"
                >
                  {editPending ? "Loading..." : "Edit"}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4 w-full overflow-x-auto max-w-full">
            {existingFiles.length > 0 && (
              <div className="mt-4 flex max-w-full w-full overflow-x-auto gap-2">
                {existingFiles.map((url, index: number) => (
                  <div key={index} className="relative flex-none w-24">
                    {existingFiles[index].match(/\.(jpg|jpeg|png|webp)$/i) ? (
                      <img
                        src={existingFiles[index]}
                        alt="Preview"
                        className="w-24 h-24 object-cover"
                      />
                    ) : existingFiles[index].match(
                        /\.(mp4|mov|avi|mkv|webm)$/i
                      ) ? (
                      <video controls className="w-24 h-24 object-cover">
                        <source src={existingFiles[index]} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    <span
                      onClick={() =>
                        setExistingFiles(
                          existingFiles.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-1 right-1 bg-white cursor-pointer rounded-full p-1"
                    >
                      <RxCross2 size="1em" />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {files.length > 0 && (
              <div className="mt-4 flex max-w-full w-full overflow-x-auto gap-2">
                {files.map((url, index: number) => (
                  <div key={index} className="relative flex-none w-24">
                    {files[index].type.startsWith("image") ? (
                      <img
                        src={URL.createObjectURL(url)}
                        alt="Preview"
                        className="w-24 h-24 object-cover"
                      />
                    ) : files[index].type.startsWith("video") ? (
                      <video controls className="w-24 h-24 object-cover">
                        <source
                          src={URL.createObjectURL(url)}
                          type={files[index].type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    <span
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                      }
                      className="absolute top-1 right-1 bg-white cursor-pointer rounded-full p-1"
                    >
                      <RxCross2 size="1em" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isManager ? (
        <span
          onClick={handleCloseEdit}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <FaEdit size="1.2em" />
        </span>
      ) : null}

      <div className="flex justify-between mt-2.5">
        <div className="flex gap-2 items-center">
          <div
            className="relative flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {selectedReaction != "" ? (
              <motion.span
                className="text-md"
                animate={{
                  scale: selectedReaction ? 1.2 : 1,
                }}
              >
                {reactions.find((i) => i.id === selectedReaction)?.icon}
              </motion.span>
            ) : (
              <BiLike onClick={() => handleLikeClick("like")} />
            )}

            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute z-[99] bottom-7 -left-1 flex items-center gap-1 bg-white p-1 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {reactions.map((reaction) => (
                    <motion.span
                      key={reaction.id}
                      className="cursor-pointer text-2xl hover:scale-110"
                      onClick={() => handleLikeClick(reaction.id)}
                    >
                      {reaction.icon}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-medium">{count.like}</p>
            {sortedReactions.length > 0 ? (
              <div className="relative flex items-center">
                {sortedReactions.map((r, index: number) => (
                  <span
                    key={index}
                    style={{
                      transform: `translateX(${index * -0.7}em)`,
                      zIndex: sortedReactions.length + index,
                    }}
                  >
                    {reactions.find((i) => i.id === r[0])?.icon}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex gap-2 items-center">
            <span
              className="cursor-pointer"
              onClick={() =>
                setFieldTrue((prev) => ({
                  ...prev,
                  comment: !prev.comment,
                }))
              }
            >
              <FaCommentDots size="1.2em" />
            </span>

            <span className="text-sm font-medium">
              {count.commet >= 1000
                ? `${(count.commet / 1000).toFixed(0)}k`
                : count.commet}
            </span>
          </div>

          <span
            onClick={() =>
              setFieldTrue((prev) => ({
                ...prev,
                share: !prev.share,
              }))
            }
            className="cursor-pointer"
          >
            <FaShareAlt size="1.2em" />
          </span>
        </div>

        <div className="sm:flex sm:visible hidden gap-5 items-center">
          <div className="flex gap-3">
            {item?.owner?.image ? (
              <img
                className="w-[6vh] h-[6vh] object-cover rounded-full"
                src={`${imageUrl}/users/${item?.owner?.image}`}
                alt="profile image"
              />
            ) : (
              <svg
                className="w-[7vh] h-[7vh] text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-[13px]">
                {item?.owner?.artistName +
                  " " +
                  item?.owner?.artistSurname1 +
                  " " +
                  item?.owner?.artistSurname2}
              </span>
              <span className="text-[12px] text-[#919EAB]">
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
        </div>
      </div>
      {fieldTrue.comment && <CommentBox circlePostId={item?._id} />}

      {fieldTrue.share ? (
        <div className="flex w-full items-center space-x-3 mt-4 p-2 bg-gray-200 rounded-lg">
          <input
            type="text"
            value={""}
            readOnly
            className="px-3 w-full py-2 border border-gray-300 rounded-lg bg-white focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="py-2 px-4 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-900 flex items-center"
          >
            <FaRegCopy size={18} className="mr-1" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CircleUserComment;
