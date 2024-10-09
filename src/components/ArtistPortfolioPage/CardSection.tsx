import Header from "../ui/Header";
import P from "../ui/P";
import profile from "./assets/profile_photo.png";
import circle1 from "./assets/circle1.png";
import circle2 from "./assets/circle2.png";
import account_plus from "./assets/account-plus-outline.png";
import chat from "./assets/chat-outline.png";
import dots from "./assets/dots-horizontal.png";
import whtsap from "./assets/whatsapp.png";
import facebook from "./assets/facebook.png";
import twitter from "./assets/twitter.png";
import linkedin from "./assets/linkedin.png";

const CardSection = () => {
  return (
    <div className="md:-mt-36 sm:-mt-16 mt-10">
      <div className="bg-white shadow-2xl lg:max-w-xs sm:w-[90%] w-full p-5">
        <div className="">
          <img
            src={profile}
            alt="Profile"
            className="object-cover w-full h-full"
          />

          {/* Profile Details */}
          <div className="mt-4 text-center">
            <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
              Andrews Martin
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="pb-10 mt-1 border-b border-dashed"
            >
              PAINTER | SCULPTER | ARTIST
            </P>
          </div>
        </div>

        {/* Categories and Location */}
        <div className="mt-2">
          <div className="border-b border-dashed py-2">
            <Header variant={{ size: "lg", theme: "dark", weight: "semiBold" }}>
              Category
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="my-1"
            >
              Painting, abstract, illustration, nudity
            </P>
          </div>
          <div className="border-b border-dashed py-2">
            <Header variant={{ size: "lg", theme: "dark", weight: "semiBold" }}>
              Location
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="my-1"
            >
              NY, Chicago 452100
            </P>
          </div>
        </div>

        {/* Social and Action Icons */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex ">
            <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden">
              <img
                src={circle1}
                alt="Follower 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden -ml-5">
              <img
                src={circle2}
                alt="Follower 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Follower Count */}
            <div className="relative w-12 h-12 border-4 border-white rounded-full bg-gray-100 flex items-center justify-center -ml-5">
              <span className="font-bold text-black">+256</span>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <img src={account_plus} alt="icons" className="w-[20px] h-[20px]" />
            <img src={chat} alt="icons" className="w-[20px] h-[20px]" />
            <img src={dots} alt="icons" className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>

      <div className="my-6">
        <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
          Follow Us On -
        </P>
        <div className="flex gap-3 mt-3">
          <img src={whtsap} alt="whtsap" />
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={linkedin} alt="linkedin" />
        </div>
      </div>
    </div>
  );
};

export default CardSection;
