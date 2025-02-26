import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import location from "./assets/location.png";
import { useGetFollowers } from "./https/useGetFollowers";
import useRemoveFollowerMutaion from "./https/useRemoveFollowerMutaion";
import { useState } from "react"; // Add this import

const Followers = ({ newData }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Add state to track which follower is being removed
  const [removingUserId, setRemovingUserId] = useState(null);

  const userId = useAppSelector((state) => state?.user?.user?._id);

  const { data, isLoading } = useGetFollowers(id);

  const { mutate, isPending } = useRemoveFollowerMutaion();

  const isManager =
    newData?.data?.managers?.some((manager) => manager?._id === userId) ||
    false;

  const handleFollowClick = (userId) => {
    setRemovingUserId(userId);
    const newData = {
      circleId: id,
      userId: userId,
    };
    mutate(newData, {
      onSettled: () => {
        setRemovingUserId(null);
      },
    });
  };

  console.log(data?.data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mx-auto px-3 sm:px-6 min-h-[50vh]">
        <div>
          <div className="mt-5 md:mt-10 lg:mt-20">
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              Followers
            </Header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 2xl:gap-10 my-10">
              {data?.data?.length > 0 ? (
                data?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center shadow-xl border p-5 lg:p-3 xl:p-8 rounded-xl"
                  >
                    <div className="flex items-center gap-2 xl:gap-4 w-full max-w-[70%]">
                      <img
                        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover"
                        src={`${imageUrl}/users/${item?.user?.img}`}
                        alt="profile image"
                      />
                      <div className="min-w-0">
                        <P
                          variant={{
                            size: "md",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="text-base xl:text-md truncate"
                        >
                          {item?.user?.artistName +
                            " " +
                            item?.user?.artistSurname1 +
                            " " +
                            item?.user?.artistSurname2}
                        </P>
                        <div className="flex items-center gap-2">
                          <img
                            src={location}
                            alt="location icon"
                            className="w-4 h-4"
                          />
                          <P
                            variant={{ size: "small", weight: "normal" }}
                            className="text-[#919EAB] truncate"
                          >
                            {item?.user?.location?.country}
                          </P>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isManager ? (
                        <Button
                          variant={{
                            fontSize: "small",
                            rounded: "md",
                            fontWeight: "600",
                          }}
                          onClick={() => handleFollowClick(item?.user?._id)}
                          className="border border-[#919EAB51] py-1 px-2 whitespace-nowrap"
                        >
                          {isPending && removingUserId === item?.user?._id
                            ? "Removing..."
                            : "Remove"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-4">
                  No Followers
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
