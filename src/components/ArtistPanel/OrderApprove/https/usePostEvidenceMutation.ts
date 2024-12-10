import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useSearchParams } from "react-router-dom";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";

async function usePostEvidence(input) {
  console.log(input);

  const formData = new FormData();
  Object.entries(input.value).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach((image: File) => {
        formData.append("evidenceImg", image);
      });
    } else {
      formData.append(key, val);
    }
  });

  formData.append("artworkId", input.artworkId);


  return axiosInstance.patch(
    `${ORDERS_ENDPOINTS.AddEvidence}/${input.id}?orderType=${input.orderType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostEvidenceMutation = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams(); // Correct placement of useSearchParams hook

  // Get id and orderType from the query parameters
  const id = searchParams.get("id");
  const orderType = searchParams.get("orderType");

  return useMutation({
    mutationFn: (input) => usePostEvidence(input, id, orderType),

    onSuccess: async (res) => {
     
      queryClient.invalidateQueries({
        queryKey: ["acceptOrder"],
        refetchType: "all",
      });

      // Showing success toast message
      toast.success(res.data.message, {
        duration: 3000,
      });
    },

    onError: (error) => {
      console.error(error);
      // Showing error toast message
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default usePostEvidenceMutation;
