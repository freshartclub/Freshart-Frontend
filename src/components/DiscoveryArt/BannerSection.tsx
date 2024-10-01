import Header from "../ui/Header";
import P from "../ui/P";
import banner from "./assets/Background.png";

const BannerSection = () => {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-auto" />
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


  )
}

export default BannerSection