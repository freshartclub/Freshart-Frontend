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

      <div className="shadow bg-white my-5 sm:p-6 p-3 rounded-xl border">
        <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
          About
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "medium" }}
          className="py-3"
        >
          {data?.data?.description}
        </P>
        {/* <div className="">
          {info_data.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-1">
              <img src={item.icon} alt="icon" />
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {item.title}
              </P>
            </div>
          ))}
        </div> */}
      </div>

      {/* <div className="shadow-xl bg-white my-7 sm:p-6 p-3 rounded-xl border border-[#919EAB20]">
        <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
          Social
        </Header>

        <div className="pt-7">
          {social_link.map((item, index) => (
            <div key={index} className="flex items-center xl:gap-4 gap-2 py-2">
              <div className="w-[7%]">
                <img src={item.icon} alt="icon" className="" />
              </div>

              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {item.title}
              </P>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CirleLeft;
