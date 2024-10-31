import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

let toastId: any;

async function usePostArtWork(input: any) {
  return await await axiosInstance.post("/api/artist/add-artwork", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const usePostArtWorkMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usePostArtWork,

    onSuccess: async (res) => {
      console.log(res.data.id);

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

export default usePostArtWorkMutation;
