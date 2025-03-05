import P from "../ui/P";

import { useEffect, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import CommentBox from "./CommentBox";
import { useGetCirclePosts } from "./https/useGetCirclePosts";
import { FaRegCopy } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import useCirclePostMutation from "./https/useCirclePostMutation";
import usePostLikeMutation from "./https/usePostLikeMutation";
import { FaShareAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import image_icon from "./assets/primary-shape3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reactions = [
  { id: "like", icon: "👍", label: "Like" },
  { id: "love", icon: "❤️", label: "Love" },
  { id: "haha", icon: "😂", label: "Haha" },
  { id: "sad", icon: "😔", label: "Sad" },
  { id: "angry", icon: "😡", label: "Angry" },
];

const CircleUserComment = ({ isManager }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data, isLoading } = useGetCirclePosts(id);

  const [isVisible, setisVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [visibleCommentBoxId, setVisibleCommentBoxId] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);

  const [titleContent, setTitleContent] = useState({});
  const [textAreaContent, setTextAreaContent] = useState({});
  const [previewUrl, setPreviewUrl] = useState({});
  const [file, setFile] = useState({});

  const [selectedReaction, setSelectedReaction] = useState({});
  const [isEditable, setIsEditable] = useState({});

  const [likesCount, setLikesCount] = useState({});
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [getReactionIconLocally, setReactionIconLocally] = useState({});

  const [link, setLink] = useState("https://example.com");
  const [copy, setCopy] = useState("Copy");

  const { mutateAsync } = usePostLikeMutation();
  const { mutateAsync: editPost, isPending: editPending } =
    useCirclePostMutation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopy("Copied");
      setTimeout(() => setCopy("Copy"), 30000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getReactionIcon = (reactionString: string) => {
    const reaction = reactions.find((r) => r.id === reactionString);
    return reaction ? reaction.icon : null;
  };

  const handleImage = (postId: string) => (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl((prev) => ({ ...prev, [postId]: url }));
      setFile((prev) => ({ ...prev, [postId]: selectedFile }));
    }
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const newLikesCount = {};
      const newReactions = {};
      const newTextContent = {};
      const newTitle = {};
      const newPreviewUrls = {};
      const newReactionsList = {};

      data.data.forEach((post) => {
        const postId = post._id;

        newLikesCount[postId] = post.totalLikes;
        newTextContent[postId] = post.content || "";
        newPreviewUrls[postId] = post.file || "";
        newTitle[postId] = post?.title || "";

        if (post?.reaction && typeof post.reaction === "object") {
          const reactionIcons = [];
          for (const [type, count] of Object.entries(post.reaction)) {
            const icon = getReactionIcon(type);
            if (icon && count > 0) {
              for (
                let i = 0;
                i < Math.min(count, 3 - reactionIcons.length);
                i++
              ) {
                reactionIcons.push({ reactionType: type, icon });
              }
            }
            if (reactionIcons.length >= 3) break;
          }
          newReactionsList[postId] = reactionIcons;
        } else {
          newReactionsList[postId] = [];
        }

        if (post.reactType) {
          const icon = getReactionIcon(post.reactType);

          if (icon) {
            newReactions[postId] = icon;
          }
        }
      });

      setLikesCount(newLikesCount);
      setSelectedReaction((prev) => ({
        ...prev,
        ...newReactions,
      }));
      setTextAreaContent(newTextContent);
      setTitleContent(newTitle);
      setPreviewUrl(newPreviewUrls);
      setReactionIconLocally(newReactionsList);
    }
  }, [data]);

  const handleReaction = (postId: string, reaction: any) => {
    const data = {
      postId,
      reaction: reaction,
    };

    mutateAsync(data).then(() => {
      const icon = getReactionIcon(reaction);
      if (icon) {
        setSelectedReaction((prev) => {
          const currentReaction = prev[postId];

          if (currentReaction === icon) {
            const { [postId]: _, ...rest } = prev;
            return rest;
          }

          return { ...prev, [postId]: icon };
        });

        setLikesCount((prev) => {
          const currentLikes = prev[postId] || 0;
          const currentReaction = selectedReaction[postId];

          if (currentReaction === icon) {
            return { ...prev, [postId]: Math.max(currentLikes - 1, 0) };
          }

          return { ...prev, [postId]: currentLikes + 1 };
        });

        setReactionIconLocally((prev) => {
          const currentReactions = prev[postId] || [];
          const userReaction = { reactionType: reaction, icon };

          const alreadyReacted = currentReactions.some(
            (r) => r.reactionType === reaction
          );

          if (alreadyReacted) {
            return {
              ...prev,
              [postId]: currentReactions.filter(
                (r) => r.reactionType !== reaction
              ),
            };
          }

          return {
            ...prev,
            [postId]: [...currentReactions, userReaction].slice(-3),
          };
        });
      }
    });
  };

  const handleEditPost = (postId: string) => {
    try {
      const newData = {
        content: textContent,
        title: title,
        circleFile: file[postId],
        postId: postId,
        id: id,
      };

      editPost(newData).then(() => {
        setIsEditable((prev) => ({ ...prev, [postId]: false }));
        setTextContent("");
        setTitle("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const like =
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png";

  const handleCommentBox = (postId: string) => {
    setVisibleCommentBoxId((prevId) => (prevId === postId ? null : postId));
    setisVisible((prev) => !prev);
    setIsShare(false);
  };

  const handleMouseEnter = (postId: string) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  const handleTextAreaChange = (postId: string, value: string) => {
    setTextContent(value);
    setTextAreaContent((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleTitleChange = (postId: string, value: string) => {
    setTitle(value);
    setTitleContent((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleEdit = (
    postId: string,
    value: boolean,
    title: string,
    content: string
  ) => {
    if (value) {
      setIsEditable({ [postId]: true });
      setTextContent(content || "");
      setTitle(title || "");
      setFile("");
      setPreviewUrl("");
    } else {
      setIsEditable((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleDoubleClick = (postId) => {
    setIsEditable((prev) => ({ ...prev, [postId]: false }));
    setTextContent("");
    setTitle("");
  };

  const handleLikeClick = (postId, reaction) => {
    const icon = getReactionIcon(reaction);
    if (icon) {
      setSelectedReaction((prev) => {
        const currentReaction = prev[postId];

        if (currentReaction === icon) {
          const { [postId]: _, ...rest } = prev;
          return rest;
        }

        return { ...prev, [postId]: icon };
      });

      setLikesCount((prev) => {
        const currentLikes = prev[postId] || 0;
        const currentReaction = selectedReaction[postId];

        if (currentReaction === icon) {
          return { ...prev, [postId]: Math.max(currentLikes - 1, 0) };
        }

        return { ...prev, [postId]: currentLikes + 1 };
      });

      setReactionIconLocally((prev) => {
        const currentReactions = prev[postId] || [];
        const userReaction = { reactionType: reaction, icon };

        const alreadyReacted = currentReactions.some(
          (r) => r.reactionType === reaction
        );

        if (alreadyReacted) {
          return {
            ...prev,
            [postId]: currentReactions.filter(
              (r) => r.reactionType !== reaction
            ),
          };
        }

        return {
          ...prev,
          [postId]: [...currentReactions, userReaction].slice(-3),
        };
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex gap-3 flex-col mb-5">
      {data &&
        data?.data?.map((item, index: number) => (
          <div
            key={index}
            className="border bg-white px-3  py-2 w-full rounded-lg shadow relative"
          >
            <div key={index} className="flex gap-1 flex-col">
              <span className="font-semibold text-base">{item?.title}</span>
              <span className="text-[14px]">{item?.content}</span>
              {item?.file && item?.file.length > 0 && (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="rounded-xl mt-2"
                >
                  {item.file.map((file, index: number) => (
                    <SwiperSlide key={index} className="flex justify-center">
                      {/\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? (
                        <img
                          src={`${imageUrl}/users/${file}`}
                          alt="image"
                          className="rounded-xl w-full object-cover"
                        />
                      ) : /\.(mp4|mov|webm)$/i.test(file) ? (
                        <video
                          src={`${imageUrl}/users/${file}`}
                          controls
                          className="rounded-xl w-full h-[50vh]"
                        />
                      ) : null}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {isEditable[item._id] && (
              <div
                className="shadow border border-zinc-300 w-full rounded-lg p-2 mt-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <input
                  className="border w-full p-2 rounded mb-2 outline-none"
                  type="text"
                  placeholder="Post Title..."
                  value={titleContent[item._id] || ""}
                  onChange={(e) => handleTitleChange(item._id, e.target.value)}
                />
                <textarea
                  placeholder="Share what you are thinking here..."
                  className="border w-full p-2 h-32 rounded-t-lg outline-none"
                  value={textAreaContent[item._id] || ""}
                  onChange={(e) =>
                    handleTextAreaChange(item._id, e.target.value)
                  }
                />

                <div className="flex px-2 pb-2 justify-between items-center">
                  <div className="">
                    <input
                      type="file"
                      accept="image/*, video/*"
                      hidden
                      id={`file-input-${item._id}`}
                      onChange={handleImage(item._id)}
                    />

                    {previewUrl[item._id] && (
                      <div className="mt-2 relative">
                        {file[item._id] ? (
                          file[item._id].type.startsWith("image") ? (
                            <img
                              src={previewUrl[item._id]}
                              alt="Preview"
                              className="object-cover border w-[7rem] h-[5rem] rounded"
                            />
                          ) : file[item._id].type.startsWith("video") ? (
                            <video
                              controls
                              className="object-cover border w-[7rem] h-[5rem] rounded"
                            >
                              <source
                                src={previewUrl[item._id]}
                                type={file[item._id].type}
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : null
                        ) : (
                          <img
                            src={`${imageUrl}/users/${previewUrl[item._id]}`}
                            alt="Preview"
                            className="object-cover border w-[7rem] h-[5rem] rounded"
                          />
                        )}
                        <span
                          onClick={() => {
                            setPreviewUrl((prev) => ({
                              ...prev,
                              [item._id]: "",
                            }));
                            setFile((prev) => ({
                              ...prev,
                              [item._id]: null,
                            }));
                          }}
                          className="absolute bg-white top-1 right-1 cursor-pointer rounded-full p-1"
                        >
                          <RxCross2 size="1em" />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant={{ rounded: "full" }}
                      className="flex gap-2 bg-[#65656514]"
                      onClick={() =>
                        document
                          .getElementById(`file-input-${item._id}`)
                          .click()
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
                        New Image/Video
                      </P>
                    </Button>
                    <Button
                      onClick={() => handleDoubleClick(item._id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleEditPost(item._id)}
                      className="px-5 w-max py-2 bg-black text-white font-semibold"
                    >
                      {editPending ? "Posting..." : "Edit Post"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isManager ? (
              <span
                onClick={() =>
                  handleEdit(item._id, true, item.title, item.content)
                }
                className="absolute top-2 right-2 cursor-pointer"
              >
                <FaEdit size="1.2em" />
              </span>
            ) : null}

            <div className="flex justify-between mt-2.5">
              <div className="flex gap-3 items-center">
                <div
                  className="relative flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(item._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {selectedReaction[item._id] ? (
                    <motion.span
                      className="text-md"
                      animate={{
                        scale: selectedReaction[item._id] ? 1.2 : 1,
                      }}
                    >
                      {selectedReaction[item._id]}
                    </motion.span>
                  ) : (
                    <motion.img
                      onClick={() => handleLikeClick(item?._id, "like")}
                      src={like}
                      alt="reaction"
                      className="w-5 h-5"
                      animate={{ scale: 1 }}
                    />
                  )}

                  <div className="flex items-center">
                    <p className="text-sm font-medium">
                      {likesCount[item._id] || 0}
                    </p>
                    {getReactionIconLocally[item._id]?.length > 0 && (
                      <div className="relative flex items-center">
                        {getReactionIconLocally[item._id].map(
                          (reaction, index: number) => (
                            <span
                              key={index}
                              style={{
                                transform: `translateX(${index * -0.7}em)`,
                                zIndex:
                                  getReactionIconLocally[item._id].length +
                                  index,
                              }}
                            >
                              {reaction.icon}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {hoveredPostId === item._id && (
                      <motion.div
                        className="absolute bottom-10 left-0 flex gap-2 bg-white p-2 rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        {reactions.map((reaction) => (
                          <motion.span
                            key={reaction.id}
                            className="w-8 h-8 cursor-pointer text-2xl hover:scale-110"
                            onClick={() =>
                              handleReaction(item._id, reaction.id)
                            }
                          >
                            {reaction.icon}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleCommentBox(item?._id)}
                  >
                    <FaCommentDots size="1.2em" />
                  </span>

                  <span className="text-sm font-medium">
                    {item?.commentCount >= 1000
                      ? `${(item.commentCount / 1000).toFixed(0)}k`
                      : item?.commentCount}
                  </span>
                </div>

                <span
                  onClick={() => {
                    setIsShare((prev) => !prev);
                    setisVisible(false);
                  }}
                  className="cursor-pointer"
                >
                  <FaShareAlt size="1.2em" />
                </span>
              </div>

              <div className="flex gap-5 items-center">
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
            {visibleCommentBoxId === item?._id && (
              <CommentBox circlePostId={visibleCommentBoxId} />
            )}

            {isShare ? (
              <div className="flex w-full items-center space-x-3 mt-4 p-2 bg-gray-200 rounded-lg">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className="px-3 w-full py-2 border border-gray-300 rounded-lg bg-white focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="py-2 px-4 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-900 flex items-center"
                >
                  <FaRegCopy size={18} className="mr-1" />
                  {copy}
                </button>
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default CircleUserComment;
