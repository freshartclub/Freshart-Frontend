import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetAllArtist = (
  debounceSearch: string,
  selectedStyle: string,
  selectedInsignia: string,
  sort: string,
  selectedOption: string,
  letter: string,
  currPage: number
) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetAllArtist}?s=${debounceSearch}&style=${selectedStyle}&cred=${selectedInsignia}&discipline=${selectedOption}&letter=${letter}&currPage=${currPage}&sort=${sort}`
    );
    return data;
  }

  return useQuery({
    queryKey: [
      ARTTIST_ENDPOINTS.GetAllArtist,
      debounceSearch,
      selectedStyle,
      selectedInsignia,
      sort,
      selectedOption,
      letter,
      currPage,
    ],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
