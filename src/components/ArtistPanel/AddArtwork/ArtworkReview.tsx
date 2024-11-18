// import { useRef } from "react";

// import Slider from "react-slick";
// // import share from "./assets/share.png";
// // import P from "../ui/P";
// import { Link, useSearchParams } from "react-router-dom";
// import arrow from "../../../assets/arrow_22.png";
// import eye from "./assets/eye.png";
// import share from "./assets/share.png";
// // import home from "./assets/share.png";
// import DiscoverContent from "./DiscoverContent";
// import ProductInfo from "./ProductInfo";
// import SelectedSection from "./SelectedSection";
// import Loader from "../../ui/Loader";
// import { useGetArtWorkById } from "./http/useGetArtworkById";
// import Button from "../../ui/Button";
// import { BsEye } from "react-icons/bs";
// import P from "../../ui/P";
// import useGetPublishedArtwork from "./http/useGetPublishedArtwork";

// const ArtworkReview = () => {
//   const sliderRef = useRef<Slider>(null);

//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");

//   const { data, isLoading } = useGetArtWorkById(id);
//   console.log("this is from more", data);

//   // const settings = {
//   //   dots: false,
//   //   infinite: true,
//   //   arrows: false,
//   //   speed: 500,
//   //   slidesToShow: 1,
//   //   slidesToScroll: 1,
//   // };

//   const settings = {
//     dots: false,
//     arrow: false,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 500,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false,
//           arrow: false,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false,
//           arrow: false,
//         },
//       },
//       {
//         breakpoint: 639,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false,
//           arrow: false,
//         },
//       },
//       {
//         breakpoint: 150,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false,
//           arrow: false,
//         },
//       },
//     ],
//   };

//   const handleThumbnailClick = (index: number) => {
//     if (sliderRef.current) {
//       sliderRef.current.slickGoTo(index);
//     }
//   };

//   const images = data?.data
//     ? [
//         { src: data?.data.media?.mainImage, alt: "Main Image" },
//         { src: data?.data.media?.backImage, alt: "Back Image" },
//         { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
//       ]
//     : [];

//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <>
//       <div className="container mx-auto sm:px-6 px-3 ">
//         <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center mt-10">
//           <li>
//             <Link to="/" className="rounded-md transition-all flex">
//               <img
//                 // src={home}
//                 alt="Home icon"
//                 className="w-[14px] h-[14px] mr-2"
//               />
//               <P
//                 variant={{ size: "small", theme: "dark", weight: "medium" }}
//                 className="text-[#FF536B]"
//               >
//                 ArtWork Preview
//               </P>
//             </Link>
//           </li>
//           {/* <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-2" /> */}
//           {/* <li>
//             <Link to="/" className="rounded-md transition-all flex">
//               <P
//                 variant={{ size: "small", theme: "dark", weight: "medium" }}
//                 className="text-[#FF536B]"
//               >
//                 Purchase
//               </P>
//             </Link>
//           </li> */}
//           {/* <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-2" />
//           <li>
//             <Link
//               to="/products"
//               className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
//             >
//               <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
//                 Print art website
//               </P>
//             </Link>
//           </li> */}
//         </ul>

//         {/* <div className="flex lg:flex-row flex-col items-center xl:gap-10 gap-2 mt-10"> */}
//         <div className="flex lg:flex-row flex-col items-center gap-8 mt-10">
//           {/* <div className="flex md:flex-row flex-col xl:gap-4 gap-2 md:w-[50%] w-full md:items-center"> */}
//           <div className="flex md:flex-row flex-col gap-4 md:w-[50%] w-full md:items-center">
//             {/* Thumbnails Container */}
//             <div className="flex md:flex-col flex-row md:gap-0 gap-2 w-[15%] lg:ml-4 ">
//               {images.map((thumb, index) => {
//                 console.log(thumb);
//                 return (
//                   <img
//                     key={index}
//                     src={`${data?.url}/user${thumb.src}`}
//                     alt={thumb.alt}
//                     className="mb-4 lg:w-20 w-24 h-24 lg:h-24"
//                     onClick={() => handleThumbnailClick(index)}
//                   />
//                 );
//               })}
//             </div>

//             {/* Slider Container */}
//             <div className="flex-1 md:w-[70%] w-[20%]">
//               <Slider {...settings} ref={sliderRef} className="discover_more">
//                 {images.map((slide, index) => (
//                   <div key={index}>
//                     <img
//                       src={`${data?.url}/user${slide.src}`}
//                       alt={`Slide ${index + 1}`}
//                       className="h-fit md:w-full w-auto overflow-y-hidden"
//                     />
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </div>

//           <div className="md:w-[50%] w-[20%] ">
//             <DiscoverContent data={data?.data} />
//           </div>
//         </div>
//         <div className="flex justify-center md:w-[50%] w-full gap-10 mb-10">
//           <div className="flex gap-1">
//             <img src={eye} alt="eye" className="w-[19px] h-[12px] mt-1" />
//             <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
//               View in Room
//             </P>
//           </div>
//           <Button className="flex gap-1 !p-0">
//             <img src={share} alt="share" className="w-[19px] h-[16px] mt-1" />
//             <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
//               Share
//             </P>
//           </Button>
//         </div>

//         <ProductInfo data={data} />
//       </div>
//       <SelectedSection data={data} />
//     </>
//   );
// };

// export default ArtworkReview;

import { useRef } from "react";
import Slider from "react-slick";
import eye from "./assets/eye.png";
import share from "./assets/share.png";
import DiscoverContent from "./DiscoverContent";
import ProductInfo from "./ProductInfo";
import SelectedSection from "./SelectedSection";
import { Link, useSearchParams } from "react-router-dom";
// import arrow from "../../assets/arrow_22.png";
// import home from "../../assets/home.png";
import Loader from "../../ui/Loader";
import { useGetArtWorkById } from "./http/useGetArtworkById";
import P from "../../ui/P";
import Button from "../../ui/Button";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const DiscoverMore = () => {
  const sliderRef = useRef<Slider>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const { data, isLoading } = useGetArtWorkById(id);
  console.log("this is from more", data);

  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
      {
        breakpoint: 150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrow: false,
        },
      },
    ],
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const images = data?.data
    ? [
        { src: data?.data.media?.mainImage, alt: "Main Image" },
        { src: data?.data.media?.backImage, alt: "Back Image" },
        { src: data?.data.media?.inProcessImage, alt: "In Process Image" },
      ]
    : [];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="container mx-auto md:px-6 px-3">
        <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center mt-10">
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              {/* <img
                src={home}
                alt="Home icon"
                className="w-[14px] h-[14px] mr-2"
              /> */}
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#FF536B]"
              >
                Artwork preview
              </P>
            </Link>
          </li>
        </ul>

        <div className="flex md:flex-row flex-col  gap-10 mt-10">
          <div className="flex md:flex-row flex-col gap-4 md:w-[50%] w-full md:items-center">
            <div className="flex md:flex-col flex-row md:gap-0 gap-2 w-[15%] lg:ml-4 ">
              {images.map((thumb, index) => {
                console.log(thumb);
                return (
                  <img
                    key={index}
                    src={`${data?.url}/users/${thumb.src}`}
                    alt={thumb.alt}
                    className="mb-4 lg:w-20 w-24 h-24 lg:h-24"
                    onClick={() => handleThumbnailClick(index)}
                  />
                );
              })}
            </div>

            <div className="flex-1 md:w-[70%] w-[50vw]">
              <Slider {...settings} ref={sliderRef} className="discover_more">
                {images.map((slide, index) => (
                  <div key={index}>
                    <img
                      src={`${data?.url}/users/${slide.src}`}
                      alt={`Slide ${index + 1}`}
                      className="md:w-[35vw] w-full h-[50vh] md:h-[80vh] object-cover overflow-y-hidden"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="md:w-[50%] w-full ">
            <DiscoverContent data={data?.data} />
          </div>
        </div>
        <div className="flex justify-center md:w-[50%] w-full gap-10 mb-10">
          <div className="flex gap-1">
            <img src={eye} alt="eye" className="w-[19px] h-[12px] mt-1" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              View in Room
            </P>
          </div>
          <Button className="flex gap-1 !p-0">
            <img src={share} alt="share" className="w-[19px] h-[16px] mt-1" />
            <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
              Share
            </P>
          </Button>
        </div>

        <ProductInfo data={data} />
      </div>
      <SelectedSection data={data} />
    </>
  );
};

export default DiscoverMore;
