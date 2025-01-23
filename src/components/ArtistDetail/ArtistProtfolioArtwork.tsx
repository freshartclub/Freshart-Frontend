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
    <div>
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4"
      >
        Artworks
      </Header>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {data?.artworks &&
          data?.artworks?.length > 0 &&
          data.artworks.map((item: any, index: any) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none flex flex-col pb-5 justify-center relative"
            >
              <img
                src={`${imageUrl}/users/${item.media.mainImage}`}
                alt="image"
                className="w-full md:w-[40vw] lg:w-[40vw] h-[50vh] object-cover cursor-pointer "
                onClick={() => handleRedirectToDescription(item._id)}
              />

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]  xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item.artworkName}
                  </h1>
                  <div>
                    <p className="text-[14px] text-[#696868]">
                      {item?.additionalInfo?.height} x{" "}
                      {item?.additionalInfo?.width} x{" "}
                      {item?.additionalInfo?.depth} cm
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {name(data?.artist)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtistProtfolioArtwork;
