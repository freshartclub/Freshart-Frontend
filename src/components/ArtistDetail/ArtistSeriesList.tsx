import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtworkSeriesByName } from "./http/getArtworkSeriesByName";
import ArtCard from "../HomePage/ArtCard";

const dummySeries = [
  "Hand Series",
  "Nature Wonders",
  "New Series",
  "Urban Vibes",
  "Abstract Collection",
];

const ArtistSeriesList = () => {
  const navigate = useNavigate();

  const { series } = useParams();
const seriesName = decodeURIComponent(series);

console.log("Series Name:", seriesName);

const {data, isLoading} = getArtworkSeriesByName(seriesName);

console.log("Data:", data);

  const handleSeriesClick = (seriesName: string) => {
    navigate(`/artist-series/${encodeURIComponent(seriesName)}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">

        <ArtCard data={data?.data} title={"Artist Series"} viewType="new" loading={isLoading} />
      
    </div>
  );
};

export default ArtistSeriesList;
