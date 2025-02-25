import P from "../ui/P";
import profile_image from "./assets/img4.png";
import banner from "./assets/Image.png";
import profile from "./assets/primary-shape1.png";
import profile2 from "./assets/primary-shape.png";
import profile3 from "./assets/primary-shape22.png";
import Header from "../ui/Header";
import location from "./assets/location.png";
import user1 from "./assets/Img_Avatar.2.png";
import user2 from "./assets/Avatar22.png";
import user3 from "./assets/Avatar23.png";
import user4 from "./assets/img25.png";
import user5 from "./assets/Avatar26.png";
import user6 from "./assets/img.png";
import user7 from "./assets/Img_Avatar.8.png";
import user8 from "./assets/Img_Avatar.9.png";
import user9 from "./assets/Avatar.png";
import Button from "../ui/Button";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetRequest } from "./https/useGetRequest";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { isPending } from "@reduxjs/toolkit";
import useRequestAcceptMutation from "./https/useRequestAcceptMutation";
import useDeleteFollowerRequest from "./https/useDeleteFollowerRequest";

const profile_data = [
  {
    img: profile,
    title: "Profile",
    to: "/circle",
  },
  {
    img: profile2,
    title: "Followers",
    to: "/followers",
  },
  {
    img: profile3,
    title: "Blogs",
    to: "/blogs",
  },
];

const Requests = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetRequest(id);
  const { mutate, isPending } = useRequestAcceptMutation();

  const { mutate: rejectMuatation, isPending: isRejectPending } =
    useDeleteFollowerRequest();

  const [isAccepted, setIsAccepted] = useState("Accept");

  const handleFollowClick = (requestId: any) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };
      mutate(newData);
      setIsAccepted("Accepted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = (requestId: any) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };
      rejectMuatation(newData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* <img src={banner} alt="banner" className="w-full" /> */}
      <div className="container mx-auto sm:px-6 px-3">
        <div>
          <div className="lg:mt-20 md:mt-10 mt-5">
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              Requests
            </Header>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-10 md:gap-6 gap-5 my-10">
              {data?.data?.length > 0 ? (
                data?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center shadow-xl border xl:p-8 lg:p-3 p-5 rounded-xl"
                  >
                    <div
                      key={item.id}
                      className="flex xl:gap-4 gap-2 items-center w-[5vw] h-[5vh]"
                    >
                      <img
                        src={`${imageUrl}/users/${item?.user?.img}`}
                        alt="profile image"
                      />
                      <div>
                        <P
                          variant={{
                            size: "md",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="xl:text-md text-base"
                        >
                          {item?.user?.artistName +
                            " " +
                            item?.user?.artistSurname1 +
                            " " +
                            item?.user?.artistSurname2}
                        </P>
                        <div className="flex items-center gap-2">
                          <img src={location} alt="location icon" />
                          <P
                            variant={{ size: "small", weight: "normal" }}
                            className="text-[#919EAB]"
                          >
                            {item?.user?.location?.country}
                          </P>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button
                        variant={{
                          fontSize: "small",
                          rounded: "md",
                          fontWeight: "600",
                        }}
                        onClick={() => handleFollowClick(item._id)}
                        className="border border-[#919EAB51] !py-1 !px-2"
                      >
                        {isPending ? "Loading.." : isAccepted}
                      </Button>

                      <Button
                        variant={{
                          fontSize: "small",
                          rounded: "md",
                          fontWeight: "600",
                        }}
                        onClick={() => handleReject(item._id)}
                        className="border border-[#919EAB51] !py-1 !px-2"
                      >
                        {isRejectPending ? "Loading.." : "Reject"}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Request</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
