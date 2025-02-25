import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../ui/Header";
import P from "../ui/P";
import { useGetCollectionById } from "./http/useGetCollectionById";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import DOMPurify from "dompurify";

const DiscoveryMore = () => {
  const [images, setImages] = useState<{ src: string; name: string }[]>([]);
  const mainImagesContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCollectionById(id);

  useEffect(() => {
    if (data && data.artworks) {
      const imgs = data.artworks.map((item: any) => ({
        name: item.artworkName,
        src: item.media,
      }));
      setImages(imgs);
    }
  }, [data]);

  const handleThumbnailClick = (index: number) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="mt-4 flex md:flex-row flex-col md:gap-10">
        <div className="lg:w-[47%] md:w-[48%] w-full">
          <div className="flex flex-col gap-2">
            <Header variant={{ size: "4xl", theme: "dark", weight: "bold" }}>
              {data?.collectionName}
            </Header>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.collectionDesc || ""),
              }}
            />
          </div>

          <div className="overflow-x-auto flex gap-3 md:my-20 my-5">
            {images.map((thumb, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-2 cursor-pointer min-w-max"
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={`${lowImageUrl}/${thumb.src}`}
                  alt={thumb.name}
                  className="sm:w-24 sm:h-24 w-14 h-14 rounded-xl object-cover"
                />
                <P
                  variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                >
                  {thumb.name}
                </P>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-[47%] md:w-[48%] md:mt-5 mt-0 md:mb-0 mb-5 w-full">
          <div
            ref={mainImagesContainerRef}
            className="flex flex-col overflow-y-auto gap-4 snap-y snap-mandatory scroll-smooth rounded-xl p-2 max-h-[330px]"
          >
            {images.map((img, index: number) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                className="snap-center flex-shrink-0 w-full"
              >
                <img
                  src={`${lowImageUrl}/${img.src}`}
                  alt={img.name}
                  className="w-full h-[330px] object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryMore;
