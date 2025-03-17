import { useNavigate } from "react-router-dom";
import "../../App.css";
import Header from "../ui/Header";
import { imageUrl } from "../utils/baseUrls";

const ArtistProtfolioArtwork = ({ data }) => {
  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more/${id}`);
    window.scroll(0, 0);
  };

  const name = (val: {
    artistName: string;
    artistSurname1: string;
    artistSurname2: string;
  }) => {
    let fullName = val?.artistName || "";
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  return (
    <div className="container mx-auto px-4">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-6"
      >
        Artworks
      </Header>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data?.artworks && data?.artworks?.length > 0 ? (
          data.artworks.map((item: any, index: any) => (
            <div
              key={index}
              className="group border py-2 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-[#DBEAFE]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${imageUrl}/users/${item.media.mainImage}`}
                  alt={item.artworkName}
                  className="w-full h-auto max-h-[200px] object-contain cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleRedirectToDescription(item._id)}
                  loading="lazy"
                />
                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" /> */}
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">
                  {item.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="font-bold text-xl text-gray-800 w-3/4 line-clamp-2 leading-tight">
                    {item.artworkName}
                  </h1>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      {item?.additionalInfo?.height} ×{" "}
                      {item?.additionalInfo?.width} ×{" "}
                      {item?.additionalInfo?.depth} cm
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {name(data?.artist)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-lg shadow border">
            <p className="text-gray-700 font-semibold">No Artworks Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProtfolioArtwork;
