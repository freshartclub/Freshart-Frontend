import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetKbDetails } from "./http/useGetKbDetails";
import Loader from "../ui/Loader";

const KbDetails = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const { data, isLoading, isFetching } = useGetKbDetails(id);

  function removeHtmlTags(kbDesc) {
    const div = document.createElement("div");
    div.innerHTML = kbDesc;

    return div.textContent || div.innerText || "";
  }

  const handleBack = () => {
    navigate(-1);
  };

  if (isFetching) {
    return <Loader />;
  }
  return (
    <div>
      <div className="relative w-full h-[100vh]">
        <span
          onClick={() => handleBack()}
          className="absolute left-10 top-8 cursor-pointer"
        >
          <FaArrowLeft />
        </span>
        <div className="container mx-auto p-5 max-w-3xl">
          <h1 className="text-lg md:text-2xl font-bold mb-6">
            {data?.data?.kbTitle}
          </h1>
          <div className="space-y-4">
            <p>{removeHtmlTags(data?.data?.kbDesc)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KbDetails;
