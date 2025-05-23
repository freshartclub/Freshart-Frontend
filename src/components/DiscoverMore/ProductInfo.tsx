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
import { FaUserCircle } from "react-icons/fa";

const ProductInfo = ({ data }: any) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [tabIndex, setTabIndex] = useState(0);
  const [ticData, setTicData] = useState({
    message: "",
  });

  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const name = (val: { artistName: string; artistSurname1: string; artistSurname2: string }) => {
    let fullName = val?.artistName || "";
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  const overview_data = [
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
      name: data?.data?.owner?.address?.city + ", " + data?.data?.owner?.address?.country || "N/A",
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
    if (ticData.message.split(" ").length < 5) {
      return toast.error("Message must be at least 5 words!");
    }

    formData.append("message", ticData?.message);
    formData.append("subject", `Additional Information about ${data?.data?.artworkId}`);
    formData.append("ticketType", "Artwork Additional Information");
    formData.append("isArtDetail", "true");

    mutate(formData);
  };

  return (
    <div className={`mt-10 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      <Tabs onSelect={(index: number) => setTabIndex(index)}>
        <TabList className={`flex gap-5 p-2 rounded-lg overflow-x-auto scrollbar1 whitespace-nowrap ${dark ? "bg-gray-800" : "bg-gray-200"}`}>
          {["About the artwork", "Artwork Details", "Shipping Information", "Need Additional Detail?", "Artist information"].map((label, index) => (
            <Tab
              key={index}
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors shrink-0 ${
                tabIndex === index ? (dark ? "text-[#EE1D52] font-semibold" : "text-[#EE1D52] bg-transparent font-semibold") : ""
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <P
            variant={{ size: "small", theme: dark ? "light" : "dark", weight: "normal" }}
            className={`${dark ? "text-gray-300" : "text-[#999999]"} my-5 italic`}
          >
            {data?.data?.productDescription}
          </P>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col md:flex-row gap-10 w-full my-5">
            <div className="w-full md:w-[50%]">
              {overview_data?.map((item, index) => (
                <div key={index} className="flex">
                  <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
                    {item?.head}
                  </P>
                  <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                    {item?.name}
                  </P>
                </div>
              ))}
            </div>

            <div className="w-full md:w-[50%]">
              <div className="flex items-center gap-5">
                <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
                  Framed :
                </P>
                <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                  {data?.data?.additionalInfo?.framed}
                </P>
              </div>
              {data?.data?.additionalInfo?.framed == "Yes" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <P
                      variant={{
                        size: "small",
                        theme: dark ? "light" : "dark",
                        weight: "medium",
                      }}
                    >
                      Framed Description :
                    </P>
                    <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                      {data?.data?.additionalInfo?.framedDescription || "N/A"}
                    </P>
                  </div>
                  <div className="flex items-center gap-5 mt-2">
                    <P
                      variant={{
                        size: "small",
                        theme: dark ? "light" : "dark",
                        weight: "medium",
                      }}
                      className="w-48 my-1"
                    >
                      Framed Dimensions :
                    </P>
                    <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                      {data?.data?.additionalInfo?.frameHeight || "N/A"} x {data?.data?.additionalInfo?.frameWidth || "N/A"} x{" "}
                      {data?.data?.additionalInfo?.frameLength || "N/A"} cm
                    </P>
                  </div>
                </>
              ) : null}
              <div className="flex items-center gap-5">
                <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
                  Hanging :
                </P>
                <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                  {data?.data?.additionalInfo?.hangingAvailable}
                </P>
              </div>
              {data?.data?.additionalInfo?.hangingAvailable == "Yes" ? (
                <div className="flex flex-col gap-2">
                  <P
                    variant={{
                      size: "small",
                      theme: dark ? "light" : "dark",
                      weight: "medium",
                    }}
                  >
                    Hanging Description :
                  </P>
                  <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                    {data?.data?.additionalInfo?.hangingDescription || "N/A"}
                  </P>
                </div>
              ) : null}
              <div className="flex items-center gap-5">
                <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
                  External Tags :
                </P>
                <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                  {data?.data?.tags?.extTags?.length ? data?.data?.tags?.extTags?.map((tag: string) => `#${tag}`).join(", ") : "N/A"}
                </P>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="w-full my-5">
            {shipping_data.map((item, index) => (
              <div key={index} className="flex items-center">
                <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="w-48 my-1">
                  {item?.head}
                </P>
                <P variant={{ size: "small", weight: "medium" }} className={`${dark ? "text-gray-300" : "text-[#999999]"}`}>
                  {item?.name}
                </P>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          {isAuthorized ? (
            <div className="w-full my-5">
              <form className="flex md:w-[50%] flex-col gap-4">
                <textarea
                  value={ticData?.message}
                  required
                  onChange={(e) =>
                    setTicData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className={`p-2 border ${
                    dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
                  } outline-none rounded`}
                  placeholder="Type here request..."
                  rows={4}
                />

                <span onClick={handleSubmit} className={`p-2 cursor-pointer bg-[#EE1D52] hover:bg-[#FF3B6C] text-white text-center rounded`}>
                  {isPending ? "Loading..." : "Submit"}
                </span>
              </form>
            </div>
          ) : (
            <div>
              <Header variant={{ size: "md", theme: dark ? "light" : "dark", weight: "semiBold" }} className="my-4">
                Login to create a support ticket
              </Header>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col gap-5 md:flex-row my-5">
            <div className={`${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} w-full md:w-[27%] border sm:w-[90%] p-5`}>
              <div className="flex items-center flex-col">
                {data?.data?.owner?.profile ? (
                  <img
                    src={`${imageUrl}/users/${data?.data?.owner?.profile}`}
                    alt="Profile"
                    className="object-cover rounded-full w-[8rem] h-[8rem]"
                  />
                ) : (
                  <FaUserCircle className={`rounded-full w-[8rem] h-[8rem] ${dark ? "text-gray-400" : "text-gray-600"}`} />
                )}

                <Header className="mt-2" variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "bold" }}>
                  {name(data?.data?.owner)}
                </Header>
              </div>

              <div
                className={`flex border-t ${
                  dark ? "border-gray-700" : "border-zinc-300"
                } pt-4 items-center gap-4 mt-2 max-w-full w-full overflow-x-auto`}
              >
                {data?.data?.owner?.insignia &&
                  data?.data?.owner?.insignia.map((item, index: number) => (
                    <div className="flex flex-shrink-0 items-center gap-1 flex-col" key={index}>
                      <img className="w-14 h-14 object-cover rounded-full" src={`${imageUrl}/users/${item?.insigniaImage}`} alt="insignia" />
                      <span className={`text-sm ${dark ? "text-gray-300" : "text-[#999999]"} font-semibold`}>{item?.credentialName}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className={`${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} w-full md:w-[73%] border p-4`}>
              <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="mb-3 uppercase">
                About
              </Header>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.data?.owner?.aboutArtist?.about),
                }}
                className={`${dark ? "text-gray-300" : "text-gray-600"}`}
              />

              <div onClick={() => handleShowmore(data?.data?.owner?._id)} className="cursor-pointer flex w-max float-right mt-2 gap-2 items-center">
                <P
                  className="text-[#EE1D52]"
                  variant={{
                    size: "base",
                    theme: dark ? "light" : "dark",
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
    </div>
  );
};

export default ProductInfo;
