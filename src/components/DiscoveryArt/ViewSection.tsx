import share from "./assets/share.png";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import like from "./assets/like.png";
import { useNavigate } from "react-router-dom";
import { useGetCollections } from "./http/useGetCollections";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import DOMPurify from "dompurify";

const ViewSection = () => {
  const { data, isLoading } = useGetCollections();

  const navigate = useNavigate();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="sm:px-6 px-3 my-5">
      {data &&
        data.length > 0 &&
        data.map((item, i: number) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row ${
              i % 2 === 0 ? "gap-5" : "md:flex-row-reverse justify-start gap-5"
            }`}
          >
            <img
              src={`${imageUrl}/users/${item?.collectionFile}`}
              alt=""
              className="h-[250px] w-[300px] rounded"
            />
            <div className="flex flex-col justify-center">
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="uppercase tracking-wide text-pink text-md mb-2"
              >
                {new Date(item.createdAt).toDateString()}
              </P>
              <Header
                variant={{ size: "xl", weight: "bold", theme: "dark" }}
                className="text-2xl mb-4"
              >
                {item?.collectionName}
              </Header>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.collectionDesc),
                }}
              />
              <div className="flex items-center mt-4 space-x-4">
                <Button
                  variant={{
                    fontSize: "sm",
                    theme: "light",
                    fontWeight: "600",
                    rounded: "full",
                    thickness: "thick",
                  }}
                  className="border border-[#FF536B80]"
                  onClick={() => navigate(`/collections/${item._id}`)}
                >
                  View Collection
                </Button>
                <img src={like} alt="like btn" className="w-[39px] h-[40px]" />
                <img
                  src={share}
                  alt="share btn"
                  className="w-[39px] h-[40px]"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewSection;
