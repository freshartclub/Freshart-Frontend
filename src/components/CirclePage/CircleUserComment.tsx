import P from "../ui/P";
import profile from "./assets/profile_img.svg";
import dot from "./assets/dots.svg";
import banner from "./assets/Img_Travel_M.2.png";

import more from "./assets/+more.svg";
import msg from "./assets/msg.svg";
import share from "./assets/share.svg";
import input_image from "./assets/input_image.png";
import smile from "./assets/smile.png";
import user1 from "./assets/user1.png";
import user2 from "./assets/user2.png";
import banner2 from "./assets/Img_Travel.png";
import { useGetCirclePosts } from "./https/useGetCirclePosts";
import Loader from "../ui/Loader";
import { useSearchParams } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import CommentBox from "./CommentBox";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaShareAlt } from "react-icons/fa";

import { FaRegCopy } from "react-icons/fa";
import usePostCommentMutation from "./https/usePostCommentMutation";

import { motion, AnimatePresence } from "framer-motion";
// import heart from "../assets/heart.svg";
import likeFilled from "../assets/like-filled.svg";
import heart from "./assets/heart.svg";
import avatar1 from "./assets/Avatar 1.svg";
import avatar2 from "./assets/Avatar 2.svg";
import avatar3 from "./assets/Avatar 3.svg";
import usePostLikeMutation from "./https/usePostLikeMutation";
import { useGetLikes } from "./https/useGetLikes";

// Reaction Options
const reactions = [
  { id: "like", icon: "👍", label: "Like" },
  { id: "love", icon: "❤️", label: "Love" },
  { id: "haha", icon: "😂", label: "Haha" },
  { id: "sad", icon: "😔", label: "Sad" },
  { id: "angry", icon: "😡", label: "Angry" },
];

const CircleUserComment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetCirclePosts(id);
  const [isVisible, setisVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [visibleCommentBoxId, setVisibleCommentBoxId] = useState(null);

  const [selectedReaction, setSelectedReaction] = useState(null);

  const [likesCount, setLikesCount] = useState(0);

  const [postId, setPostId] = useState(null);

  const [link, setLink] = useState("https://example.com");
  const [copy, setCopy] = useState("Copy");

  const { mutateAsync, isPending } = usePostLikeMutation();

  const { data: likedData, isLoading: likeLoading } = useGetLikes();

  console.log(likedData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopy("Copied");
      setTimeout(() => setCopy("Copy"), 30000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  console.log(data);

  const handleCommentBox = (postId) => {
    setVisibleCommentBoxId((prevId) => (prevId === postId ? null : postId));
    setisVisible((prev) => !prev);
    setIsShare(false);
  };

  const handleReaction = (postId, reaction) => {
    const data = {
      postId,
      reaction: reaction.id,
    };
    // console.log(reaction);
    // console.log(postId);
    mutateAsync(data).then(() => {
      setSelectedReaction((prev) => ({
        ...prev,
        [postId]: reaction,
      }));
      setLikesCount((prev) => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1,
      }));
    });
  };

  const like =
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png";

  const [hoveredPostId, setHoveredPostId] = useState(null);

  const handleMouseEnter = (postId) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {data &&
        data?.data?.map((item, index) => (
          <>
            <div className="sm:p-6 p-3 w-full rounded-lg my-8 shadow-xl">
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
                      {"Hudson Alvarez"}
                    </P>
                    <P
                      variant={{ size: "small", weight: "normal" }}
                      className="text-[#919EAB]"
                    >
                      12 Aug 2022 10:00 PM
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

              <div className="flex justify-between my-5">
                {/* Like & Reactions */}
                <div className="flex gap-3 items-center">
                  {/* Reaction Button */}
                  <div
                    className="relative flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {selectedReaction?.[item._id]?.icon ? (
                      typeof selectedReaction[item._id].icon === "string" &&
                      selectedReaction[item._id].icon.startsWith("http") ? (
                        // If it's a valid image URL, use <motion.img>
                        <motion.img
                          src={selectedReaction[item._id].icon}
                          alt="reaction"
                          className="w-6 h-6"
                          animate={{
                            scale:
                              item?._id && selectedReaction?.[item._id]
                                ? 1.2
                                : 1,
                          }}
                        />
                      ) : (
                        // If it's an emoji, use <motion.span>
                        <motion.span
                          className="text-2xl"
                          animate={{
                            scale:
                              item?._id && selectedReaction?.[item._id]
                                ? 1.2
                                : 1,
                          }}
                        >
                          {selectedReaction[item._id].icon}
                        </motion.span>
                      )
                    ) : (
                      // Default like icon when no reaction is selected
                      <motion.img
                        src={like}
                        alt="reaction"
                        className="w-6 h-6"
                        animate={{
                          scale: 1,
                        }}
                      />
                    )}

                    {selectedReaction &&
                      item?._id &&
                      selectedReaction[item._id] && (
                        <p className="text-base font-medium">
                          {likesCount && likesCount[item._id]
                            ? likesCount[item._id]
                            : 0}
                        </p>
                      )}

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
                              onClick={() => handleReaction(item._id, reaction)}
                            >
                              {reaction.icon} {/* Directly render emoji */}
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

              {/* Avatars */}
              {/* <div className="flex items-center -space-x-4">
                    <img
                      className="w-10 h-10 rounded-full z-30"
                      src={avatar1}
                      alt="Avatar 1"
                    />
                    <img
                      className="w-10 h-10 rounded-full z-20"
                      src={avatar2}
                      alt="Avatar 2"
                    />
                    <img
                      className="w-10 h-10 rounded-full z-10"
                      src={avatar3}
                      alt="Avatar 3"
                    />
                    <img
                      className="w-10 h-10 rounded-full"
                      src={more}
                      alt="More"
                    />
                  </div> */}
            </div>

            {/* Comment & Share */}

            <div>
              <div className="flex items-center gap-4 w-full">
                <img src={user1} alt="profile" />
                <div className="w-full flex bg-[#F4F6F8] my-2 rounded-lg justify-between p-3">
                  <div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      {"Lainey Davidson"}
                    </P>
                    <P
                      variant={{ size: "small", weight: "normal" }}
                      className="text-[#637381]"
                    >
                      {"I love cupcake danish jujubes sweet"}
                    </P>
                  </div>
                  <div>
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "normal",
                      }}
                      className="text-[#919EAB]"
                    >
                      {"11 Feb 2022"}
                    </P>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex gap-4 my-2">
                <img src={profile} alt="profile" />
                <div className="flex w-full">
                  <input
                    placeholder="Write a comment..."
                    className="border border-gray-200 w-full p-4 rounded-lg outline-none"
                  />
                  <div className="flex items-center -ml-20 gap-3">
                    <img src={input_image} alt="image" />
                    <img src={smile} alt="smile" />
                  </div>
                </div>
              </div> */}
          </>
        ))}
    </div>
  );
};

export default CircleUserComment;
