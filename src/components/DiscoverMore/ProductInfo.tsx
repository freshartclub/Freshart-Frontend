import DOMPurify from "dompurify";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAppSelector } from "../../store/typedReduxHooks";
import useGetPostArtistTicketMutation from "../NewTicket/ticket history/http/usePostTicket";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import product from "./assets/single-product.jpg.png";

const ProductInfo = ({ data }: any) => {
  const [ticData, setTicData] = useState({
    message: "",
    ticketType: "",
    subject: "",
  });

  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const name = (val: {
    artistName: string;
    artistSurname1: string;
    artistSurname2: string;
  }) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const overview_date = [
    {
      head: "Title :",
      name: data?.data?.artworkName,
    },
    {
      head: "Creation Year :",
      name: data?.data?.artworkCreationYear,
    },
    {
      head: "Series :",
      name: data?.data?.artworkSeries,
    },
    {
      head: "Discipline :",
      name: data?.data?.discipline,
    },
    {
      head: "Technic :",
      name: data?.data?.additionalInfo?.artworkTechnic,
    },
    {
      head: "Dimensions: ",
      name:
        (data?.data?.additionalInfo?.height || "N/A") +
        " x " +
        (data?.data?.additionalInfo?.width || "N/A") +
        " x " +
        (data?.data?.additionalInfo?.length || "N/A") +
        " cm",
    },
    {
      head: "Weight :",
      name: data?.data?.additionalInfo?.weight + " kg" || "N/A",
    },
  ];

  const shipping_data = [
    {
      head: "Package Material :",
      name: data?.data?.inventoryShipping?.packageMaterial || "N/A",
    },
    {
      head: "Package Dimensions :",
      name:
        (data?.data?.inventoryShipping?.packageHeight || "N/A") +
        " x " +
        (data?.data?.inventoryShipping?.packageWidth || "N/A") +
        " x " +
        (data?.data?.inventoryShipping?.packageLength || "N/A") +
        " cm",
    },
    {
      head: "Package Weight :",
      name: data?.data?.inventoryShipping?.packageWeight + " kg" || "N/A",
    },
    {
      head: "Ship from :",
      name:
        data?.data?.owner?.address.city +
          ", " +
          data?.data?.owner?.address.country || "N/A",
    },
    {
      head: "Delivery Time :",
      name: "Typically 5-7 Days",
    },
    {
      head: "Delivery Cost :",
      name: "** To be Discussed **",
    },
  ];

  const { mutate, isPending } = useGetPostArtistTicketMutation();
  const navigate = useNavigate();

  const handleShowmore = (id: string) => {
    navigate(`/artist_detail/${id}`);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (!ticData.message) return toast.error("Message is required!");
    if (ticData.message.split(" ").length < 10) {
      return toast.error("Message must be at least 10 words!");
    }
    formData.append("message", ticData.message);
    formData.append("subject", ticData.subject);
    formData.append("ticketType", ticData.ticketType);

    mutate(formData);
  };

  return (
    <div className="mt-10">
      <Tabs>
        <TabList>
          <Tab>About the artwork</Tab>
          <Tab>Artwork Details</Tab>
          <Tab>Shipping Information</Tab>
          <Tab>Need Additional Detail?</Tab>
          <Tab>Artist information</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col justify-between my-5">
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-4"
            >
              Artwork Description
            </Header>
            <P
              variant={{ size: "small", theme: "dark", weight: "normal" }}
              className="text-[#999999]"
            >
              {data?.data?.productDescription}
            </P>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col md:flex-row gap-10 w-full my-5">
            <div className="w-full md:w-[50%]">
              {overview_date.map((item, index) => (
                <div key={index} className="flex">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="w-48 my-1"
                  >
                    {item.head}
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999] "
                  >
                    {item.name}
                  </P>
                </div>
              ))}
            </div>

            {/* Artwork Details Section */}
            <div className="w-full md:w-[50%]">
              <div className="flex items-center gap-5">
                <P
                  variant={{ size: "small", theme: "dark", weight: "medium" }}
                  className="w-48 my-1"
                >
                  Framed :
                </P>
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className="text-[#999999] "
                >
                  {data?.data?.additionalInfo?.framed}
                </P>
              </div>
              {data?.data?.additionalInfo?.framed == "Yes" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                    >
                      Framed Description :
                    </P>
                    <P
                      variant={{ size: "small", weight: "medium" }}
                      className="text-[#999999] "
                    >
                      {data?.data?.additionalInfo?.framedDescription || "N/A"}
                    </P>
                  </div>
                  <div className="flex items-center gap-5 mt-2">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="w-48 my-1"
                    >
                      Framed Dimensions :
                    </P>
                    <P
                      variant={{ size: "small", weight: "medium" }}
                      className="text-[#999999] "
                    >
                      {data?.data?.additionalInfo?.frameHeight || "N/A"} x{" "}
                      {data?.data?.additionalInfo?.frameWidth || "N/A"} x{" "}
                      {data?.data?.additionalInfo?.frameLength || "N/A"} cm
                    </P>
                  </div>
                </>
              ) : null}
              <div className="flex items-center gap-5">
                <P
                  variant={{ size: "small", theme: "dark", weight: "medium" }}
                  className="w-48 my-1"
                >
                  Hanging :
                </P>
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className="text-[#999999] "
                >
                  {data?.data?.additionalInfo?.hangingAvailable}
                </P>
              </div>
              {data?.data?.additionalInfo?.hangingAvailable == "Yes" ? (
                <div className="flex flex-col gap-2">
                  <P
                    variant={{
                      size: "small",
                      theme: "dark",
                      weight: "medium",
                    }}
                  >
                    Hanging Description :
                  </P>
                  <P
                    variant={{ size: "small", weight: "medium" }}
                    className="text-[#999999] "
                  >
                    {data?.data?.additionalInfo?.hangingDescription || "N/A"}
                  </P>
                </div>
              ) : null}
              <div className="flex items-center gap-5">
                <P
                  variant={{ size: "small", theme: "dark", weight: "medium" }}
                  className="w-48 my-1"
                >
                  External Tags :
                </P>
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className="text-[#999999]"
                >
                  {data?.data?.tags?.extTags?.length
                    ? data.data.tags.extTags.map((tag) => `#${tag}`).join(", ")
                    : "N/A"}
                </P>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="w-full my-5">
            <Header
              variant={{ size: "md", theme: "dark", weight: "semiBold" }}
              className="mb-4"
            >
              Shipping Infromation
            </Header>
            {shipping_data.map((item, index) => (
              <div key={index} className="flex items-center">
                <P
                  variant={{ size: "small", theme: "dark", weight: "medium" }}
                  className="w-48 my-1"
                >
                  {item.head}
                </P>
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className="text-[#999999] "
                >
                  {item.name}
                </P>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          {isAuthorized ? (
            <div className="w-full my-5">
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                className="mb-4"
              >
                Create a ticket to know additional details
              </Header>
              {isAuthorized ? (
                <form className="flex md:w-[50%] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#999999]">
                      Ticket Type
                    </span>
                    <input
                      className="p-2 border opacity-60 outline-none rounded"
                      type="text"
                      readOnly
                      placeholder="Ticket Type"
                      value="Artwork Additional Information"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#999999]">Subject</span>
                    <input
                      className="p-2 opacity-60 border outline-none rounded"
                      type="text"
                      readOnly
                      placeholder="Ticket Type"
                      value={`Additional Information about ${data?.data?.artworkId}`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#999999]">
                      Request Details
                    </span>
                    <textarea
                      value={ticData.message}
                      onChange={(e) =>
                        setTicData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="p-2 border outline-none rounded"
                      placeholder="Request Details"
                      rows={4}
                    />
                  </div>

                  <span
                    onClick={handleSubmit}
                    className="p-2 cursor-pointer bg-black text-white text-center hover:bg-[#313131] rounded"
                  >
                    {isPending ? "Loading..." : "Submit"}
                  </span>
                </form>
              ) : (
                <div className="flex flex-col gap-1">
                  You need to be login to create a ticket
                </div>
              )}
            </div>
          ) : (
            <div>
              <Header
                variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                className="mb-4"
              >
                Login to create a support ticket
              </Header>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col gap-5 md:flex-row my-5">
            <div className="bg-white w-full md:w-[27%] border sm:w-[90%] p-5">
              <div className="flex items-center flex-col">
                <img
                  src={`${imageUrl}/users/${data?.data?.owner?.profile}`}
                  alt="Profile"
                  className="object-cover rounded-full w-[8rem] h-[8rem]"
                />

                <Header
                  className="mt-2"
                  variant={{ size: "lg", theme: "dark", weight: "bold" }}
                >
                  {name(data?.data?.owner)}
                </Header>
              </div>

              <div className="flex border-t border-zinc-300 pt-4 items-center gap-4 mt-2 max-w-full w-full overflow-x-auto">
                {data?.data?.owner?.insignia &&
                  data?.data?.owner?.insignia.map((item, index) => (
                    <div
                      className="flex flex-shrink-0 items-center gap-1 flex-col"
                      key={index}
                    >
                      <img
                        className="w-14 h-14 object-cover rounded-full"
                        src={`${imageUrl}/users/${item?.insigniaImage}`}
                        alt="insignia"
                      />
                      <span className="text-sm text-[#999999] font-semibold">
                        {item?.credentialName}
                      </span>
                    </div>
                  ))}
              </div>

              {/* <div className="flex justify-between items-center mt-2">
                  <div className="flex">
                    <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden">
                      <img
                        src={circle1}
                        alt="Follower 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative w-12 h-12 border-4 border-white rounded-full overflow-hidden -ml-5">
                      <img
                        src={circle2}
                        alt="Follower 2"
                        className="w-full h-full object-cover"
                      />
                    </div>

                  
                    <div className="relative w-12 h-12 border-4 border-white rounded-full bg-gray-100 flex items-center justify-center -ml-5">
                      <span className="font-bold text-black">+256</span>
                    </div>
                  </div>

                  <div className="flex justify-between gap-3">
                    <img
                      src={account_plus}
                      alt="icons"
                      className="w-[20px] h-[20px]"
                    />
                    <img src={chat} alt="icons" className="w-[20px] h-[20px]" />
                    <img src={dots} alt="icons" className="w-[20px] h-[20px]" />
                  </div>
                </div> */}
            </div>

            <div className="w-full md:w-[73%] border p-4">
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                className="mb-3 uppercase"
              >
                About
              </Header>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    data?.data?.owner?.aboutArtist?.about
                  ),
                }}
              />

              <div
                onClick={() => handleShowmore(data?.data?.owner?._id)}
                className="cursor-pointer flex w-max float-right mt-2 gap-2 items-center"
              >
                <P
                  className="text-[#EE1D52]"
                  variant={{
                    size: "base",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                >
                  Show More
                </P>
                <FaArrowRightLong color="#EE1D52" />
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {/* <div>
        <img src={product} alt="only image" className="w-full" />
      </div> */}
    </div>
  );
};

export default ProductInfo;
