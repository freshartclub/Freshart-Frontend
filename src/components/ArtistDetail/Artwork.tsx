import React, { useState } from "react";
import Header from "../ui/Header";
import { useGetArtWorkList } from "./http/getArtWorkList";
import Loader from "../ui/Loader";
import { NavLink } from "react-router-dom";
import edit from "../ArtistDetail/assets/edit.png";
import deleteimg from "../ArtistDetail/assets/Container (2).png";

const Artwork = () => {
  const { data, isLoading } = useGetArtWorkList();
  const profile = localStorage.getItem("profile");

  // State for selected filters
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [isArtProvider, setIsArtProvider] = useState();

  const disciplines = [
    "Dicipline 1",
    "Dicipline 2",
    "Dicipline 3",
    "Dicipline 4",
  ];
  const series = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];

  const filteredData = data?.data?.filter((item) => {
    return (
      (!selectedDiscipline ||
        item.discipline?.artworkDiscipline === selectedDiscipline) &&
      (!selectedSeries || item.artworkSeries === selectedSeries) &&
      (!isArtProvider || item.isArtProvider === isArtProvider)
    );
  });

  console.log(filteredData);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-3 lg:px-0">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4 mt-4"
      >
        Artworks
      </Header>

      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-3 pb-3 ">
        <select
          className="border p-2 rounded-md text-sm"
          value={isArtProvider}
          onChange={(e) => setIsArtProvider(e.target.value)}
        >
          <option value="">Select Art Provider</option>
          <option value="yes">Yes</option>
        </select>

        <select
          className="border p-2 rounded-md text-sm"
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
        >
          <option value="">Select Discipline</option>
          {disciplines.map((discipline, idx) => (
            <option key={idx} value={discipline}>
              {discipline}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-md text-sm"
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
        >
          <option value="">Select Series</option>
          {series.map((seriesItem, idx) => (
            <option key={idx} value={seriesItem}>
              {seriesItem}
            </option>
          ))}
        </select>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  ">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item: any, index: number) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none flex flex-col pb-5 justify-center relative"
            >
              <img
                src={`${data.url}/users/${item.media.mainImage}`}
                alt="image"
                className="w-full h-[300px] object-cover cursor-pointer "
              />

              {profile === "artist" && (
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#D9D9D9] bg-fixed flex gap-10 items-center justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-[0.7] hover:cursor-pointer">
                  {item?.status === "draft" ? (
                    <div className="flex gap-5">
                      <NavLink to={`/artist-panel/artwork/add?id=${item._id}`}>
                        <img src={edit} alt="edit" />{" "}
                      </NavLink>
                      <img src={deleteimg} alt="delete" />
                    </div>
                  ) : null}
                </div>
              )}

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item.artworkName}
                  </h1>
                  <div>
                    <p className="text-[14px] text-[#696868]">
                      {item?.additionalInfo.artworkTechnic}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {item?.isArtProvider
                    ? item?.owner?.artistName +
                      " " +
                      item?.owner?.artistSurname1
                    : null}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks found matching the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Artwork;
