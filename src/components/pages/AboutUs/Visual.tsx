import Button from "../../../components/ui/Button";
import Header from "../../ui/Header";
import P from "../../ui/P";
import CollectionSection from "./CollectionSection";
import collection4 from "./assets/collection4.webp";
import collection5 from "./assets/collection5.webp";
import collection6 from "./assets/collection6.webp";
import collection7 from "./assets/collection7.webp";
import collection8 from "./assets/collection8.webp";
import collection9 from "./assets/collection9.webp";

const Visual = () => {
  return (
    <div>
      <div className="w-[100%] m-auto container py-[50px] xl:mt-20">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold  mb-4">
            How To Find Art You Love
          </h1>
          <p className="text-md 2xl:w-[23%] xl:w-[25%] m-auto text-[#333333] font-semibold">
            Discovering art has never been easier or more enjoyable.
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col mt-[50px] md:mb-0 mb-[50px] container m-auto w-[100%]">
        <div className="flex lg:w-[50%] md:w-[50%]">
          <div>
            <img src={collection4} alt="" className="pr-1" />
          </div>
          <div>
            <img src={collection5} alt="" className="pb-[2px] md:pb-0" />
            <img src={collection6} alt="" />
          </div>
        </div>
        <div className="lg:w-[50%] md:w-[45%] flex flex-col justify-center lg:ml-[200px] md:ml-[30px]">
          <Header
            variant={{ theme: "dark", weight: "normal" }}
            className="lg:text-3xl md:text-2xl text-3xl 2xl:w-[40%] xl:w-[50%] w-full lg:mb-[30px] md:mb-[15px] mb-[15px]"
          >
            Visual Search
          </Header>
          <P
            variant={{ theme: "dark", weight: "normal" }}
            className="text-md 2xl:w-[70%] xl:w-[92%] lg:w-[92%] lg:mb-[30px] md:mb-[20px] mb-[15px]"
          >
            Select an artwork you like and see similar matches.
          </P>

          <Button
            variant={{
              theme: "light",
              thickness: "moderate",
              fontSize: "md",
            }}
            className="border border-[#333333] text-[#333333] font-bold lg:w-[240px] md:w-[250px] py-3 px-9 uppercase"
          >
            start searching
          </Button>
        </div>
      </div>

      <CollectionSection
        image1={collection7}
        image2={collection8}
        image3={collection9}
        title="Articles & Interviews"
        description="Get to know the world’s top emerging artists through our featured stories, blog, and more."
        buttonText="Start learning"
      />
    </div>
  );
};

export default Visual;
