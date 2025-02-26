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
      <div className="flex flex-wrap items-center justify-between w-full gap-4 sm:gap-6">
        <div className="flex gap-4">
          {data?.authorise ? null : data?.isMember ? (
            <span
              onClick={handleUnfollow}
              className="border-2 py-2 px-4 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-sm sm:text-md transition-none whitespace-nowrap"
            >
              {isPending ? "Loading..." : "Unfollow"}
            </span>
          ) : (
            <span
              onClick={handleFollow}
              className="border-2 py-2 px-4 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-sm sm:text-md transition-none whitespace-nowrap"
            >
              {isFollowPending ? "Loading..." : "Follow"}
            </span>
          )}
        </div>
      </div>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex flex-wrap gap-4 sm:gap-6 justify-start sm:justify-end border-b-2 border-gray-300 mt-6">
          <Tab
            className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
              activeTab === 0 ? "border-2 border-black font-semibold  " : ""
            }`}
          >
            <img src={profile} alt="profile icon" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Profile</p>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
              activeTab === 1 ? "border-2 border-black font-semibold " : ""
            }`}
          >
            <RiUserFollowFill className="w-5 h-5" />
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-sm sm:text-base"
            >
              Followers
            </P>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
              activeTab === 2 ? "border-2 border-black font-semibold " : ""
            }`}
          >
            <img src={profile3} alt="blogs icon" className="w-5 h-5" />
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-sm sm:text-base"
            >
              Blogs
            </P>
          </Tab>

          <Tab
            className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
              activeTab === 3 ? "border-2 border-black font-semibold " : ""
            }`}
          >
            <GrUserManager size="1.2em" className="w-5 h-5" />
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-sm sm:text-base"
            >
              Manager
            </P>
          </Tab>

          {type === "Private" ? (
            <Tab
              className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
                activeTab === 4 ? "border-2 border-black font-semibold " : ""
              }`}
            >
              <MdOutlinePermIdentity size="1.4em" className="w-5 h-5" />
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="text-sm sm:text-base"
              >
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
