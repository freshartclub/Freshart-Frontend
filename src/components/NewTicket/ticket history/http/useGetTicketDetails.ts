import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

async function fetchData(id: string, t) {
  if (!id) return toast.error(t("Ticket not found"));

  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}/${id}`
  );
  return data;
}
export const useGetTicketDetails = (id: string) => {
  const { t } = useTranslation();
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtistTicketsDetails, id],
    queryFn: () => fetchData(id, t),
    refetchOnWindowFocus: false,
  });
};
