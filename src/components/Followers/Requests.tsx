import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetRequest } from "./https/useGetRequest";
import useRequestAcceptMutation from "./https/useRequestAcceptMutation";
import useDeleteFollowerRequest from "./https/useDeleteFollowerRequest";

interface RequestProps {
  dark?: boolean;
}

const Requests = ({ dark = false }: RequestProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;

  const { data, isLoading } = useGetRequest(id);

  const { mutate, isPending: acceptPending } = useRequestAcceptMutation();
  const { mutate: rejectMutation } = useDeleteFollowerRequest();

  const [acceptStates, setAcceptStates] = useState<Record<string, string>>({});
  const [rejectStates, setRejectStates] = useState<Record<string, string>>({});

  const handleFollowClick = (requestId: string) => {
    try {
      const newData = {
        circleId: id,
        requestId: requestId,
      };

      setAcceptStates((prev) => ({ ...prev, [requestId]: "Loading" }));
      mutate(newData);
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
      rejectMutation(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const name = (val: any) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += ` "${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <section
      className={`mx-auto px-3 sm:px-6 my-8 ${
        dark ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header
          variant={{
            size: "2xl",
            theme: dark ? "light" : "dark",
            weight: "bold",
          }}
          className="mb-1"
        >
          Join Requests
        </Header>
        <P
          variant={{
            theme: dark ? "light" : "dark",
            weight: "normal",
          }}
          className="opacity-80"
        >
          {data?.data?.length || 0} Pending Requests
        </P>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
          <AnimatePresence>
            {data?.data?.length ? (
              data.data.map((item, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-xl shadow-sm transition-all duration-200 ${
                    dark
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } border flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`${imageUrl}/users/${item?.user?.img}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      alt="profile"
                    />
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
                        <FaMapMarkerAlt
                          size={14}
                          className={dark ? "text-blue-400" : "text-blue-600"}
                        />
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
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant={{
                        fontSize: "sm",
                        rounded: "lg",
                        fontWeight: "medium",
                      }}
                      onClick={() => handleFollowClick(item._id)}
                      className={`flex-1 ${
                        acceptStates[item._id] === "Accepted"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-[#EE1D52] hover:bg-[#ff386a] text-white"
                      }`}
                      disabled={
                        acceptPending && acceptStates[item._id] === "Loading"
                      }
                    >
                      {acceptStates[item._id] === "Loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing
                        </span>
                      ) : (
                        acceptStates[item._id] || "Accept"
                      )}
                    </Button>
                    <Button
                      variant={{
                        fontSize: "sm",
                        rounded: "lg",
                        fontWeight: "medium",
                      }}
                      onClick={() => handleReject(item._id)}
                      className={`flex-1 ${
                        rejectStates[item._id] === "Rejected"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : dark
                          ? "bg-gray-600 hover:bg-gray-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                      disabled={rejectStates[item._id] === "Loading"}
                    >
                      {rejectStates[item._id] === "Loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing
                        </span>
                      ) : (
                        rejectStates[item._id] || "Reject"
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`col-span-full py-8 rounded-xl text-center ${
                  dark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                } border`}
              >
                <P
                  variant={{
                    size: "md",
                    theme: dark ? "light" : "dark",
                    weight: "medium",
                  }}
                  className="opacity-70"
                >
                  No pending requests
                </P>
                <P
                  variant={{
                    theme: dark ? "light" : "dark",
                    weight: "normal",
                  }}
                  className="mt-1 opacity-50"
                >
                  There are no join requests at this time
                </P>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default Requests;
