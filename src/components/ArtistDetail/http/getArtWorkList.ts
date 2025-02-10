import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(selectedArtwork) {
  const ArtworkType = selectedArtwork.toLowerCase();

  let url = null;
  if (ArtworkType) {
    url = `${ARTTIST_ENDPOINTS.GetArtWorkList}?artworkType=${ArtworkType}`;
  } else {
    url = ARTTIST_ENDPOINTS.GetArtWorkList;
  }

  const { data } = await axiosInstance.get(url);
  return data;
}

export const useGetArtWorkList = (selectedArtwork) => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkList, selectedArtwork || "All"],
    queryFn: () => fetchData(selectedArtwork),
    refetchOnWindowFocus: false,
  });
};
