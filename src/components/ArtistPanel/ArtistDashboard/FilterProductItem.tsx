import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";
import image2 from "../assets/Circle Icon Bagde (1).png";
import image3 from "../assets/Circle Icon Bagde (2).png";
import image4 from "../assets/Circle Icon Bagde (3).png";
import image1 from "../assets/Circle Icon Bagde.png";
import { IoOptionsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const FilterProductItem = () => {
  const { t } = useTranslation();
  const products = [
    {
      tag: "All Time",
      product: [
        {
          image: image1,
          title: "Total Revenue",
          price: "75,500",
          discount: "10%",
        },
        {
          image: image2,
          title: "Total Sales",
          price: "31,500",
          discount: "15%",
        },
        {
          image: image3,
          title: "Product SKU",
          price: "247",
          discount: "0%",
        },
        {
          image: image4,
          title: "Balance",
          price: "24,500",
          discount: "-25%",
        },
      ],
    },
    {
      tag: "12 Months",
      product: [
        {
          image: image1,
          title: "Total Revenue",
          price: "30,500",
          discount: "20%",
        },
        {
          image: image2,
          title: "Total Sales",
          price: "20,500",
          discount: "20%",
        },
        {
          image: image3,
          title: "Product SKU",
          price: "158",
          discount: "5%",
        },
        {
          image: image4,
          title: "Balence",
          price: "15,500",
          discount: "-35%",
        },
      ],
    },
    {
      tag: "30 Days",
      product: [
        {
          image: image1,
          title: "Total Revenue",
          price: "30,500",
          discount: "15%",
        },
        {
          image: image2,
          title: "Total Sales",
          price: "25,500",
          discount: "12%",
        },
        {
          image: image3,
          title: "Product SKU",
          price: "45",
          discount: "3%",
        },
        {
          image: image4,
          title: "Balence",
          price: "23,500",
          discount: "-5%",
        },
      ],
    },
    {
      tag: "7 Days",
      product: [
        {
          image: image1,
          title: "Total Revenue",
          price: "75,500",
          discount: "10%",
        },
        {
          image: image2,
          title: "Total Sales",
          price: "31,500",
          discount: "15%",
        },
        {
          image: image3,
          title: "Product SKU",
          price: "247",
          discount: "0%",
        },
        {
          image: image4,
          title: "Balence",
          price: "24,500",
          discount: "-25%",
        },
      ],
    },
    {
      tag: "24 Hour",
      product: [
        {
          image: image1,
          title: "Total Revenue",
          price: "5,500",
          discount: "10%",
        },
        {
          image: image2,
          title: "Total Sales",
          price: "1,500",
          discount: "5%",
        },
        {
          image: image3,
          title: "Product SKU",
          price: "47",
          discount: "3%",
        },
        {
          image: image4,
          title: "Balence",
          price: "4,500",
          discount: "-25%",
        },
      ],
    },
  ];

  const categoris = ["All Time", "12 Months", "30 Days", "7 Days", "24 Hour"];
  const [isActive, setIsActive] = useState(categoris[0]);
  const [curruntProduct, setCurruntProduct] = useState(products[0].product);

  const myProducts = (value: any) => {
    setIsActive(value);
    const result = products.filter((item) => item.tag === value);

    setCurruntProduct(result[0].product);
  };

  return (
    <>
      <div className="flex xl:flex-row flex-col gap-4 justify-between mt-3">
        <div className="flex border gap-1 md:gap-2 py-1 px-1 bg-white w-fit rounded-md border-gray-300 ">
          {categoris.map((category, index) => (
            <div
              key={index}
              className={`rounded-md px-1 md:px-2 ${
                isActive === category
                  ? "bg-[#102030] text-white rounded-md"
                  : ""
              } `}
            >
              <button onClick={() => myProducts(category)}>
                {t(category)}
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <button className="py-1 px-3 rounded-lg border-2 border-gray-50 bg-white   flex items-center gap-2 transition-all duration-200 hover:scale-95">
            <IoOptionsOutline /> {t("Filters")}
          </button>
          <NavLink
            className="py-1 px-2 rounded-md border-gray-100  bg-[#FF536B] text-white flex gap-1 items-center h-fit"
            to={"/artist-panel/artwork/add"}
          >
            <GoPlus /> {t("Upload Artwork")}
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        {curruntProduct.map((value, index) => (
          <div
            key={index}
            className="rounded-md overflow-hidden bg-white border"
          >
            <div className="p-4 flex flex-col items-start">
              <img
                src={value.image}
                alt="product image"
                className="w-[3rem] h-[3rem] object-cover"
              />
              <h5 className="text-[16px] text-[#35637C] pt-3 pb-1">
                {t(value.title)}
              </h5>
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[24px]">${value.price}</p>
                <div className="w-[2.5rem] h-[1.25rem] rounded-xl bg-[#E7F4EE] flex items-center justify-center">
                  <p className="text-[12px] text-[#35637C]">{value.discount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterProductItem;
