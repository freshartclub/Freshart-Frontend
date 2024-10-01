import P from "../ui/P";
import profile from "./assets/profile_img.svg";
import dot from "./assets/dots.svg";
import banner from "./assets/Img_Travel_M.2.png";
import heart from "./assets/heart.svg";
import avatar1 from "./assets/Avatar 1.svg";
import avatar2 from "./assets/Avatar 2.svg";
import avatar3 from "./assets/Avatar 3.svg";
import more from "./assets/+more.svg";
import msg from "./assets/msg.svg";
import share from "./assets/share.svg";
import input_image from "./assets/input_image.png";
import smile from "./assets/smile.png";
import user1 from "./assets/user1.png";
import user2 from "./assets/user2.png";
import banner2 from "./assets/Img_Travel.png";

const user_data = [
  {
    profile: profile,
    dot: dot,
    name: "Hudson Alvarez",
    date: "12 Aug 2022 10:00 PM",
    title:
      "I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer.",
    banner: banner,
    heart: heart,
    likes: 36,
    avtar: avatar1,
    avtar2: avatar2,
    avtar3: avatar3,
    more: more,
    msg: msg,
    share: share,
    user: user1,
    name1: "Lucian Obrien",
    title1: "I love cupcake danish jujubes sweet.",
    date1: "12 Jan 2022",
  },
  {
    profile: profile,
    dot: dot,
    name: "Hudson Alvarez",
    date: "12 Aug 2022 10:00 PM",
    title:
      "I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer.",
    banner: banner2,
    heart: heart,
    likes: 36,
    avtar: avatar1,
    avtar2: avatar2,
    avtar3: avatar3,
    more: more,
    msg: msg,
    share: share,
    user: user2,
    name1: "Lainey Davidson",
    title1: "I love cupcake danish jujubes sweet.",
    date1: "11 Feb 2022",
  },
];

const CircleUserComment = () => {
  return (
    <div>
      {user_data.map((item, index) => (
        <>
          <div className="sm:p-6 p-3 w-full rounded-lg my-8 shadow-xl">
            <div>
              <div key={index} className="flex gap-3 mt-10">
                <img src={item.profile} alt="profile image" />
                <div>
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                  >
                    {item.name}
                  </P>
                  <P
                    variant={{ size: "small", weight: "normal" }}
                    className="text-[#919EAB]"
                  >
                    {item.date}
                  </P>
                </div>
              </div>
              <div className="mt-8">
                <P
                  variant={{ size: "base", theme: "dark", weight: "medium" }}
                  className="mb-4"
                >
                  {item.title}
                </P>
                <img
                  src={item.banner}
                  alt="image"
                  className="rounded-xl w-full"
                />
              </div>
            </div>

            <div className="flex justify-between my-5">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-2">
                  <img src={item.heart} alt="heart icon" />
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                  >
                    {item.likes}
                  </P>
                </div>
                <div className="flex items-center -space-x-4">
                  <img
                    className="w-10 h-10 rounded-full z-30"
                    src={item.avtar}
                    alt="Avatar 1"
                  />
                  <img
                    className="w-10 h-10 rounded-full z-20"
                    src={item.avtar2}
                    alt="Avatar 2"
                  />
                  <img
                    className="w-10 h-10 rounded-full z-10"
                    src={item.avtar3}
                    alt="Avatar 3"
                  />
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.more}
                    alt="Avatar 3"
                  />
                </div>
              </div>

              <div className="flex gap-5 items-center">
                <img src={item.msg} alt="msg" className="cursor-pointer" />
                <img src={item.share} alt="share" className="cursor-pointer" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 w-full">
                <img src={item.user} alt="profile" />
                <div className="w-full flex bg-[#F4F6F8] my-2 rounded-lg justify-between p-3">
                  <div>
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                    >
                      {item.name1}
                    </P>
                    <P
                      variant={{ size: "small", weight: "normal" }}
                      className="text-[#637381]"
                    >
                      {item.title1}
                    </P>
                  </div>
                  <div>
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "normal",
                      }}
                      className="text-[#919EAB]"
                    >
                      {item.date1}
                    </P>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 my-2">
              <img src={profile} alt="profile" />
              <div className="flex w-full">
                <input
                  placeholder="Write a comment..."
                  className="border border-gray-200 w-full p-4 rounded-lg outline-none"
                />
                <div className="flex items-center -ml-20 gap-3">
                  <img src={input_image} alt="image" />
                  <img src={smile} alt="smile" />
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CircleUserComment;
