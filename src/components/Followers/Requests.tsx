import P from "../ui/P";
import Header from "../ui/Header";
import location from "./assets/location.png";
import Button from "../ui/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRequest } from "./https/useGetRequest";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import useRequestAcceptMutation from "./https/useRequestAcceptMutation";
import useDeleteFollowerRequest from "./https/useDeleteFollowerRequest";

const Requests = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetRequest(id);
  const { mutate, isPending: acceptPending } = useRequestAcceptMutation();
  const { mutate: rejectMutation } = useDeleteFollowerRequest();

  const [acceptStates, setAcceptStates] = useState({});
  const [rejectStates, setRejectStates] = useState({});

  const handleFollowClick = (requestId: string) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };

      setAcceptStates((prev) => ({ ...prev, [requestId]: "Loading" }));
      mutate(newData, {
        onSuccess: () => {
          setAcceptStates((prev) => ({ ...prev, [requestId]: "Accepted" }));
        },
        onError: (error) => {
          console.error(error);
          setAcceptStates((prev) => ({ ...prev, [requestId]: "Accept" }));
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = (requestId: string) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };

      setRejectStates((prev) => ({ ...prev, [requestId]: "Loading" }));
      rejectMutation(newData, {
        onSuccess: () => {
          setRejectStates((prev) => ({ ...prev, [requestId]: "Rejected" }));
        },
        onError: (error) => {
          console.error(error);
          setRejectStates((prev) => ({ ...prev, [requestId]: "Reject" }));
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="mx-auto px-3 sm:px-6 my-5">
      <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
        Requests
      </Header>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-10 md:gap-6 gap-5 mt-5 mb-10">
          {data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between border border-zinc-300 items-center shadow-md p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 xl:gap-4 w-full max-w-[70%]">
                  <img
                    src={`${imageUrl}/users/${item?.user?.img}`}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="profile image"
                  />
                  <div className="flex flex-col gap-1">
                    <P
                      variant={{
                        size: "md",
                        theme: "dark",
                        weight: "semiBold",
                      }}
                      className="xl:text-md text-base"
                    >
                      {name(item?.user)}
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
                    {acceptStates[item._id] === "Loading" ||
                    (acceptPending && acceptStates[item._id] === "Loading")
                      ? "Loading.."
                      : acceptStates[item._id] || "Accept"}
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
                    {rejectStates[item._id] === "Loading"
                      ? "Loading.."
                      : rejectStates[item._id] || "Reject"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500  border border-zinc-300 rounded py-4">
              No Request Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Requests;
