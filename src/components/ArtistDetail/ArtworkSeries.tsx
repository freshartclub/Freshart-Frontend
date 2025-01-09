import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetArtWorkBySeries } from "./http/getArtworkBySeries";
import { useSearchParams } from "react-router-dom";

const ArtworkSeries = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetArtWorkBySeries(id);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-8 series_artwork">
      <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
        Series of Artwork
      </Header>

      <div className=" flex flex-row flex-wrap items-center gap-3 py-5 w-full px-3">
        {data?.data && data?.data.length > 0
          ? data?.data?.map((group, i) => (
              <div
                key={i}
                className="group-container flex-1 min-w-[10rem] h-full border border-zinc-300"
              >
                <div className="artworks-container">
                  {group?.artworks && group?.artworks?.length === 2 ? (
                    <div className="flex  items-center gap-2 overflow-hidden p-2">
                      {group?.artworks?.map((artwork, idx) => (
                        <img
                          key={idx}
                          src={`${imageUrl}/users/${artwork?.media}`}
                          alt={`Artwork ${idx + 1}`}
                          className="object-cover w-[50%] h-[32vh]"
                        />
                      ))}
                    </div>
                  ) : group?.artworks && group?.artworks?.length > 2 ? (
                    <div className="flex gap-2 p-2">
                      <div className="row-span-1">
                        <img
                          src={`${imageUrl}/users/${group.artworks[0].media}`}
                          alt="Main Artwork"
                          className="object-cover w-full h-[32vh]"
                        />
                      </div>

                      <div className="flex flex-col gap-2 items-center bg-red-100">
                        <div className="w-full h-full">
                          <img
                            src={`${imageUrl}/users/${group.artworks[1].media}`}
                            alt="Artwork 2"
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div
                          style={{
                            backgroundImage: `url(${imageUrl}/users/${group.artworks[2].media})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100%",
                            width: "100%",
                          }}
                          className="relative cursor-pointer flex items-center justify-center text-center font-semibold text-white"
                        >
                          <div className="absolute inset-0 bg-black opacity-50"></div>
                          <span className="relative  font-bold drop-shadow-lg">
                            See All
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2">
                      {group?.artworks &&
                        group?.artworks?.map((artwork, idx) => (
                          <img
                            key={idx}
                            src={`${imageUrl}/users/${artwork?.media}`}
                            alt={`Artwork ${idx + 1}`}
                            className="object-cover w-full h-[32vh]"
                          />
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="group-name font-medium text-md p-2 ">
                    {group?.groupName}
                  </h3>

                  <h3 className="group-name text-md p-2">
                    Artworks : {group?.artworks?.length}
                  </h3>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ArtworkSeries;
