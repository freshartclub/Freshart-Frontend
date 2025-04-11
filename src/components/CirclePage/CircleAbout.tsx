import Header from "../ui/Header";
import P from "../ui/P";

interface CircleAboutProps {
  data: {
    description: string;
    followerCount: number;
    postCount: number;
  };
  dark: boolean;
}

const CircleAbout = ({ data, dark }: CircleAboutProps) => {
  return (
    <>
      <div
        className={`shadow ${
          dark ? "bg-gray-800 border-gray-700" : "bg-white"
        } my-5 sm:p-6 p-3 rounded-xl border`}
      >
        <Header
          variant={{
            size: "lg",
            theme: dark ? "light" : "dark",
            weight: "bold",
          }}
        >
          About
        </Header>
        <P
          variant={{
            size: "base",
            theme: dark ? "light" : "dark",
            weight: "medium",
          }}
          className="py-3"
        >
          {data.description || "No description available"}
        </P>
      </div>
      <div
        className={`shadow flex gap-7 justify-center ${
          dark ? "dark:bg-gray-800 dark:border-gray-700" : "bg-white"
        } my-5 sm:p-6 p-3 rounded-xl border`}
      >
        <div className="text-center">
          <Header
            variant={{
              size: "lg",
              theme: dark ? "light" : "dark",
              weight: "bold",
            }}
          >
            {data?.followerCount || 0}
          </Header>
          <P
            variant={{
              size: "base",
              theme: dark ? "light" : "dark",
              weight: "medium",
            }}
          >
            Followers
          </P>
        </div>

        <div className="text-center">
          <Header
            variant={{
              size: "lg",
              theme: dark ? "light" : "dark",
              weight: "bold",
            }}
          >
            {data?.postCount || 0}
          </Header>
          <P
            variant={{
              size: "base",
              theme: dark ? "light" : "dark",
              weight: "medium",
            }}
          >
            Posts
          </P>
        </div>
      </div>
    </>
  );
};

export default CircleAbout;
