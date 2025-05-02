import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetUpLoadedImgaes = (id,) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getUpLoadedImage}/${id}`
    );

    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getUpLoadedImage, id],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
