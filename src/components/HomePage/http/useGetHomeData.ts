import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetHomeData = () => {
  const url = `${ARTTIST_ENDPOINTS.GetHomeData}`;

  async function fetchData() {
    const { data } = await axiosInstance.get(url);
    console.log("data is ", data);
    return data;
  }
  return useQuery({
    queryKey: [""],
    queryFn: fetchData,
  });
};
