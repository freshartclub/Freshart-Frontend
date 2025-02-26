import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import location from "./assets/location.png";

const Managers = ({ data }) => {
  return (
    <div className="container mx-auto sm:px-6 px-3 min-h-[50vh]">
      <div>
        {/* <div className="flex sm:justify-between w-full flex-wrap justify-center sm:gap-0 gap-8">
            <img src={profile_image} alt="" className="-mt-[50px]" />
            <div className="flex gap-10">
              {profile_data.map((item, index) => (
                <>
                  <Link
                    to={item.to}
                    key={index}
                    className="flex gap-1 items-center"
                  >
                    <img src={item.img} alt="profile image" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      {item.title}
                    </P>
                  </Link>
                </>
              ))}
            </div>
          </div> */}

        <div className="lg:mt-20 md:mt-10 mt-5">
          <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
            Managers
          </Header>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-10 md:gap-6 gap-5 my-10">
            {data?.data?.managers &&
              data?.data?.managers?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center shadow-xl border xl:p-8 lg:p-3 p-5 rounded-xl"
                >
                  <div
                    key={item.id}
                    className="flex xl:gap-4 gap-2 items-center "
                  >
                    <img
                      src={`${imageUrl}/users/${item?.img}`}
                      className="w-[5vw] h-[5vw] rounded-full object-cover"
                      alt="profile image"
                    />
                    <div>
                      <P
                        variant={{
                          size: "md",
                          theme: "dark",
                          weight: "semiBold",
                        }}
                        className="xl:text-md text-base"
                      >
                        {item?.artistName +
                          " " +
                          item?.artistSurname1 +
                          " " +
                          item?.artistSurname2}
                      </P>
                      <div className="flex items-center gap-2">
                        <img src={location} alt="location icon" />
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managers;
