import CommonCardData from "./CommonCardData";

const SelectedSection = ({ data }) => {
  return (
    <div className="container mx-auto sm:px-6 px-3">
      <CommonCardData heading="From this artist" highlightData={data} />
      {/* <CommonCardData heading="Selected for you" highlightData={data} />
      <CommonCardData heading="Recent viewed" highlightData={highlightData} /> */}
    </div>
  );
};

export default SelectedSection;
