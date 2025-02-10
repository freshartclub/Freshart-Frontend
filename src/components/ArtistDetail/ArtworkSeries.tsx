import { useParams } from "react-router-dom";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetArtWorkBySeries } from "./http/getArtworkBySeries";

const ArtworkSeries = () => {
  const id = useParams().id;

  const { data, isLoading } = useGetArtWorkBySeries(id);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-8 series_artwork">
      <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
        Series of Artwork
      </Header>

      <div className="flex flex-row flex-wrap items-center gap-3 py-5 w-full px-3">
        {data?.data && data?.data.length > 0 ? (
          data?.data?.map((group, i) => (
            <div
              key={i}
              className="group-container flex-1 max-w-[100%] sm:max-w-[48%] lg:max-w-[30%] h-full border border-zinc-300"
            >
              <div className="artworks-container">
                {group?.artworks && group?.artworks?.length === 1 ? (
                  <div className="p-2 flex items-center justify-center">
                    <img
                      src={`${imageUrl}/users/${group.artworks[0].media}`}
                      alt="Artwork"
                      className="object-cover w-[90%]  sm:w-[40vw] h-[32vh] rounded-md"
                    />
                  </div>
                ) : group?.artworks && group?.artworks?.length === 2 ? (
                  <div className="flex items-center justify-center gap-2 p-2">
                    {group?.artworks?.map((artwork, idx: number) => (
                      <img
                        key={idx}
                        src={`${imageUrl}/users/${artwork?.media}`}
                        alt={`Artwork ${idx + 1}`}
                        className="object-cover w-[45%] overflow-hidden sm:w-[40vw] h-[32vh] rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 p-2  h-[34.5vh]">
                    <div className="w-[60%]">
                      <img
                        src={`${imageUrl}/users/${group.artworks[0].media}`}
                        alt="Main Artwork"
                        className="object-cover w-full h-full  rounded-md"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[40%]">
                      <div className="w-full h-[48%]">
                        <img
                          src={`${imageUrl}/users/${group.artworks[1].media}`}
                          alt="Artwork 2"
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${imageUrl}/users/${group.artworks[2].media})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="relative cursor-pointer flex items-center justify-center text-center font-semibold text-white rounded-md h-[48%] w-full"
                      >
                        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        <span className="relative font-bold drop-shadow-lg">
                          See All
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <h3 className="group-name  font-semibold text-md p-2">
                  {group?.groupName}
                </h3>

                <h3 className="group-name font-medium text-sm p-2 uppercase">
                  Artworks: {group?.artworks?.length || 0}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 border w-full bg-white mx-auto text-center font-semibold">
            No Series Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkSeries;
