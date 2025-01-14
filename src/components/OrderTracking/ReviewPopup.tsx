import { useState } from "react";
import usePtachReviewMutation from "./http/useReviewOrder";

const ReviewPopup = ({ isOpen, onClose, data }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { mutateAsync, isPending } = usePtachReviewMutation();

  const handleRating = (index) => {
    setRating(index);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };



  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", reviewText);
    const NewData = {
      id: data._id,
      artworkId: data?.items?.artWork?._id,
      rating,
      review: reviewText,
    };

    mutateAsync(NewData).then(() => {
      console.log("Review submitted successfully");

      setRating(0);
      setReviewText("");
      onClose();
    });
    // Here you would handle submitting the review (e.g., API call)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRating(star)}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6    h-6 cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 17.077l-4.917 3.275 1.266-5.99L3 9.495l5.081-.434L12 3l2.919 5.061L20 9.495l-5.349 4.867 1.266 5.99L12 17.077z"
              />
            </svg>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={handleReviewTextChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Write your review..."
        ></textarea>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {isPending ? "Submiting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
