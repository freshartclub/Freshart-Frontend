import { useQuery } from "@tanstack/react-query";



import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(`${CIRCLE_ENDPOINTS.GetCircleDetails}/${id}`);
  return data;
}

export const useGetCircleDetails = (id) => {
  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetCircleDetails],
    queryFn: ()=>fetchData(id),
  });
};
