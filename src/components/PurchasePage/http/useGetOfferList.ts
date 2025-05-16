import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTIST_BASE_URl } from "../../utils/baseUrls";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTIST_BASE_URl}/get-hover-data`); //chnage karna hai
  return data;
}

export const useGetOfferList = () => {
  return useQuery({
    queryKey: [`${ARTIST_BASE_URl}/get-hover-data`], //change karna hai 
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
