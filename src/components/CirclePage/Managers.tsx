import { FaLocationDot } from "react-icons/fa6";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

const Managers = ({ data }) => {
  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += " " + `"${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className="mx-auto px-3 sm:px-6 my-5">
      <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
        Managers
      </Header>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-10 md:gap-6 gap-5 mt-5 mb-10">
        {data?.data?.managers ? (
          data?.data?.managers?.map((item, index: number) => (
            <div
              key={index}
              className="flex flex-wrap justify-between border border-zinc-300 items-center shadow-md p-4 rounded-lg"
            >
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={`${imageUrl}/users/${item?.img}`}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  alt="profile image"
                />
                <div className="flex flex-col gap-1">
                  <P
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="xl:text-md text-base"
                  >
                    {name(item)}
                  </P>
                  <div className="flex items-center gap-2">
                    <FaLocationDot size={15} />
                    <P
                      variant={{ size: "small", weight: "normal" }}
                      className="text-[#919EAB]"
                    >
                      {item?.address?.country}
                    </P>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500  border border-zinc-300 rounded py-4">
            No Managers Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Managers;
