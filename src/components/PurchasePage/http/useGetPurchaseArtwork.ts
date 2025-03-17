import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";
import { useDebounce } from "../../utils/useDebounce";

async function fetchData(
  type: string,
  query: string,
  selectedTheme: string[],
  selectedTechnic: string[],
  selectedStyle: string[],
  selectedOption: string[],
  color: string,
  comingSoon: string,
  orientation: string,
  discount: string,
  purchase: string,
  purchaseOption: string,
  depth: number[],
  height: number[],
  width: number[],
  price: number[],
  tag: string,
  currPage: number,
  cursor: string,
  direction: string,
  limit: number
) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetAllArtwork}?type=${type}&s=${query}&theme=${selectedTheme}&discipline=${selectedOption}&technic=${selectedTechnic}&style=${selectedStyle}&color=${color}&comingsoon=${comingSoon}&orientation=${orientation}&depth=${depth}&&height=${height}&width=${width}&price=${price}&tag=${tag}&discount=${discount}&purchase=${purchase}&purchaseOption=${purchaseOption}&currPage=${currPage}&cursor=${cursor}&direction=${direction}&limit=${limit}`
  );

  return data;
}

export const useGetPurchaseArtwork = (
  type: string,
  query: string,
  selectedTheme: string[],
  selectedTechnic: string[],
  selectedStyle: string[],
  selectedOption: string[],
  color: string,
  comingSoon: string,
  orientation: string,
  discount: string,
  purchase: string,
  purchaseOption: string,
  depth: number[],
  height: number[],
  width: number[],
  price: number[],
  tag: string,
  currPage: number,
  cursor: string,
  direction: string,
  limit: number
) => {
  const debounceWidthMax = useDebounce(width[1], 800);
  const debounceHeightMax = useDebounce(height[1], 800);
  const debounceDepthMax = useDebounce(depth[1], 800);
  const debouncePriceMax = useDebounce(price[1], 800);

  const debounceWidthMin = useDebounce(width[0], 800);
  const debounceHeightMin = useDebounce(height[0], 800);
  const debounceDepthMin = useDebounce(depth[0], 800);
  const debouncePriceMin = useDebounce(price[0], 800);

  const dDepth = [debounceDepthMin, debounceDepthMax];
  const dHeight = [debounceHeightMin, debounceHeightMax];
  const dWidth = [debounceWidthMin, debounceWidthMax];
  const dPrice = [debouncePriceMin, debouncePriceMax];

  return useQuery({
    queryKey: [
      ARTTIST_ENDPOINTS.GetAllArtwork,
      type,
      query,
      selectedTheme,
      selectedTechnic,
      selectedStyle,
      selectedOption,
      color,
      comingSoon,
      orientation,
      discount,
      purchase,
      purchaseOption,
      dDepth,
      dHeight,
      dWidth,
      dPrice,
      tag,
      currPage,
      cursor,
      direction,
      limit,
    ],
    queryFn: () =>
      fetchData(
        type,
        query,
        selectedTheme,
        selectedTechnic,
        selectedStyle,
        selectedOption,
        color,
        comingSoon,
        orientation,
        discount,
        purchase,
        purchaseOption,
        dDepth,
        dHeight,
        dWidth,
        dPrice,
        tag,
        currPage,
        cursor,
        direction,
        limit
      ),

    refetchOnWindowFocus: false,
  });
};
