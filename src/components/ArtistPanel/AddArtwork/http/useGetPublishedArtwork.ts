import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
// import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

let toastId: any;

async function usePostArtWork(id) {
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");
  // console.log("id is from add artwork form ", id);
  return await axiosInstance.patch(`/api/artist/publish-artwork/${id}`);
}

const useGetPublishedArtwork = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usePostArtWork,

    onSuccess: async (res) => {
      console.log("this is from res", res.data);
      navigate("/artist-panel/artwork");
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useGetPublishedArtwork;