import P from "../ui/P";
import profile_image from "./assets/img4.png";
import banner from "./assets/Image.png";
import profile from "./assets/primary-shape1.png";
import profile2 from "./assets/primary-shape.png";
import profile3 from "./assets/primary-shape22.png";
import Header from "../ui/Header";
import location from "./assets/location.png";
import user1 from "./assets/Img_Avatar.2.png";
import user2 from "./assets/Avatar22.png";
import user3 from "./assets/Avatar23.png";
import user4 from "./assets/img25.png";
import user5 from "./assets/Avatar26.png";
import user6 from "./assets/img.png";
import user7 from "./assets/Img_Avatar.8.png";
import user8 from "./assets/Img_Avatar.9.png";
import user9 from "./assets/Avatar.png";
import Button from "../ui/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const profile_data = [
  {
    img: profile,
    title: "Profile",
    to: "/circle",
  },
  {
    img: profile2,
    title: "Followers",
    to: "/followers",
  },
  {
    img: profile3,
    title: "Blogs",
    to: "/blogs",
  },
];

const Followers = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      profile: user1,
      name: "Soren Durham",
      location: "Maldives",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 2,
      profile: user2,
      name: "Lucian Obrien",
      location: "Netherlands Antilles",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 3,
      profile: user3,
      name: "Mireya Conner",
      location: "Bhutan",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 4,
      profile: user4,
      name: "Soren Durham",
      location: "Greenland",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 5,
      profile: user5,
      name: "Giana Brandt",
      location: "Nepal",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 6,
      profile: user6,
      name: "Selina Boyer",
      location: "Comoros",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 7,
      profile: user7,
      name: "Reece Chung",
      location: "Cambodia",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 8,
      profile: user8,
      name: "Reece Chung",
      location: "Cambodia",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
    {
      id: 9,
      profile: user9,
      name: "Reece Chung",
      location: "Cambodia",
      location_icon: location,
      follow_btn: "follow",
      isFollowing: false,
    },
  ]);

  const handleFollowClick = (id: any) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFollowing: !card.isFollowing } : card
      )
    );
  };

  return (
    <div>
      <img src={banner} alt="banner" className="w-full" />
      <div className="container mx-auto sm:px-6 px-3">
        <div>
          <div className="flex sm:justify-between w-full flex-wrap justify-center sm:gap-0 gap-8">
            <img src={profile_image} alt="" className="-mt-[50px]" />
            <div className="flex gap-10">
              {profile_data.map((item, index) => (
                <>
                  <Link
                    to={item.to}
                    key={index}
                    className="flex gap-1 items-center"
                  >
                    <img src={item.img} alt="profile image" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      {item.title}
                    </P>
                  </Link>
                </>
              ))}
            </div>
          </div>

          <div className="lg:mt-20 md:mt-10 mt-5">
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              Followers
            </Header>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-10 md:gap-6 gap-5 my-10">
              {cards.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center shadow-xl border xl:p-8 lg:p-3 p-5 rounded-xl"
                >
                  <div
                    key={item.id}
                    className="flex xl:gap-4 gap-2 items-center "
                  >
                    <img src={item.profile} alt="profile image" />
                    <div>
                      <P
                        variant={{
                          size: "md",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="xl:text-md text-base"
                      >
                        {item.name}
                      </P>
                      <div className="flex items-center gap-2">
                        <img src={item.location_icon} alt="location icon" />
                        <P
                          variant={{ size: "small", weight: "normal" }}
                          className="text-[#919EAB]"
                        >
                          {item.location}
                        </P>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Button
                      variant={{
                        fontSize: "small",
                        rounded: "md",
                        fontWeight: "600",
                      }}
                      onClick={() => handleFollowClick(item.id)}
                      className="border border-[#919EAB51] !py-1 !px-2"
                    >
                      {item.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
