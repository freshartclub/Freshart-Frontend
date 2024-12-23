import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { useAppSelector } from "../../../store/typedReduxHooks";

export const useGetCartItems = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  let url = `${ARTTIST_ENDPOINTS.cartItems}`;

  async function fetchData() {
    const { data } = await axiosInstance.get(url);
    return data;
  }
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
