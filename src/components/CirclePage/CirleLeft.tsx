import Header from "../ui/Header";
import P from "../ui/P";
import location from "./assets/location.png";
import mail from "./assets/mail.svg";
import bag from "./assets/bag.svg";
import college from "./assets/bag.svg";
import facebook from "./assets/circle_facebook.png";
import insta from "./assets/instagram.png";
import linkedin from "./assets/linkedin.png";
import twitter from "./assets/vector.png";

const info_data = [
  {
    icon: location,
    title: "USA",
  },
  {
    icon: mail,
    title: "brown.dejah@parisian.com",
  },
  {
    icon: bag,
    title: "UX Designer at google",
  },
  {
    icon: college,
    title: "Studied at College of new Jersey",
  },
];

const social_link = [
  {
    icon: facebook,
    title: "https://www.facebook.com/name",
  },
  {
    icon: insta,
    title: "https://www.instagram.com/name",
  },
  {
    icon: linkedin,
    title: "linkedin.com/in/name",
  },
  {
    icon: twitter,
    title: "https://www.twitter.com/name",
  },
];

const CirleLeft = ({ data }) => {
  console.log(data);
  return (
    <div className="2xl:w-[25%] xl:w-[30%] lg:w-[35%] w-full">
      <div className="shadow-xl bg-white py-6 items-center justify-center rounded-xl border border-[#919EAB20] flex">
        <div className="border-r border-dashed px-14 text-center">
          <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
            {data?.followCount}
          </Header>
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Follower
          </P>
        </div>
      </div>

      <div className="shadow-xl bg-white my-7 sm:p-6 p-3 rounded-xl border border-[#919EAB20]">
        <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
          About
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "medium" }}
          className="py-6"
        >
          {data?.data?.description}
        </P>
        {/* <div className="">
          {info_data.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-1">
              <img src={item.icon} alt="icon" />
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {item.title}
              </P>
            </div>
          ))}
        </div> */}
      </div>

      {/* <div className="shadow-xl bg-white my-7 sm:p-6 p-3 rounded-xl border border-[#919EAB20]">
        <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
          Social
        </Header>

        <div className="pt-7">
          {social_link.map((item, index) => (
            <div key={index} className="flex items-center xl:gap-4 gap-2 py-2">
              <div className="w-[7%]">
                <img src={item.icon} alt="icon" className="" />
              </div>

              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {item.title}
              </P>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CirleLeft;
