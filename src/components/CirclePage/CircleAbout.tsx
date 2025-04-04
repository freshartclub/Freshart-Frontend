import Header from "../ui/Header";
import P from "../ui/P";

const CircleAbout = ({ data }) => {
  return (
    <>
      <div className="shadow bg-white my-5 sm:p-6 p-3 rounded-xl border">
        <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
          About
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "medium" }}
          className="py-3"
        >
          {data.description}
        </P>
      </div>
      <div className="shadow flex gap-7 justify-center bg-white my-5 sm:p-6 p-3 rounded-xl border">
        <div className="text-center">
          <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
            {data?.followerCount}
          </Header>
          <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
            Follower
          </P>
        </div>

        <div className="text-center">
          <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
            {data?.postCount}
          </Header>
          <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
            Posts
          </P>
        </div>
      </div>
    </>
  );
};

export default CircleAbout;
