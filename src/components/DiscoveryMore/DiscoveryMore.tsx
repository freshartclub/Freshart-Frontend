import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../ui/Header";
import DOMPurify from "dompurify";
import Loader from "../ui/Loader";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import { useGetCollectionById } from "./http/useGetCollectionById";

const DiscoveryMore = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCollectionById(id);

  const images =
    data?.artworkList?.map((item: any) => ({
      id: item._id,
      name: item.artworkDetails.artworkName,
      src: item.artworkDetails.media,
      description: item.artworkDesc || "No description available.",
    })) || [];

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="bg-[#e3e3e3] p-4 px-6">
        <Header variant={{ size: "3xl", theme: "dark", weight: "bold" }}>
          {data?.collectionName}
        </Header>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.collectionDesc || ""),
          }}
        />
        <div className="flex items-center mt-6 gap-2">
          <img
            src={`${imageUrl}/users/${data?.expertDetails?.expertImg}`}
            alt="curator"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-0">
            <span className="flex gap-2 items-center">
              Curated by
              <span className="font-semibold">
                {data?.expertDetails?.createdBy}
              </span>
            </span>
            <p className="text-xs">
              <span className="font-semibold">Description</span> -{" "}
              <span className="text-gray-500">
                {data?.expertDetails?.expertDesc}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex p-5 gap-5 items-center">
        <img
          src={`${lowImageUrl}/${images[currIndex]?.src}`}
          alt={images[currIndex]?.name}
          className="w-[50%] h-[330px] object-cover"
        />

        <div className="bg-gray-200 h-[330px] w-[50%] p-4">
          <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
            {images[currIndex]?.name}
          </Header>
          <p
            className="mt-2 h-[250px] max-h-[300px] overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(images[currIndex]?.description || ""),
            }}
          />
        </div>
      </div>

      <div className="flex max-w-full w-full overflow-auto justify-center my-5 gap-2">
        {images.map((item, i: number) => (
          <img
            key={i}
            className={`w-[7rem] h-[5rem] object-cover cursor-pointer ${
              currIndex === i ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setCurrIndex(i)}
            src={`${lowImageUrl}/${item.src}`}
            alt={item.name}
          />
        ))}
      </div>
    </>
  );
};

export default DiscoveryMore;
