import { useState } from "react";
import usePostCommentMutation from "./https/usePostCommentMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useSearchParams } from "react-router-dom";
import { useGetComments } from "./https/useGetComments";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";

const CommentBox = ({ circlePostId }) => {
  // const [comments, setComments] = useState([
  //   { name: "Alice", text: "This is an amazing post!" },
  //   {  name: "Bob", text: "Really insightful, thanks for sharing!" },
  //   {  name: "Charlie", text: "I learned something new today." },
  // ]);

  const [searchParams] = useSearchParams();
  const circleId = searchParams.get("id");

  const [newComment, setNewComment] = useState("");
  const userName = useAppSelector(
    (state) =>
      state.user.user?.artistName +
      " " +
      state.user.user?.artistSurname1 +
      "  " +
      state.user.user?.artistSurname2
  );

  const { mutate, isPending } = usePostCommentMutation();
  const { data, isLoading, isFetching } = useGetComments(circlePostId);

  console.log(data);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: circleId,
      comment: newComment,
      postId: circlePostId,
    };
    mutate(newCommentObj);
    // setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="max-w-full mx-auto p-4 max-h-[50vh] overflow-auto  border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-3">
          {data?.data && data?.data?.length > 0 ? (
            data?.data?.map((comment, i) => (
              <div key={i} className="p-3 bg-gray-100 rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={`${imageUrl}/users/${comment?.owner?.img}`}
                      alt="User Avatar"
                    />
                    <p className="font-semibold">
                      {comment?.owner?.artistName +
                        " " +
                        comment?.owner?.artistSurname1 +
                        " " +
                        comment?.owner?.artistSurname2}
                    </p>
                  </div>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No Comments</div>
          )}
        </div>
      )}
      <div className="mt-4">
        <textarea
          className="w-full p-2 border outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-blue-600"
          onClick={handleAddComment}
        >
          {isPending ? "Loading.." : "Post Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
