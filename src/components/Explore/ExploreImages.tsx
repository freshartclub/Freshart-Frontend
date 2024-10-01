import explore1 from "./assets/link1.png";
import explore2 from "./assets/Link2.png";
import explore3 from "./assets/Link3.png";
import explore4 from "./assets/Link4.png";
import explore5 from "./assets/link5.png";
import explore6 from "./assets/link6.png";
import explore7 from "./assets/link7.png";
import explore8 from "./assets/Link8.png";
import explore9 from "./assets/Link9.png";
import explore10 from "./assets/link10.png";
import explore11 from "./assets/link11.png";
import explore12 from "./assets/link12.png";
import explore13 from "./assets/link13.png";
import explore14 from "./assets/link14.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";
import refresh from "./assets/Refresh.png";

const ExploreImages = ({ columnsCount, selectedSize }: any) => {
  const explore_image = [
    {
      explore: explore1,
      size: "s",
    },
    {
      explore: explore2,
      size: "s",
    },
    {
      explore: explore3,
      size: "s",
    },
    {
      explore: explore4,
      size: "s",
    },
    {
      explore: explore5,
      size: "l",
    },
    {
      explore: explore6,
      size: "l",
    },
    {
      explore: explore7,
      size: "m",
    },
    {
      explore: explore8,
      size: "m",
    },
    {
      explore: explore9,
      size: "xl",
    },
    {
      explore: explore10,
      size: "xl",
    },
    {
      explore: explore11,
      size: "xl",
    },
    {
      explore: explore12,
      size: "s",
    },
    {
      explore: explore13,
      size: "s",
    },
    {
      explore: explore14,
      size: "s",
    },
    {
      explore: explore1,
      size: "L",
    },
    {
      explore: explore2,
      size: "L",
    },
    {
      explore: explore3,
      size: "L",
    },
    {
      explore: explore4,
      size: "L",
    },
    {
      explore: explore5,
      size: "L",
    },
    {
      explore: explore6,
      size: "L",
    },
    {
      explore: explore7,
      size: "m",
    },
    {
      explore: explore8,
      size: "m",
    },
    {
      explore: explore9,
      size: "m",
    },
    {
      explore: explore10,
    },
    {
      explore: explore11,
    },
    {
      explore: explore12,
    },
    {
      explore: explore13,
    },
    {
      explore: explore14,
    },
    {
      explore: explore1,
    },
    {
      explore: explore2,
    },
    {
      explore: explore3,
    },
    {
      explore: explore4,
    },
    {
      explore: explore5,
    },
    {
      explore: explore6,
    },
    {
      explore: explore7,
    },
    {
      explore: explore8,
    },
    {
      explore: explore9,
    },
    {
      explore: explore10,
    },
    {
      explore: explore1,
    },
    {
      explore: explore2,
    },
    {
      explore: explore3,
    },
    {
      explore: explore4,
    },
    {
      explore: explore5,
    },
    {
      explore: explore6,
    },
    {
      explore: explore7,
    },
    {
      explore: explore8,
    },
    {
      explore: explore9,
    },
    {
      explore: explore10,
    },
  ];
  const [filteredImages, setFilteredImages] = useState(explore_image);

  useEffect(() => {
    if (selectedSize) {
      setFilteredImages(
        explore_image.filter((img) => img.size === selectedSize)
      );
    } else {
      setFilteredImages(explore_image);
    }
  }, [selectedSize]);

  const initialItemCount = Math.min(filteredImages.length, 14);
  const [visibleItemCount, setVisibleItemCount] = useState(initialItemCount);

  const displayedData = filteredImages.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    const newCount = visibleItemCount + 7;
    setVisibleItemCount(newCount);
  };

  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          430: 2,
          530: columnsCount,
          750: columnsCount,
          900: columnsCount,
          1024: columnsCount,
          1200: columnsCount,
          1500: columnsCount,
        }}
      >
        <Masonry gutter="10px">
          {displayedData.map((item, index) => (
            <img
              src={item.explore}
              alt="explore image"
              key={index}
              className="w-full h-auto"
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {visibleItemCount < explore_image.length && (
        <div
          className="flex items-center gap-3 w-full justify-center my-4"
          onClick={handleLoadMore}
        >
          <img src={refresh} alt="refresh icon" />
          <h2 className="text-dark font-bold">Load more artwork</h2>
        </div>
      )}
    </div>
  );
};

export default ExploreImages;
