import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import CircleHead from "./CircleHead";
import { useGetCircleDetails } from "./https/useGetCircleDetails";

const CirclePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const isViewed = searchParams.get("isViewed") as string;

  const dark = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    if (isViewed === "see") {
      const timer = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("isViewed");
        window.history.replaceState(null, "", `?${newParams.toString()}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isViewed, searchParams]);

  const { data, isLoading } = useGetCircleDetails(id, isViewed);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`relative ${dark ? "bg-gray-900" : ""} min-h-screen`}>
      <div className="relative">
        <img
          src={`${imageUrl}/users/${data?.data?.coverImage}`}
          alt="banner image"
          className={`w-full h-[40vh] object-cover ${
            dark ? "opacity-50" : "opacity-75"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="mx-auto sm:px-6 relative -mt-16">
        <div className="flex justify-center sm:justify-start">
          <img
            src={`${imageUrl}/users/${data?.data?.mainImage}`}
            alt="profile image"
            className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl object-cover border-4 ${
              dark ? "border-gray-800" : "border-white"
            }`}
          />
        </div>

        <CircleHead data={data} dark={dark} />
      </div>
    </div>
  );
};

export default CirclePage;
