import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function postRecentArtwork(input: any) {
  return axiosInstance.post(`${ARTTIST_ENDPOINTS.RecentArtWorks}/${input}`);
}
const postRecentArtworkMutation = () => {
  return useMutation({
    mutationFn: postRecentArtwork,

    onSuccess: async (res, input) => {
      console.log(res.data);
    },
    onError: (res) => {
      //   toast.error(res.response.data.message);
    },
  });
};

export default postRecentArtworkMutation;
