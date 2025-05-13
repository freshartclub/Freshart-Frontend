import { useAppSelector } from "../../store/typedReduxHooks";
import CommonCardData from "./CommonCardData";
import { useGetOtherArtworks } from "./http/useGetOtherArtworks";

const SelectedSection = ({ data }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const subscription = "Yes";

  const { data: highlightData, isLoading } = useGetOtherArtworks({
    discipline: data?.data?.discipline,
    style: data?.data?.additionalInfo?.artworkStyle,
    theme: data?.data?.additionalInfo?.artworkTheme,
    subscription: subscription,
    _id: data?.data?.owner?._id,
  });

  return (
    <div className={`mx-auto ${dark ? "bg-gray-900" : "bg-white"}`}>
      <CommonCardData heading="From this artist" highlightData={data?.artworks} />
      <CommonCardData heading="Other Artworks you may like" highlightData={highlightData} isLoading={isLoading} />
    </div>
  );
};

export default SelectedSection;
