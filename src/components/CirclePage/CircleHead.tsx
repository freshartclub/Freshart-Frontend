import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BiInfoCircle } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { MdOutlinePermIdentity, MdOutlinePhotoLibrary } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { useParams, useSearchParams } from "react-router-dom";
import usePostFollowMutation from "../CIrcle/https/usePostFollowMutation";
import Followers from "../Followers/Followers";
import Requests from "../Followers/Requests";
import CircleAbout from "./CircleAbout";
import CircleDescription from "./CircleDescription";
import useUnfollowMutation from "./https/useUnfollowMutation";
import Managers from "./Managers";

interface CircleHeadProps {
  data: any;
  dark: boolean;
}

const CircleHead = ({ data, dark }: CircleHeadProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const circleId = useParams().id as string;

  const { mutate, isPending } = useUnfollowMutation();
  const { mutateAsync, isPending: isFollowPending } = usePostFollowMutation();

  const handleUnfollow = () => {
    mutate(circleId);
  };

  const handleFollow = () => {
    mutateAsync(circleId);
  };

  const tabItems = [
    {
      label: "About",
      icon: <BiInfoCircle size={20} />,
      visible: true,
      panel: <CircleAbout data={data?.data} dark={dark} />,
    },
    {
      label: "Posts",
      icon: <MdOutlinePhotoLibrary size={20} />,
      visible: true,
      panel: <CircleDescription data={data} dark={dark} />,
    },
    {
      label: "Followers",
      icon: <RiUserFollowFill size={20} />,
      visible: true,
      panel: <Followers newData={data} dark={dark} />,
    },
    {
      label: "Managers",
      icon: <GrUserManager size={20} />,
      visible: true,
      panel: <Managers data={data} dark={dark} />,
    },
    {
      label: "Requests",
      icon: <MdOutlinePermIdentity size={20} />,
      visible: data?.authorise ? true : false,
      panel: <Requests dark={dark} />,
    },
  ];

  return (
    <div className="mt-8">
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)} className={dark ? "dark" : ""}>
        <TabList className={`flex flex-wrap gap-2 sm:gap-4 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
          {tabItems.map(
            (item, index) =>
              item.visible && (
                <Tab
                  key={index}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg cursor-pointer transition-colors ${
                    activeTab === index
                      ? dark
                        ? "bg-gray-800 text-white border-b-2 border-[#EE1D52]"
                        : "bg-gray-100 text-gray-900 border-b-2 border-[#EE1D52]"
                      : dark
                      ? "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm sm:text-base font-medium">{item.label}</span>
                </Tab>
              )
          )}

          <div className="ml-auto flex items-center">
            {data?.authorise ? null : data?.isMember ? (
              <button
                onClick={handleUnfollow}
                disabled={isPending}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  dark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isPending ? "Processing..." : "Unfollow"}
              </button>
            ) : (
              <button
                onClick={handleFollow}
                disabled={isFollowPending}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors bg-[#EE1D52] hover:bg-[#f44873] text-white
                ${isFollowPending ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isFollowPending ? "Processing..." : "Follow"}
              </button>
            )}
          </div>
        </TabList>

        <div className={`p-4 sm:p-6 rounded-b-lg ${dark ? "bg-gray-900" : "bg-white"}`}>
          {tabItems.map((item, index) => item.visible && <TabPanel key={index}>{item.panel}</TabPanel>)}
        </div>
      </Tabs>
    </div>
  );
};

export default CircleHead;
