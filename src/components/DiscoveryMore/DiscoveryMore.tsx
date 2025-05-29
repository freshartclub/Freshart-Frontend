import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";
import { useGetCollectionById } from "./http/useGetCollectionById";

const DiscoveryMore = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCollectionById(id);

  const images = useMemo(
    () =>
      data?.artworkList?.map((item: any) => ({
        id: item._id,
        name: item.artworkDetails?.artworkName || "Untitled",
        src: item.artworkDetails?.media || "",
        description: item.artworkDesc || "No description available.",
      })) || [],
    [data]
  );

  const currentImage = images[currIndex];

  if (isLoading) return <Loader />;

  return (
    <>
   
      <section className="bg-[#f1f1f1] p-6 md:px-12">
        <Header variant={{ size: "3xl", theme: "dark", weight: "bold" }}>
          {data?.collectionName}
        </Header>
        <div
          className="mt-4 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.collectionDesc || ""),
          }}
        />
        <div className="flex items-center mt-6 gap-3">
          <img
            src={`${imageUrl}/users/${data?.expertDetails?.expertImg}`}
            alt="curator"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">
              Curated by <span className="font-semibold">{data?.expertDetails?.createdBy}</span>
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Description</span> —{" "}
              {data?.expertDetails?.expertDesc}
            </p>
          </div>
        </div>
      </section>

      
      <section className="flex flex-col md:flex-row items-center p-6 gap-6">
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
          src={`${lowImageUrl}/${currentImage?.src}`}
          alt={currentImage?.name || "Artwork"}
          className="w-full md:w-1/2 h-[330px] object-cover rounded-xl shadow-md"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-1/2 bg-gray-100 p-6 rounded-xl shadow-inner h-[330px] overflow-y-auto"
        >
          <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
            {currentImage?.name}
          </Header>
          <p
            className="mt-3 text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(currentImage?.description || ""),
            }}
          />
        </motion.div>
      </section>

      
      <div className="flex overflow-x-auto gap-3 px-6 py-4 justify-center">
        {images.map((item, i) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.id}
            onClick={() => setCurrIndex(i)}
            src={`${lowImageUrl}/${item.src}`}
            alt={item.name || "thumbnail"}
            loading="lazy"
            className={`w-28 h-20 object-cover rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              currIndex === i ? "border-black" : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default DiscoveryMore;
