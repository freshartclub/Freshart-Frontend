import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";
import { object } from "yup";

async function fetchData() {
  const { data } = await axiosInstance.get(ARTTIST_ENDPOINTS.cartItems);
  return data;
}

export const useGetCartItems = () => {
  const token = localStorage.getItem("auth_token");

  if (token === null) {
    return {};
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.cartItems],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
