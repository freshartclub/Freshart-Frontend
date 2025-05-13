import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useGetFollowers } from "./https/useGetFollowers";
import useRemoveFollowerMutaion from "./https/useRemoveFollowerMutaion";

interface FollowerProps {
  newData?: {
    data?: {
      managers?: Array<{
        _id?: string;
      }>;
    };
  };
  dark?: boolean;
}

const Followers = ({ newData, dark = false }: FollowerProps) => {
  const id = useParams().id as string;
  const [removingUserId, setRemovingUserId] = useState<string | null>(null);
  const userId = useAppSelector((state) => state?.user?.user?._id);
  const { data, isLoading } = useGetFollowers(id);
  const { mutate, isPending } = useRemoveFollowerMutaion();

  const isManager = newData?.data?.managers?.some((manager) => manager?._id === userId) || false;

  const handleFollowClick = (userId: string) => {
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

  const name = (val: any) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += ` "${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <section className={`mx-auto px-3 sm:px-6 my-8 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Header
          variant={{
            size: "2xl",
            theme: dark ? "light" : "dark",
            weight: "bold",
          }}
          className="mb-1"
        >
          Followers
        </Header>
        <P
          variant={{
            theme: dark ? "light" : "dark",
            weight: "normal",
          }}
          className="opacity-80"
        >
          {data?.data?.length || 0} people following
        </P>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <AnimatePresence>
            {data?.data?.length ? (
              data.data.map((item, index: number) => (
                <motion.div
                  key={item?.user?._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-xl shadow-sm transition-all duration-200 ${
                    dark ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"
                  } border flex justify-between items-center`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`${imageUrl}/users/${item?.user?.img}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        alt="profile"
                      />
                    </div>
                    <div className="min-w-0">
                      <Header
                        variant={{
                          size: "lg",
                          theme: dark ? "light" : "dark",
                          weight: "semiBold",
                        }}
                        className="truncate"
                      >
                        {name(item?.user)}
                      </Header>
                      <div className="flex items-center gap-2 mt-1">
                        <FaLocationDot size={14} className={dark ? "text-blue-400" : "text-blue-600"} />
                        <P
                          variant={{
                            theme: dark ? "light" : "dark",
                            weight: "normal",
                          }}
                          className="truncate opacity-80"
                        >
                          {item?.user?.location?.country || "Unknown location"}
                        </P>
                      </div>
                    </div>
                  </div>
                  {isManager && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={{
                          fontSize: "sm",
                          rounded: "lg",
                          fontWeight: "medium",
                        }}
                        onClick={() => handleFollowClick(item?.user?._id)}
                        className={`whitespace-nowrap ${dark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
                        disabled={isPending && removingUserId === item?.user?._id}
                      >
                        {isPending && removingUserId === item?.user?._id ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Removing
                          </span>
                        ) : (
                          "Remove"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`col-span-full py-8 rounded-xl text-center ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} border`}
              >
                <P
                  variant={{
                    size: "md",
                    theme: dark ? "light" : "dark",
                    weight: "medium",
                  }}
                  className="opacity-70"
                >
                  No followers yet
                </P>
                <P
                  variant={{
                    theme: dark ? "light" : "dark",
                    weight: "normal",
                  }}
                  className="mt-1 opacity-50"
                >
                  This circle currently has no followers
                </P>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default Followers;
