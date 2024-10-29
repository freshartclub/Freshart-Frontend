import React, { useState } from "react";

export default function Notification() {
  const [toggles, setToggles] = useState([
    {
      section: "Activity",
      paragraph: "Donec mi odio, faucibus at, scelerisque quis",
      items: [
        { label: "Email me when someone comments on my article", value: true },
        { label: "Email me when someone answers on my form", value: true },
        { label: "Email me when someone follows me", value: false },
      ],
    },
    {
      section: "Application",
      paragraph: "Vestibulum facilisis, purus nec pulvinar iaculis",
      items: [
        { label: "News and announcements", value: true },
        { label: "Weekly product updates", value: true },
        { label: "Weekly blog digest", value: false },
      ],
    },
  ]);

  const handleToggleChange = (sectionIndex: number, itemIndex: number) => {
    const updatedToggles = [...toggles];
    updatedToggles[sectionIndex].items[itemIndex].value =
      !updatedToggles[sectionIndex].items[itemIndex].value;
    setToggles(updatedToggles);
  };

  return (
    <div className="mx-auto p-6 rounded-lg shadow-lg ">
      {toggles.map((item, sectionIndex) => (
        <div
          key={sectionIndex}
          className="mb-8 flex justify-between flex-col md:flex-row"
        >
          <div className="flex flex-col w-96">
            <h2 className="text-md font-semibold w-[334px] h-[28px]">
              {item.section}
            </h2>
            <p className="text-gray-500 mt-2 text-base w-[3x] h-[22px]">
              {item.paragraph}
            </p>
          </div>
          {/* The toggles section for each section */}
          <div className="bg-[#F4F6F8] px-4 py-10 rounded-lg shadow-md space-y-4 w-[60%]">
            {item.items.map((toggle, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between"
              >
                {/* Left-aligned label */}
                <span className="text-[#1C252E]">{toggle.label}</span>

                {/* Right-aligned toggle button */}
                <button
                  onClick={() => handleToggleChange(sectionIndex, itemIndex)}
                  className={`${
                    toggle.value ? "bg-[#102030]" : "bg-gray-300 "
                  } relative inline-flex h-6 w-11 rounded-full transition-colors `}
                >
                  <span className="sr-only">{`Toggle ${toggle.label}`}</span>
                  <span
                    className={`${
                      toggle.value ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform bg-white rounded-full transition-transform m-1`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#102030] text-white rounded-md shadow ">
          Save changes
        </button>
      </div>
    </div>
  );
}
