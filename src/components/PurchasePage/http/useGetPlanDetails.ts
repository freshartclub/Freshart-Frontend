import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTIST_BASE_URl } from "../../utils/baseUrls";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTIST_BASE_URl}/get-plan-details`); 
  return data;
}

export const useGetPlanDetails = () => {
  return useQuery({
    queryKey: [`${ARTIST_BASE_URl}/get-plan-details`],  
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
