import CommonCardData from "./CommonCardData";
import { useGetOtherArtworks } from "./http/useGetOtherArtworks";

const SelectedSection = ({ data }) => {
  const subscription = "Yes";
  const { data: highlightData, isLoading } = useGetOtherArtworks({
    discipline: data?.data?.discipline,
    style: data?.data?.additionalInfo?.artworkStyle,
    theme: data?.data?.additionalInfo?.artworkTheme,
    subscription: subscription,
    _id: data?.data?.owner?._id,
  });

  return (
    <div className="container mx-auto sm:px-6 px-3">
      <CommonCardData
        heading="From this artist"
        highlightData={data.artworks}
      />
      {/* {/* <CommonCardData heading="Selected for you" highlightData={data} /> */}
      <CommonCardData
        heading="Other artworks you may like"
        highlightData={highlightData}
      />
    </div>
  );
};

export default SelectedSection;
