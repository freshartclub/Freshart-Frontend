import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import CircleHead from "./CircleHead";
import { useGetCircleDetails } from "./https/useGetCircleDetails";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";

const CirclePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const isViewed = searchParams.get("isViewed") as string;

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
    <div className="relative">
      <img
        src={`${imageUrl}/users/${data?.data?.coverImage}`}
        alt="banner image"
        className="w-full h-[40vh] object-cover opacity-75"
      />
      <div className="container mx-auto sm:px-6 px-3">
        <img
          src={`${imageUrl}/users/${data?.data?.mainImage}`}
          alt="profile image"
          className=" absolute top-5 w-24 h-24 sm:w-32 sm:h-32 lg:w-[18vw] lg:h-[18vw] rounded-full shadow-2xl object-cover border-2 border-zinc-600"
        />
        <CircleHead data={data} />
      </div>
    </div>
  );
};

export default CirclePage;
