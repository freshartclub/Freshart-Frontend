import profile from "./assets/primary-shape1.png";
import profile2 from "./assets/primary-shape.png";
import profile3 from "./assets/primary-shape2.png";
import P from "../ui/P";
import profile_image from "./assets/img.png";
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

const CircleHead = () => {
  return (
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
                <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
                  {item.title}
                </P>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleHead;
