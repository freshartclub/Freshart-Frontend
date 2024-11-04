import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useSearchParams } from "react-router-dom";

async function fetchData() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}`
  );

  return data.data;
}

export const useGetArtWorkById = () => {
  return useQuery({
    queryKey: ["artwork"],
    queryFn: fetchData,
  });
};
