import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

type Props = {
  id: string;
  preview: boolean;
  comingFrom: string;
  userId: string;
};

export const useGetArtWorkById = ({ id, preview, comingFrom, userId }: Props) => {
  async function fetchData() {
    let url = `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}&viewType=${comingFrom}`;
    if (userId) url = `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}&viewType=${comingFrom}&userId=${userId}`;

    const { data } = await axiosInstance.get(url);
    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkListById, id, preview],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
