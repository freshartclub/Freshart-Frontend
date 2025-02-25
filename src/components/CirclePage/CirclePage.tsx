import { useSearchParams } from "react-router-dom";

import CircleHead from "./CircleHead";
import { useGetCircleDetails } from "./https/useGetCircleDetails";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";

const CirclePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isFetching } = useGetCircleDetails(id);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <img
        src={`${imageUrl}/users/${data?.data?.coverImage}`}
        alt="banner image"
        className="w-full h-[25vh] object-cover"
      />
      <div className="container mx-auto sm:px-6 px-3">
        <CircleHead data={data} />
      </div>
    </div>
  );
};

export default CirclePage;
