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
  const [showSupportForm, setShowSupportForm] = useState(false)
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const name = (val: { artistName: string; artistSurname1: string; artistSurname2: string }) => {
    let fullName = val?.artistName || "";
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

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

  const [formData, setFormData] = useState({
    subject: `Additional information about ${data?.data?.artworkId}`,
    requestDetails: "",
    ticketType: "Artwork additional information"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const textColor = dark ? "text-gray-100" : "text-gray-800";
  const inputBg = dark ? "bg-gray-700" : "bg-white";
  const borderColor = dark ? "border-gray-600" : "border-gray-300";


  return (
    <div className={`mt-5 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      <Tabs onSelect={(index: number) => setTabIndex(index)}>
        <TabList className={`flex gap-5 p-2 rounded-lg overflow-x-auto scrollbar1 whitespace-nowrap ${dark ? "bg-gray-800" : "bg-gray-200"}`}>
          {["About the artwork", "Artwork Details", "Shipping Information", "Need Additional Detail?", "Artist information"].map((label, index) => (
            <Tab
              key={index}
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors shrink-0 ${tabIndex === index ? (dark ? "text-[#EE1D52] font-semibold" : "text-[#EE1D52] bg-transparent font-semibold") : ""
                }`}
            >
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanel className="p-4 md:p-6">
          <div className="">
            <div>
              <h3 className="text-lg font-medium mb-4">Artwork Description</h3>
              <p className="w-full max-w-full text-gray-600 dark:text-gray-300 italic mb-6 min-h-[15rem] break-words">
                {data?.data?.productDescription || "No description available"}
              </p>
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">External tags</h4>
                <div className="flex flex-wrap gap-2">
                  {data?.data?.tags?.extTags?.length ? (
                    data?.data?.tags?.extTags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${dark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                          }`}
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No external tags available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <h3 className="text-lg font-medium mb-4">Artwork Details</h3>
          <div className="flex flex-col md:flex-row gap-10 w-full ">
            <div className="w-full md:w-[50%]">
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> {data?.data?.artworkSeries && `${data.data.artworkSeries} - `}{data?.data?.artworkName}, {data?.data?.artworkCreationYear}</p>
                <p><span className="font-medium">Artist:</span> {data?.data?.owner?.artistName} {data?.data?.owner?.artistSurname1}</p>
                {data?.data?.isArtProvider === "Yes" ? <p><span className="font-medium">Supplied By:</span> {data?.data?.provideArtistName} </p> : null}
                <p><span className="font-medium">Discipline & Technique:</span> {data?.data?.discipline}, {data?.data?.additionalInfo?.artworkTechnic}</p>
                <p><span className="font-medium">Theme:</span> {data?.data?.additionalInfo?.artworkTheme || "N/A"}</p>
                <p><span className="font-medium">Dimensions (H/W/D in cm):</span> {data?.data?.additionalInfo?.height} x {data?.data?.additionalInfo?.width} x {data?.data?.additionalInfo?.depth} (Weight: {data?.data?.additionalInfo?.weight} Kg)</p>
              </div>
            </div>
            <div className="w-full md:w-[50%] space-y-2 text-sm ">
              <p>
                <span className="font-medium">Style:</span>{" "}
                {data?.data?.additionalInfo?.artworkStyle?.length
                  ? data.data.additionalInfo.artworkStyle.join(", ")
                  : "N/A"}
              </p>

              <p><span className="font-medium">Color:</span> {data?.data?.additionalInfo?.colors?.map((color: string) => `${color}`).join(", ") || "N/A"}</p>
              <p><span className="font-medium">Emotion:</span> {data?.data?.additionalInfo?.emotions?.map((emotion: string) => `${emotion}`).join(", ")}</p>
              <p>
                <span className="font-medium">Framed:</span>{" "}
                {data?.data?.additionalInfo?.framed === "Yes"
                  ? `Yes — ${data.data.additionalInfo?.framedDescription} (${data.data.additionalInfo?.frameHeight} x ${data.data.additionalInfo?.frameWidth})`
                  : data?.data?.additionalInfo?.framed || "N/A"}
              </p>



              <p><span className="font-medium">Hanging:</span> {data?.data?.additionalInfo?.hangingAvailable}
                {data?.data?.additionalInfo?.hangingAvailable === "Yes" && `, ${data?.data?.additionalInfo?.hangingDescription}`}
              </p>
              <div className="flex items-center ">
                <P variant={{ size: "small", theme: dark ? "light" : "dark", weight: "medium" }} className="mr-2 my-1">
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
          <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
          <div className="w-full ">


            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Package Material:</span> {data?.data?.inventoryShipping?.packageMaterial}</p>
              <p><span className="font-medium">Package Dimensions (H/W/D in cm):</span> {data?.data?.inventoryShipping?.packageHeight} x {data?.data?.inventoryShipping?.packageWidth} x {data?.data?.inventoryShipping?.packageDepth}</p>
              <p><span className="font-medium">Package Weight (Kg):</span> {data?.data?.inventoryShipping?.packageWeight}</p>
              <p><span className="font-medium">Ships from:</span> {data?.data?.owner?.address?.city}, {data?.data?.owner?.address?.country}</p>
              <p><span className="font-medium">Delivery time:</span> Typically 5-7 days</p>
              <p><span className="font-medium">Delivery Cost:</span> *** To be discussed ***</p>
            </div>
            <p className="text-xs mt-2 text-gray-500">Standard Shipping conditions</p>
          </div>

        </TabPanel>

        <TabPanel>
          {isAuthorized ? (
            <div className="w-full ">
              <form className="flex md:w-[50%] flex-col gap-4">

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${textColor}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    readOnly
                    className={`w-full px-3 py-2 rounded border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label htmlFor="ticketType" className={`block text-sm font-medium mb-1 ${textColor}`}>
                    Ticket Type
                  </label>
                  <select
                    id="ticketType"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 rounded border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="Artwork additional information">Artwork additional information</option>
                    <option value="Shipping inquiry">Shipping inquiry</option>
                    <option value="Payment question">Payment question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>


                <textarea
                  value={ticData?.message}
                  required
                  onChange={(e) =>
                    setTicData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className={`p-2 border ${dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
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
          <div className="flex flex-col gap-5 md:flex-row ">
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
                className={`flex border-t ${dark ? "border-gray-700" : "border-zinc-300"
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
