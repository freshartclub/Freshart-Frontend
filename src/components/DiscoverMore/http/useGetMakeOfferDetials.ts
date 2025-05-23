import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";
import { useAppSelector } from "../../../store/typedReduxHooks";

export const useGetMakeOfferDetials = (id: string) => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  async function fetchData() {
    const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getOffer}/${id}`);
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getOffer, id],
    queryFn: fetchData,
    enabled: !!id && isAuthorized,
    refetchOnWindowFocus: false,
  });
};
