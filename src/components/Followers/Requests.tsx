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
  const { mutate: rejectMutation, isPending: isRejectPending } =
    useDeleteFollowerRequest();

  const [acceptStates, setAcceptStates] = useState({});
  const [rejectStates, setRejectStates] = useState({}); // New state for reject buttons

  const handleFollowClick = (requestId) => {
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

  const handleReject = (requestId) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };

      setRejectStates((prev) => ({ ...prev, [requestId]: "Loading" })); // Set loading state for this request
      rejectMutation(newData, {
        onSuccess: () => {
          setRejectStates((prev) => ({ ...prev, [requestId]: "Rejected" })); // Optional: Update to "Rejected" on success
        },
        onError: (error) => {
          console.error(error);
          setRejectStates((prev) => ({ ...prev, [requestId]: "Reject" })); // Reset to "Reject" on error
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mx-auto sm:px-6 px-3 min-h-[50vh]">
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
                    <div className="flex xl:gap-4 gap-2 items-center w-[7vh] h-[7vh]">
                      <img
                        className="rounded-full h-full w-full"
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
                <div className="col-span-full text-center text-gray-500 py-4">
                  No Request
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
