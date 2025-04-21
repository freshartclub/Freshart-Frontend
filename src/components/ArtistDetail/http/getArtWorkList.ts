import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetArtWorkList = (selectedArtwork: string) => {
  async function fetchData() {
    const artworkType = selectedArtwork.toLowerCase();

    let url = null;
    if (artworkType) {
      url = `${ARTTIST_ENDPOINTS.GetArtWorkList}?artworkType=${artworkType}`;
    } else {
      url = ARTTIST_ENDPOINTS.GetArtWorkList;
    }

    const { data } = await axiosInstance.get(url);
    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkList, selectedArtwork],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
