import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
// import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

let toastId: any;

async function usePostArtWork(input: any) {
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");
  // console.log("id is from add artwork form ", id);
  return await axiosInstance.post(
    `/api/artist/add-artwork/${input.id}`,
    input.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostArtWorkMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usePostArtWork,

    onSuccess: async (res) => {
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
