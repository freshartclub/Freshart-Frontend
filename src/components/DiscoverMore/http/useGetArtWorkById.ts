import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}`
  );
  console.log("this is from usegetartwork", data);

  return data;
}

export const useGetArtWorkById = (id) => {
  let url = `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}`;
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(id),
  });
};
