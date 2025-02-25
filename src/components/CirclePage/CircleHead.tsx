import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Default styling, you can override with Tailwind

import profile from "./assets/primary-shape1.png";
import profile2 from "./assets/primary-shape.png";
import profile3 from "./assets/primary-shape2.png";
import P from "../ui/P";
import profile_image from "./assets/img.png";
import CircleDescription from "./CircleDescription";
import Followers from "../Followers/Followers";
import Blogs from "../Blogs/Blogs";
import { imageUrl } from "../utils/baseUrls";
import { GrUserManager } from "react-icons/gr";
import { RiUserFollowFill } from "react-icons/ri";
import { MdOutlinePermIdentity } from "react-icons/md";
import Managers from "./Managers";
import Requests from "../Followers/Requests";
import useUnfollowMutation from "./https/useUnfollowMutation";
import { useSearchParams } from "react-router-dom";
import usePostFollowMutation from "../CIrcle/https/usePostFollowMutation";

const CircleHead = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams] = useSearchParams();
  const circleId = searchParams.get("id");
  const type = data?.data?.type;

  console.log(circleId);

  const { mutate, isPending } = useUnfollowMutation();
  const { mutateAsync, isPending: isFollowPending } = usePostFollowMutation();

  const handleUnfollow = () => {
    mutate(circleId);
  };

  const handleFollow = () => {
    mutateAsync(circleId);
  };

  return (
    <div>
      <div className="flex sm:justify-between w-full flex-wrap justify-between items-center sm:gap-0 gap-2">
        <img
          src={`${imageUrl}/users/${data?.data?.mainImage}`}
          alt=""
          className="-mt-[50px] w-[18vw] h-[18vw] rounded-full object-cover"
        />
        {data?.isMember ? (
          <span
            onClick={handleUnfollow}
            className="border-2 z-[999] py-2 px-3 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-md transition-none"
          >
            {isPending ? "Loading..." : " UnFollow"}
          </span>
        ) : null}

        {!data?.isMember ? (
          <span
            onClick={handleFollow}
            className="border-2 z-[999] py-2 px-3 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-md transition-none"
          >
            {isFollowPending ? "Loading..." : " Follow"}
          </span>
        ) : null}
      </div>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex gap-10 justify-end border-b-2  border-gray-300">
          <Tab
            className={`flex gap-1 items-center cursor-pointer pb-2 px-3 py-2 ${
              activeTab === 0 ? "border-b-2 border-black" : ""
            }`}
          >
            <img src={profile} alt="profile icon" />
            <p>Profile</p>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer pb-2 px-3 py-2 ${
              activeTab === 1 ? "border-b-2 border-black" : ""
            }`}
          >
            <RiUserFollowFill />
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Followers
            </P>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer pb-2 px-3 py-2 ${
              activeTab === 2 ? "border-b-2 border-black" : ""
            }`}
          >
            <img src={profile3} alt="blogs icon" />
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Blogs
            </P>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer pb-2 px-3 py-2 ${
              activeTab === 3 ? "border-b-2 border-black" : ""
            }`}
          >
            <GrUserManager size="1.2em" />
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Manager
            </P>
          </Tab>

          {type === "Private" ? (
            <Tab
              className={`flex gap-1 items-center cursor-pointer pb-2 px-3 py-2 ${
                activeTab === 4 ? "border-b-2 border-black" : ""
              }`}
            >
              <MdOutlinePermIdentity size="1.4em" />
              <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
                Requests
              </P>
            </Tab>
          ) : null}
        </TabList>

        <TabPanel>
          <CircleDescription data={data} />
        </TabPanel>
        <TabPanel>
          <Followers newData={data} />
        </TabPanel>

        <TabPanel>
          <Blogs />
        </TabPanel>
        <TabPanel>
          <Managers data={data} />
        </TabPanel>

        {type === "Private" && (
          <TabPanel>
            <Requests />
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default CircleHead;
