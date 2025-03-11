import { useState } from "react"; // Add this import
import { FaLocationDot } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useGetFollowers } from "./https/useGetFollowers";
import useRemoveFollowerMutaion from "./https/useRemoveFollowerMutaion";

const Followers = ({ newData }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

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
        Followers
      </Header>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 2xl:gap-10 mt-5 mb-10">
          {data?.data?.length > 0 ? (
            data?.data?.map((item, index: number) => (
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
                      className="text-base xl:text-md truncate"
                    >
                      {name(item?.user)}
                    </P>
                    <div className="flex items-center gap-2">
                      <FaLocationDot size={15} />
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
            <div className="col-span-full text-center text-gray-500  border border-zinc-300 rounded py-4">
              No Followers Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Followers;
