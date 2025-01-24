import React, { useState } from "react";
import Description from "./Description";
import Review from "./Review";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProductTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="mt-8">
      <h5 className="font-bold text-xl mb-10 text-[#1C252E]">
        Midnight 3d creative
      </h5>

      <div className="border p-4 shadow-lg">
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <TabList className="flex border-b border-gray-200 ">
            <Tab
              className={`cursor-pointer pb-2  ${
                selectedIndex === 0
                  ? "text-black border-b-2 border-black font-semibold"
                  : "text-gray-500 "
              }`}
            >
              Description
            </Tab>
            <Tab
              className={`cursor-pointer pb-2 mx-4  ${
                selectedIndex === 1
                  ? "text-black border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              Reviews (4)
            </Tab>
          </TabList>

          <TabPanel>
            <Description />
          </TabPanel>
          <TabPanel>
            <Review />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTabs;
