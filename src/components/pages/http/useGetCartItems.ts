import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";
import { useAppSelector } from "../../../store/typedReduxHooks";
 
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
  const isAuthorised = useAppSelector((state) => state.user.isAuthorized);
  const ids = !isAuthorised ? JSON.parse(localStorage.getItem("_my_cart") || "[]") : [];
 
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.cartItems, isAuthorised, ids.length],
    queryFn: isAuthorised ? fetchData : () => fetchData(ids, isAuthorised || ""),
    refetchOnWindowFocus: false,
    enabled: !!isAuthorised || ids.length > 0,
  });
};