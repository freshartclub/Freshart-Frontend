import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";

const ArtWork = ({ data, otherArt }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Header
          variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
          className="mb-4"
        >
          Artwork
        </Header>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="border border-[#E4E7E9] text-xs text-gray-700 uppercase bg-[#F2F4F5]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price{" "}
                  <span className="text-[10px] italic">
                    (at time of purchase)
                  </span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
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
                    src={`${lowImageUrl}/${data?.items?.artwork?.media}`}
                    alt="image"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex gap-2">
                      <span className="uppercase text-[#2DA5F3]">
                        {data?.items?.artwork?.artworkName}
                      </span>
                      {data?.items?.other?.isCancelled ? (
                        <span className="bg-[#FF536B] text-xs px-1 py-0.5 rounded-full text-[#F2F4F5]">
                          Cancelled By Artist
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/discover_more/${data?.items?.artwork?._id}`)
                      }
                      className="text-[#FF536B] hover:underline w-max text-xs"
                    >
                      View Artwork
                    </button>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    € {data?.items?.other?.subTotal}
                  </P>
                </td>

                <td className="px-6 py-4">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    €{" "}
                    {data?.items?.other?.subTotal -
                      data?.items?.other?.totalDiscount}{" "}
                    <span className="text-xs italic">
                      ({data?.items?.other?.discount}% off)
                    </span>
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
              <thead className="border border-[#E4E7E9] text-xs text-gray-700 uppercase bg-[#F2F4F5]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price{" "}
                    <span className="text-[10px] italic">
                      (at time of purchase)
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherArt?.map((item, index: number) => (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={`${lowImageUrl}/${item?.items?.artwork?.media}`}
                        alt="image"
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="flex gap-2">
                          <span className="uppercase text-[#2DA5F3]">
                            {item?.items?.artwork?.artworkName}
                          </span>
                          {item?.items?.other?.isCancelled ? (
                            <span className="bg-[#FF536B] text-xs px-1 py-0.5 rounded-full text-[#F2F4F5]">
                              Cancelled By Artist
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                        <button
                          onClick={() =>
                            navigate(
                              `/order_tracking?id=${item?._id}&art=${item?.items?.artwork?._id}`
                            )
                          }
                          className="text-[#FF536B] hover:underline w-max text-xs"
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
                        € {item?.items?.other?.subTotal}
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
                        €{" "}
                        {item?.items?.other?.subTotal -
                          item?.items?.other?.totalDiscount}{" "}
                        <span className="text-xs italic">
                          ({item?.items?.other?.discount}% off)
                        </span>
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
