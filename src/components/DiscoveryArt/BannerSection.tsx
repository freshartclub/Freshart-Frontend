import Header from "../ui/Header";
import P from "../ui/P";

const BannerSection = () => {
  return (
    <div className="relative bg-bg_discover_art bg-no-repeat w-full h-full bg-cover  py-[150px]">
      <div className="container mx-auto sm:px-6 px-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 rounded">
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              Discovery Arts
            </Header>
            <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
              Select an artwork you like and see its most similar matches
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
