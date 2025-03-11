import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

interface OtherArtworks {
  discipline: string;
  style: string;
  theme: string;
  subscription: string;
  _id: string;
}

export const useGetOtherArtworks = ({
  discipline,
  style,
  theme,
  subscription,
  _id,
}: OtherArtworks) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetOtherArtworks}?discipline=${discipline}&style=${style}&theme=${theme}&subscription=${subscription}&id=${_id}`
    );

    return data.data;
  }

  return useQuery({
    queryKey: [
      ARTTIST_ENDPOINTS.GetOtherArtworks,
      discipline,
      style,
      theme,
      subscription,
      _id,
    ],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
