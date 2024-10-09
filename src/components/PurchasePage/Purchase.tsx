import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import BannerSection from "./BannerSection";
import FilterSection from "./FilterSection";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const art_data = [
  {
    text: "Painting",
  },
  {
    text: "Photography",
  },
  {
    text: "Sculpture",
  },
  {
    text: "Drawings",
  },
  {
    text: "Prints",
  },
  {
    text: "Inspirational",
  },
  {
    text: "Trade",
  },
];

const Purchase = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const redirectToDiscovery = () => {
    navigate("/discovery_art");
  };

  const search = (e: any) => {
    setQuery(e.target.value);
  };

  const redirectToExplore = () => {
    navigate("/explore");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="container mx-auto sm:px-6 px-3">
        <div className="flex justify-between my-4 items-center">
          <div className="relative w-full">
            <button
              className="lg:hidden p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>

            <div
              className={`${
                isOpen ? "block" : "hidden"
              } lg:flex flex-col lg:flex-row items-start lg:items-center mt-3 lg:mt-0
               space-y-2 lg:space-y-0 lg:space-x-4 bg-white absolute lg:relative z-0 md:w-[40%] sm:w-[50%]
                lg:w-auto shadow-lg lg:shadow-none p-4 lg:p-0`}
            >
              {art_data.map((item, index) => (
                <Link
                  to="/"
                  key={index}
                  className="group font-semibold text-black"
                >
                  <div className="relative inline-block xl:px-2 lg:px-1">
                    {item.text}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-4 ">
            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "500",
                rounded: "full",
              }}
              onClick={redirectToExplore}
            >
              Explore
            </Button>

            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "500",
                rounded: "full",
              }}
              onClick={redirectToDiscovery}
            >
              Discovery
            </Button>
          </div>
        </div>
      </div>
      <BannerSection />
      <FilterSection query={query} search={search} />
    </>
  );
};

export default Purchase;
