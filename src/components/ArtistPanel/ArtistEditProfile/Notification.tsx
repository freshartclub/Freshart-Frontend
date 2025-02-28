import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Notification() {
  const { t } = useTranslation();
  const [toggles, setToggles] = useState([
    {
      section: t("Activity"),
      paragraph: "Donec mi odio, faucibus at, scelerisque quis",
      items: [
        { label: "Email me when someone comments on my article", value: true },
        { label: "Email me when someone answers on my form", value: true },
        { label: "Email me when someone follows me", value: false },
      ],
    },
    {
      section: t("Application"),
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
    <div className="mx-auto mt-2 bg-white p-4 rounded shadow border">
      {toggles.map((item, sectionIndex) => (
        <div key={sectionIndex} className="mb-8 flex justify-between flex-col">
          <div className="flex flex-col">
            <h2 className="text-md font-semibold">{item.section}</h2>
            <p className="text-gray-500 mt-1 text-sm">{item.paragraph}</p>
          </div>

          <div className="bg-[#F4F6F8] px-4 py-3 mt-3 rounded shadow border space-y-2">
            {item.items.map((toggle, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between"
              >
                <span className="text-[#1C252E]">{toggle.label}</span>

                <button
                  onClick={() => handleToggleChange(sectionIndex, itemIndex)}
                  className={`${
                    toggle.value ? "bg-[#102030]" : "bg-gray-300 "
                  } relative inline-flex h-6 w-11 rounded-full transition-colors `}
                >
                  <span className="sr-only">{`Toggle ${toggle.label}`}</span>
                  <span
                    className={`${
                      toggle.value ? "translate-x-5" : "translate-x-0"
                    } inline-block h-4 w-4 transform bg-white rounded-full transition-transform m-1`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#102030] text-white rounded-md shadow ">
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
}
