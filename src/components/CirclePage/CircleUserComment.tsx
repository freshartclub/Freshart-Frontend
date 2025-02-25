import P from "../ui/P";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import msg from "./assets/msg.svg";
import share from "./assets/share.svg";
import CommentBox from "./CommentBox";
import { useGetCirclePosts } from "./https/useGetCirclePosts";

import { FaRegCopy } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";

import { FaEdit } from "react-icons/fa";
import useCirclePostMutation from "./https/useCirclePostMutation";
import usePostLikeMutation from "./https/usePostLikeMutation";

import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import image_icon from "./assets/primary-shape3.png";
import stream from "./assets/primary-shape4.png";
import { FaRegWindowClose } from "react-icons/fa";

// Reaction Options
const reactions = [
  { id: "like", icon: "👍", label: "Like" },
  { id: "love", icon: "❤️", label: "Love" },
  { id: "haha", icon: "😂", label: "Haha" },
  { id: "sad", icon: "😔", label: "Sad" },
  { id: "angry", icon: "😡", label: "Angry" },
];

const CircleUserComment = ({ isManager }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetCirclePosts(id);
  const [isVisible, setisVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [visibleCommentBoxId, setVisibleCommentBoxId] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);

  const [textAreaContent, setTextAreaContent] = useState({});
  const [previewUrl, setPreviewUrl] = useState({});
  const [file, setFile] = useState({});

  const [selectedReaction, setSelectedReaction] = useState({});
  const [isEditable, setIsEditable] = useState({});

  const [likesCount, setLikesCount] = useState({});
  const [textContent, setTextContent] = useState("");
  const [getReactionIconLocally, setReactionIconLocally] = useState({});

  const [postId, setPostId] = useState(null);

  const [link, setLink] = useState("https://example.com");
  const [copy, setCopy] = useState("Copy");

  const { mutateAsync, isPending } = usePostLikeMutation();
  const { mutateAsync: editPost, isPending: editPending } =
    useCirclePostMutation();

  // const { data: likedData, isLoading: likeLoading } = useGetLikes();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopy("Copied");
      setTimeout(() => setCopy("Copy"), 30000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getReactionIcon = (reactionString) => {
    const reaction = reactions.find((r) => r.id === reactionString);
    return reaction ? reaction.icon : null;
  };

  const handleImage = (postId) => (e) => {
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
      const newPreviewUrls = {};
      const newReactionsList = {};

      data.data.forEach((post) => {
        const postId = post._id;

        newLikesCount[postId] = post.totalLikes;
        newTextContent[postId] = post.content || "";
        newPreviewUrls[postId] = post.file || "";

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
      setPreviewUrl(newPreviewUrls);
      setReactionIconLocally(newReactionsList);
    }
  }, [data]);

  const handleReaction = (postId, reaction) => {
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

          // Check if reaction already exists
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
            [postId]: [...currentReactions, userReaction].slice(-3), // Keep last 3 reactions
          };
        });
      }
    });
  };

  const handleEditPost = (postId) => {
    try {
      const newData = {
        content: textContent,
        circleFile: file,
        postId: postId,
        id: id,
      };

      console.log(newData);
      editPost(newData).then(() => {
        // setTextAreaContent((prev) => ({
        //  ...prev,
        //   [postId]: newData.content,
        // }));
        // setPreviewUrl((prev) => ({
        //  ...prev,
        //   [postId]: newData.circleFile? URL.createObjectURL(newData.circleFile) : prev[postId],
        // }));
        setIsEditable((prev) => ({ ...prev, [postId]: false }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const like =
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png";

  const handleCommentBox = (postId) => {
    setVisibleCommentBoxId((prevId) => (prevId === postId ? null : postId));
    setisVisible((prev) => !prev);
    setIsShare(false);
  };

  const handleMouseEnter = (postId) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  const handleTextAreaChange = (postId, value) => {
    setTextContent(value);
    setTextAreaContent((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleEdit = (postId, value) => {
    if (value) {
      setIsEditable({ [postId]: true });
      setTextContent("");
    } else {
      setIsEditable((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleDoubleClick = (postId) => {
    setIsEditable((prev) => ({ ...prev, [postId]: false }));
    setTextContent("");
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

        // Check if reaction already exists
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

  const getReactionIconsFromCounts = (reactionObj) => {
    const icons = [];
    for (const [type, count] of Object.entries(reactionObj)) {
      const reaction = reactions.find((r) => r.id === type);
      if (reaction && count > 0) {
        for (let i = 0; i < Math.min(count, 3 - icons.length); i++) {
          icons.push(reaction.icon);
          if (icons.length >= 3) break;
        }
      }
      if (icons.length >= 3) break;
    }
    return icons;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {data &&
        data?.data?.map((item, index) => (
          <>
            <div className="sm:p-6 p-3 w-full  rounded-lg my-8 shadow-xl relative">
              <div>
                <div key={index} className="flex gap-3 mt-10">
                  <img src={item.profile} alt="profile image" />
                  <div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      {item?.owner?.artistName +
                        " " +
                        item?.owner?.artistSurname1 +
                        " " +
                        item?.owner?.artistSurname2}
                    </P>
                    <P
                      variant={{ size: "small", weight: "normal" }}
                      className="text-[#919EAB]"
                    >
                      {new Date(item?.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </P>
                  </div>
                </div>
                <div className="mt-8">
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                    className="mb-4"
                  >
                    {item.content}
                  </P>
                  <img
                    src={`${imageUrl}/users/${item.circleFile}`}
                    alt="image"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>

              {isEditable[item._id] && (
                <div
                  className="shadow-xl sm:p-6 p-3 w-full rounded-lg "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  // onDoubleClick={() => handleDoubleClick(item._id)}
                >
                  <textarea
                    placeholder="Share what you are thinking here..."
                    className="border w-full p-2 h-32 rounded-lg outline-none"
                    value={textAreaContent[item._id] || ""}
                    onChange={(e) =>
                      handleTextAreaChange(item._id, e.target.value)
                    }
                  ></textarea>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-wrap gap-2 items-center sm:justify-normal justify-center">
                      <div>
                        <input
                          type="file"
                          accept="image/*, video/*"
                          hidden
                          id={`file-input-${item._id}`}
                          onChange={handleImage(item._id)}
                        />

                        <div className="flex items-center gap-5">
                          <Button
                            variant={{ rounded: "full" }}
                            className="flex gap-2 bg-[#919EAB14]"
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
                              Image/Video
                            </P>
                          </Button>
                        </div>

                        {previewUrl[item._id] && (
                          <div className="mt-4 relative">
                            {file[item._id] ? (
                              // Locally uploaded file
                              file[item._id].type.startsWith("image") ? (
                                <img
                                  src={previewUrl[item._id]} // Use raw blob URL
                                  alt="Preview"
                                  className="w-full object-contain h-[30vh]"
                                />
                              ) : file[item._id].type.startsWith("video") ? (
                                <video controls className="w-full h-auto">
                                  <source
                                    src={previewUrl[item._id]} // Use raw blob URL
                                    type={file[item._id].type}
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              ) : null
                            ) : (
                              // Backend-provided URL
                              <img
                                src={`${imageUrl}/user/${previewUrl[item._id]}`}
                                alt="Preview"
                                className="w-full object-contain h-[30vh]"
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
                              className="absolute bg-white top-0 right-0 cursor-pointer rounded-full p-1"
                            >
                              <RxCross2 size="2em" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" flex gap-2  items-center">
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
                  onClick={() => handleEdit(item._id, true)}
                  className="absolute top-0 right-0 cursor-pointer"
                >
                  <FaEdit size="1.8em" />
                </span>
              ) : null}

              <div className="flex justify-between my-5">
                {/* Like & Reactions */}
                <div className="flex gap-3 items-center">
                  {/* Reaction Button */}
                  <div
                    className="relative flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {selectedReaction[item._id] ? (
                      <motion.span
                        className="text-2xl"
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
                        className="w-6 h-6"
                        animate={{ scale: 1 }}
                      />
                    )}

                    <div className="flex items-center  gap-8">
                      {getReactionIconLocally[item._id]?.length > 0 && (
                        <div className="relative flex  items-center">
                          {getReactionIconLocally[item._id].map(
                            (reaction, index) => (
                              <span
                                key={index}
                                className="text-lg absolute"
                                style={{
                                  left: `${index * -0.6}em`,
                                  zIndex:
                                    getReactionIconLocally[item._id].length -
                                    index,
                                }}
                              >
                                {reaction.icon}
                              </span>
                            )
                          )}
                        </div>
                      )}
                      <p className="text-base font-medium">
                        {likesCount[item._id] || 0}
                      </p>
                    </div>

                    {/* )} */}

                    {/* Reaction Picker */}
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
                              } // Pass reaction.id, not full object
                            >
                              {reaction.icon}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <img
                    onClick={() => handleCommentBox(item?._id)}
                    src={msg}
                    alt="msg"
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => {
                      setIsShare((prev) => !prev);
                      setisVisible(false);
                    }}
                    src={share}
                    alt="share"
                    className="cursor-pointer"
                  />
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
          </>
        ))}
    </div>
  );
};

export default CircleUserComment;
