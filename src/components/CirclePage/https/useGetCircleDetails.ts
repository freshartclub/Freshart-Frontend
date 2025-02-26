import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetCircleDetails = (id, isViewed) => {
  const navigate = useNavigate();

  async function fetchCircle() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.GetCircleDetails}/${id}?view=${isViewed}`
    );

    return data;
  }

  const fetchData = async () => {
    try {
      const res = await fetchCircle();

      return res;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return navigate("/circle");
    }
  };

  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetCircleDetails],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
