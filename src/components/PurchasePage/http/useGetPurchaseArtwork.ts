import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(
  type,
  query,
  selectedTheme,
  selectedTechnic,
  selectedOption
) {
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (query) params.append("search", query);
  if (selectedTheme?.label) params.append("theme", selectedTheme.label);
  if (selectedOption?.value) params.append("discipline", selectedOption.value);
  if (selectedTechnic?.label) params.append("technic", selectedTechnic.label);

  console.log(
    "Constructed URL:",
    `${ARTTIST_ENDPOINTS.GetAllArtwork}?${params.toString()}`
  );
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetAllArtwork}?${params.toString()}`
  );

  return data;
}

export const useGetPurchaseArtwork = (
  type,
  query,
  selectedTheme,
  selectedTechnic,
  selectedOption
) => {
  return useQuery({
    queryKey: [
      "purchaseArtwork",
      type,
      query,
      selectedTheme?.value,
      selectedTechnic?.value,
      selectedOption?.value,
    ],
    queryFn: () =>
      fetchData(type, query, selectedTheme, selectedTechnic, selectedOption),
    enabled: Boolean(type), // Prevent the query from running if `type` is missing
  });
};
