import { useState } from "react";
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";

const CollectionSection = ({
  title,
  description,
  buttonText,
  image1,
  image2,
  image3,
}: any) => {
  return (
    <div className="flex md:flex-row flex-col-reverse md:mt-[50px] container m-auto">
      <div className="lg:w-[50%] md:w-[45%] my-auto">
        <Header
          variant={{ theme: "dark", weight: "normal" }}
          className="lg:text-3xl md:text-2xl text-3xl 2xl:w-[40%] xl:w-[50%] w-full lg:mb-[30px] md:mb-[15px] mb-[15px]"
        >
          {title}
        </Header>

        <P
          variant={{ theme: "dark", weight: "normal" }}
          className="text-md 2xl:w-[70%] xl:w-[92%] lg:w-[92%] lg:mb-[30px] md:mb-[20px] mb-[15px]"
        >
          {description}
        </P>

        {buttonText && (
          <>
            <Button
              variant={{
                theme: "light",
                thickness: "moderate",
                fontSize: "md",
              }}
              className="border border-[#333333] text-[#333333] font-bold lg:w-[240px] md:w-[250px] py-3 px-9 uppercase"
            >
              {buttonText}
            </Button>
          </>
        )}
      </div>

      <div className="flex lg:w-[50%] md:w-[50%]">
        <div>
          <img src={image1} alt="" className="pr-1 w-full" />
        </div>
        <div>
          <img src={image2} alt="" />
          <img src={image3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
