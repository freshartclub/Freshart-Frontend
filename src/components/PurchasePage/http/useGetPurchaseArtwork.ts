import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(
  type: string,
  query: string,
  selectedTheme: string,
  selectedTechnic: string,
  selectedOption: string,
  currPage: number,
  cursor: string,
  direction: string,
  limit: number
) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetAllArtwork}?type=${type}&s=${query}&theme=${selectedTheme}&discipline=${selectedOption}&technic=${selectedTechnic}&currPage=${currPage}&cursor=${cursor}&direction=${direction}&limit=${limit}`
  );

  return data;
}

export const useGetPurchaseArtwork = (
  type: string,
  query: string,
  selectedTheme: string,
  selectedTechnic: string,
  selectedOption: string,
  currPage: number,
  cursor: string,
  direction: string,
  limit: number
) => {
  return useQuery({
    queryKey: [
      ARTTIST_ENDPOINTS.GetAllArtwork,
      type,
      query,
      selectedTheme,
      selectedTechnic,
      selectedOption,
      currPage,
      cursor,
      direction,
      limit,
    ],
    queryFn: () =>
      fetchData(
        type,
        query,
        selectedTheme,
        selectedTechnic,
        selectedOption,
        currPage,
        cursor,
        direction,
        limit
      ),

    refetchOnWindowFocus: false,
  });
};
