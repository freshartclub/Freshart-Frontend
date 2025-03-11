import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { BiInfoCircle } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { MdOutlinePermIdentity, MdOutlinePhotoLibrary } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import usePostFollowMutation from "../CIrcle/https/usePostFollowMutation";
import Followers from "../Followers/Followers";
import Requests from "../Followers/Requests";
import P from "../ui/P";
import CircleAbout from "./CircleAbout";
import CircleDescription from "./CircleDescription";
import useUnfollowMutation from "./https/useUnfollowMutation";
import Managers from "./Managers";

const CircleHead = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [searchParams] = useSearchParams();
  const circleId = searchParams.get("id") as string;
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
    <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
      <TabList className="flex items-center flex-wrap gap-4 sm:gap-6 justify-start sm:justify-end border-b-2 border-gray-300 mt-6">
        <Tab
          className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
            activeTab === 0 ? "border-2 border-black font-semibold" : ""
          }`}
        >
          <BiInfoCircle size={20} />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="text-sm sm:text-base"
          >
            About
          </P>
        </Tab>
        <Tab
          className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
            activeTab === 1 ? "border-2 border-black font-semibold  " : ""
          }`}
        >
          <MdOutlinePhotoLibrary size={20} />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="text-sm sm:text-base"
          >
            Posts
          </P>
        </Tab>

        <Tab
          className={`flex gap-1 items-center cursor-pointer px-3 py-2 ${
            activeTab === 2 ? "border-2 border-black font-semibold " : ""
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

        <div className="flex gap-4">
          {data?.authorise ? null : data?.isMember ? (
            <span
              onClick={handleUnfollow}
              className="border-2 py-1.5 px-3 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-sm  transition-none whitespace-nowrap"
            >
              {isPending ? "Loading..." : "Unfollow"}
            </span>
          ) : (
            <span
              onClick={handleFollow}
              className="border-2 py-1.5 px-3 rounded-md text-center bg-black text-white border-black font-semibold cursor-pointer text-sm  transition-none whitespace-nowrap"
            >
              {isFollowPending ? "Loading..." : "Follow"}
            </span>
          )}
        </div>
      </TabList>

      <TabPanel>
        <CircleAbout data={data?.data} />
      </TabPanel>
      <TabPanel>
        <CircleDescription data={data} />
      </TabPanel>
      <TabPanel>
        <Followers newData={data} />
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
  );
};

export default CircleHead;
