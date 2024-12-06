import FreshArt from "../HomePage/FreshArt";
import profile from "./assets/primary-shape1.png";
import profile2 from "./assets/primary-shape.png";
import profile3 from "./assets/primary-shape22.png";
import profile_image from "./assets/img4.png";
import banner from "./assets/Image.png";
import P from "../ui/P";
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

const Blogs = () => {
  return (
    <div>
      <img src={banner} alt="banner" className="w-full" />
      <div className="container mx-auto sm:px-6 px-3">
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
        <FreshArt />
      </div>
    </div>
  );
};

export default Blogs;
