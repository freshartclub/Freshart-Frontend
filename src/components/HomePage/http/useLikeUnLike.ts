import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function useLikeUnLike(input: any) {
  return axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.LikeUnlikeArtwork}/${input.id}`,
    { action: input.action }
  );
}
const likeUnlikeArtworkMutation = () => {
  return useMutation({
    mutationFn: useLikeUnLike,

    onSuccess: async (res, input) => {
      console.log(res.data);
    },
    onError: (res) => {
      //   toast.error(res.response.data.message);
    },
  });
};

export default likeUnlikeArtworkMutation;
