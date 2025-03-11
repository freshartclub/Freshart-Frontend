import Header from "../ui/Header";
import P from "../ui/P";

const CirleLeft = ({ data }) => {
  return (
    <div className="lg:w-[60%] w-full">
      <div className="shadow border bg-white py-3 items-center justify-center rounded-xl flex">
        <div className="border-r border-dashed px-14 text-center flex gap-8 items-center">
          <div>
            <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
              {data?.data?.followerCount}
            </Header>
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Follower
            </P>
          </div>

          <div>
            <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
              {data?.data?.postCount}
            </Header>
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
              Posts
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CirleLeft;
