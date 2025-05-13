import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetComments } from "./https/useGetComments";
import usePostCommentMutation from "./https/usePostCommentMutation";

interface CommentBoxProps {
  circlePostId: string;
  dark: boolean;
  onCommentAdded?: () => void;
}

const CommentBox = ({ circlePostId, dark, onCommentAdded }: CommentBoxProps) => {
  const circleId = useParams().id as string;
  const [newComment, setNewComment] = useState("");

  const { mutate, isPending } = usePostCommentMutation();
  const { data, isLoading } = useGetComments(circlePostId);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: circleId,
      comment: newComment,
      postId: circlePostId,
    };
    mutate(newCommentObj, {
      onSuccess: () => {
        setNewComment("");
        onCommentAdded?.();
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <motion.div
      className={`rounded-lg p-3 mt-3 ${dark ? "bg-gray-700" : "bg-gray-50"} border ${dark ? "border-gray-600" : "border-gray-200"}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      ) : (
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
          <AnimatePresence>
            {data && data?.length > 0 ? (
              data?.map((comment, i: number) => (
                <motion.div
                  key={i}
                  className={`flex gap-2`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={`${imageUrl}/users/${comment?.owner?.img}`}
                    alt="User Avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/28";
                    }}
                  />

                  <div className="flex flex-col">
                    <span className={`text-xs font-medium ${dark ? "text-gray-100" : "text-gray-800"}`}>
                      {`${comment?.owner?.artistName} ${comment?.owner?.artistSurname1} ${comment?.owner?.artistSurname2}`}
                    </span>
                    <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{comment?.comment}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className={`p-3 rounded-lg text-center ${dark ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-500"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No comments yet
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 relative">
          <textarea
            className={`w-full text-sm p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 ${
              dark
                ? "bg-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                : "bg-white border border-gray-300 text-gray-800 focus:ring-blue-400"
            } resize-none`}
            placeholder="Write a comment..."
            rows={1}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {newComment && (
            <button
              onClick={() => setNewComment("")}
              className={`absolute right-2 top-2 p-1 rounded-full ${dark ? "text-gray-400 hover:bg-gray-500" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <button
          disabled={newComment.trim() === "" || isPending}
          className={`px-4 py-2 rounded-lg mb-2 font-medium transition-colors ${
            dark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          } ${newComment.trim() === "" || isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleAddComment}
        >
          {isPending ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Posting
            </span>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CommentBox;
