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
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return useMutation({
    mutationFn: usePostArtWork,

    onSuccess: async (res) => {
      console.log("this is from res", res.data);
      console.log(id);
      navigate(
        `${
          id
            ? `/artist-panel/artwork/preview?id=${id}&preview=true`
            : `/artist-panel/artwork/preview?id=${res.data.artwork._id}&preview=true`
        }`
      );
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
