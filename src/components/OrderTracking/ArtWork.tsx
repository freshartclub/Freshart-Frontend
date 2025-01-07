import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import P from "../ui/P";

const ArtWork = ({ data, url, otherArt }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Header
          variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
          className="mb-4"
        >
          Artwork (#{data?.items?.artWork.artworkId})
        </Header>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="border border-[#E4E7E9] text-xs text-gray-700 uppercase bg-[#F2F4F5] ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Sub-Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    src={`${url}/users/${data?.items?.artWork?.media}`}
                    alt="image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <Header
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "normal",
                      }}
                      className="uppercase text-[#2DA5F3]"
                    >
                      {data?.items?.artWork?.artworkName}
                    </Header>
                    <button
                      onClick={() =>
                        navigate(
                          `/discover_more?id=${data?.items?.artWork?._id}`
                        )
                      }
                      className="text-[#FF536B] text-sm border border-[#FF536B] py-1 px-2 rounded-md"
                    >
                      View Artwork
                    </button>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    €{data?.items?.artWork?.pricing?.basePrice}
                  </P>
                </td>
                <td className="px-6 py-4">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    x{data?.items?.quantity}
                  </P>
                </td>
                <td className="px-6 py-4">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    €{data?.items?.artWork?.pricing?.basePrice}
                  </P>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {otherArt?.length > 0 && (
        <div className="mt-4">
          <Header
            variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
            className="mb-4"
          >
            Other Artwork Included in this Order:
          </Header>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="border border-[#E4E7E9] text-xs text-gray-700 uppercase bg-[#F2F4F5] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub-Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherArt?.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={`${url}/users/${item?.items?.artWork?.media}`}
                        alt="image"
                        className="w-[5rem] h-[5rem] object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <Header
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "normal",
                          }}
                          className="uppercase text-[#2DA5F3]"
                        >
                          {item?.items?.artWork?.artworkName}
                        </Header>
                        <button
                          onClick={() =>
                            navigate(
                              `/order_tracking?id=${item?._id}&orderType=${item?.orderType}&art=${item?.items?.artWork?._id}`
                            )
                          }
                          className="text-[#FF536B] text-sm border border-[#FF536B] py-1 px-2 rounded-md"
                        >
                          View Order
                        </button>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        €{item?.items?.artWork?.pricing?.basePrice}
                      </P>
                    </td>
                    <td className="px-6 py-4">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        x{item?.items?.quantity}
                      </P>
                    </td>
                    <td className="px-6 py-4">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        €{item?.items?.artWork?.pricing?.basePrice}
                      </P>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtWork;
