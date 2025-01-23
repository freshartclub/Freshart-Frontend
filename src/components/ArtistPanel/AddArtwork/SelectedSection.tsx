
const SelectedSection = ({ data }) => {
  const getRandomItems = (array, count) => {
    // Shuffle array
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    // Return a slice of the shuffled array with `count` items
    return shuffled.slice(0, count);
  };
  return (
    <div className="container mx-auto sm:px-6 px-3">
      {/* <CommonCardData heading="From this artist" highlightData={data} />
      <CommonCardData heading="Selected for you" highlightData={data} />
      <CommonCardData heading="Recent viewed" highlightData={highlightData} /> */}
    </div>
  );
};

export default SelectedSection;
