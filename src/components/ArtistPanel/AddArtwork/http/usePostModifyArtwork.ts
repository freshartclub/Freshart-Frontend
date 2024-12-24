import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

async function usePostModifyArtwork(input: any) {
  console.log("this is input", input);
  return await axiosInstance.patch(
    `/api/artist/modify-artwork/${input.id}`,
    input.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostModifyArtworkMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return useMutation({
    mutationFn: usePostModifyArtwork,

    onSuccess: async (res) => {
      console.log("this is from res", res.data);
      console.log(id);
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

export default usePostModifyArtworkMutation;
