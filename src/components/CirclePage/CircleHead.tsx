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
import Managers from "./Managers";

const CircleHead = ({data}) => {
  const [activeTab, setActiveTab] = useState(0); // 0 = Profile, 1 = Followers, 2 = Blogs

  return (
    <div>
      <div className="flex sm:justify-between w-full flex-wrap justify-between sm:gap-0 gap-2">
        <img src={`${imageUrl}/users/${data?.data?.mainImage}`} alt="" className="-mt-[50px] w-[18vw] h-[18vw] rounded-full object-cover" />
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
            <img src={profile2} alt="followers icon" />
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
              activeTab === 2 ? "border-b-2 border-black" : ""
            }`}
          >
           <GrUserManager size="1.2em" />
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
             Manager
            </P>
          </Tab>
        </TabList>

       
        <TabPanel>
          <CircleDescription data={data}/>
        </TabPanel>
        <TabPanel>
          <Followers />
        </TabPanel>
        <TabPanel>
          <Blogs />
        </TabPanel>
        <TabPanel>
          <Managers data={data}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CircleHead;
