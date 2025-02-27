import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetComments } from "./https/useGetComments";
import usePostCommentMutation from "./https/usePostCommentMutation";

const CommentBox = ({ circlePostId }: { circlePostId: string }) => {
  const [searchParams] = useSearchParams();
  const circleId = searchParams.get("id");

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
    mutate(newCommentObj);
    setNewComment("");
  };

  return (
    <div className="max-w-full my-1 rounded border border-zinc-300 p-2 bg-zinc-100 mx-auto max-h-[50vh] overflow-y-auto">
      {/* <h2 className="text-lg font-semibold mb-3">Comments</h2> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-3 mt-1">
          {data?.data && data?.data?.length > 0 ? (
            data?.data?.map((comment, i: number) => (
              <div key={i} className="">
                <div className="flex items-center gap-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={`${imageUrl}/users/${comment?.owner?.img}`}
                    alt="User Avatar"
                  />
                  <p className="text-[13px] font-semibold">
                    {comment?.owner?.artistName +
                      " " +
                      comment?.owner?.artistSurname1 +
                      " " +
                      comment?.owner?.artistSurname2}
                  </p>
                </div>
                <p className="text-sm ml-8">{comment?.comment}</p>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-100 ">No Comments</div>
          )}
        </div>
      )}
      <div className="flex items-center gap-2 mt-4">
        <textarea
          className="w-full bg-white text-[14px] scrollbar2 h-11 p-2 border rounded outline-none focus:border-zinc-500"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className={`${
            newComment.trim() === ""
              ? "cursor-not-allowed pointer-events-none opacity-50"
              : ""
          } px-4 py-2 bg-zinc-800 text-white rounded hover:bg-blue-600`}
          onClick={handleAddComment}
        >
          {isPending ? "Loading.." : "Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
