import electronic from "../assets/Stack.png";
import circle from "../assets/UserCircle.jpg";
import calender from "../assets/CalendarBlank.png";
import chat from "../assets/ChatCircleDots.png";
import Header from "../../ui/Header";
import P from "../../ui/P";
import whtsap from "../assets/Social Media.png";
import facebook from "../assets/Social Media (1).png";
import twitter from "../assets/Social Media (2).png";
import linked from "../assets/Social Media (3).png";
import pintrest from "../assets/Social Media (4).png";
import link from "../assets/Social Media (5).png";

import profile from "../assets/Images.png";

const Collective = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 my-8 ">
        <div className="flex">
          <img src={electronic} alt="stack" className="xl:w-6 xl:h-6 md:w-5" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="xl:text-base md:text-sm"
          >
            Electronics
          </P>
        </div>
        <div className=" flex">
          <img src={circle} alt="circle" className="xl:w-6 xl:h-6 md:w-5" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="xl:text-base md:text-sm"
          >
            Marvin McKinney
          </P>
        </div>
        <div className=" flex">
          <img src={calender} alt="circle" className="xl:w-6 xl:h-6 md:w-5" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="xl:text-base md:text-sm"
          >
            8 Sep, 2020
          </P>
        </div>
        <div className=" flex">
          <img src={chat} alt="circle" className="xl:w-6 xl:h-6 md:w-5" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="xl:text-base md:text-sm"
          >
            738
          </P>
        </div>
      </div>

      <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
        How artist collective Meow Wolf’s website complements their immersive
        venues
      </Header>

      <div className="flex md:flex-row flex-col justify-between my-8">
        <div className="flex">
          <img src={profile} alt="profile image" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="xl:ml-4 md:ml-2 ml-2 mt-2"
          >
            Cameron Williamson
          </P>
        </div>
        <div className="flex gap-1 mt-4 md:mt-0">
          <div className="xl:mx-2 md:mx-1">
            <img src={whtsap} alt="whatsap" />
          </div>
          <div className="xl:mx-2 md:mx-1">
            <img src={facebook} alt="facebook" />
          </div>
          <div className="xl:mx-2 md:mx-1">
            <img src={twitter} alt="twitter" />
          </div>
          <div className="xl:mx-2 md:mx-1">
            <img src={linked} alt="linkedin" />
          </div>
          <div className="xl:mx-2 md:mx-1">
            <img src={pintrest} alt="pintrest" />
          </div>
          <div className="xl:mx-2 md:mx-1">
            <img src={link} alt="link" />
          </div>
        </div>
      </div>

      <div className="mb-16">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="mb-6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>
      </div>

      <div className="mb-16">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="mb-6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>
      </div>

      <div className="mb-16">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="mb-6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>

        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76] mb-5"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>
        <ul>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Non blandit massa enim nec scelerisque</li>
          <li>Neque egestas congue quisque egestas</li>
        </ul>

        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76] my-5 "
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>
      </div>

      <div className="mb-16">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="mb-6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="text-[#6D6E76]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
          blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At
          risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies
          leo. Neque egestas congue quisque egestas diam. Risus in hendrerit
          gravida rutrum quisque non.
        </P>
      </div>
    </div>
  );
};

export default Collective;
