import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(ids: string[], token: string) {
  let url;
  if (!token && ids.length > 0) {
    url = `${ARTTIST_ENDPOINTS.unauthorisedCartItem}?ids=${ids.join(",")}`;
  } else {
    url = ARTTIST_ENDPOINTS.cartItems;
  }

  const { data } = await axiosInstance.get(url);
  return data;
}

export const useGetCartItems = () => {
  const token = localStorage.getItem("auth_token");

  const ids = !token
    ? JSON.parse(localStorage.getItem("_my_cart") || "[]")
    : [];

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.cartItems, token, ids.length],
    queryFn: token ? fetchData : () => fetchData(ids, token || ""),
    refetchOnWindowFocus: false,
    enabled: !!token || ids.length > 0,
  });
};
