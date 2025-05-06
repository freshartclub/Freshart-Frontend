import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import CustomOrderForm from "./CustomOrderForm";
import useArtistFollowMutation from "./http/useArtistFollowMutation";
import useArtistUnFollowMutation from "./http/useArtistUnFollowMutation";
import { useAppSelector } from "../../store/typedReduxHooks";

const ArtistDescription = ({ data, dark }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const userId = useAppSelector((state)=> state.user.user?._id)

  const redirectToCircle = () => navigate("/circleblog");
  const {mutate  } = useArtistFollowMutation()

  const {mutateAsync} = useArtistUnFollowMutation()

  useEffect(()=>{
   if(data?.is_followed){
    setIsLiked(data?.is_followed)

   }
  },[data])

  console.log(userId)
  console.log(data?._id )

  const handleFollow = ()=>{
    mutate(id)
  }

  const handleUnFollow = ()=>{
    mutateAsync(id)
  }

  return (
    <div className={`rounded-xl border ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} shadow-md p-3`}>
      <div className="flex justify-end items-center gap-4 mb-2">
        {userId !== data?._id ?  <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
          {isLiked ? <FaHeart onClick={handleUnFollow} className="text-red-500 text-xl" /> : <FaRegHeart  onClick={handleFollow} className={`text-xl ${dark ? "text-gray-300" : "text-gray-600"}`} />}
        </button>  : null}
       
        <button className={`p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
          <FaShareAlt className={`text-xl ${dark ? "text-gray-300" : "text-gray-600"}`} />
        </button>
        <button
          onClick={redirectToCircle}
          className={`p-2 bg-[#EE1D52] w-[90px] rounded-full text-white text-sm font-semibold ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
        >
          Circle
        </button>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {["about", "highlight", "curriculum", "Customorder"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-[#EE1D52] text-[#EE1D52]"
                  : dark
                  ? "text-white border-transparent"
                  : "border-transparent text-gray-700 hover:text-[#EE1D52]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </nav>
      </div>

      <div className="h-[350px] overflow-y-auto">
        {activeTab === "highlight" && (
          <div className={`p-3 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-zinc-300"}`}>
            <Header variant={{ size: "xl", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-4">
              Highlight
            </Header>
            <HighlightText text={data?.artist?.highlights?.addHighlights} dark={dark} />
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <div className={`p-3 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-zinc-300"}`}>
              <Header variant={{ size: "xl", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-4">
                About
              </Header>
              <HighlightText text={data?.artist?.aboutArtist?.about} dark={dark} />
            </div>

            <div className={`p-3 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-zinc-300"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <P variant={{ size: "base", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-2">
                    Date of birth:
                  </P>
                  <P variant={{ size: "base", theme: `${dark ? "light" : "dark"}`, weight: "normal" }}>{data?.artist?.aboutArtist?.dob || "N/A"}</P>
                </div>
                <div>
                  <P variant={{ size: "base", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-2">
                    Disciplines
                  </P>
                  <div className="flex flex-wrap gap-2">
                    {data?.artist?.aboutArtist?.discipline?.map((disc, index) => (
                      <span key={index} className="bg-[#ffe1e8] text-[#EE1D52]  py-1 px-3 rounded-full text-xs font-medium">
                        {disc?.discipline || "N/A"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {data?.artist?.insignia?.length > 0 && (
              <div className={`p-3 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-zinc-300"}`}>
                <Header variant={{ size: "lg", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-4">
                  Credentials
                </Header>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {data?.artist?.insignia?.map((item, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <img src={`${imageUrl}/users/${item.insigniaImage}`} alt="" className="w-16 h-16 rounded-full object-cover mb-2" />
                      <P variant={{ theme: `${dark ? "light" : "dark"}`, weight: "normal" }} className="text-center">
                        {item.credentialName}
                      </P>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className={`p-3 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-zinc-300"}`}>
            <Header variant={{ size: "xl", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-6">
              Curriculum Vitae
            </Header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.artist?.highlights?.cv?.map((item, index: number) => (
                <div key={index} className={`p-3 border rounded-lg ${dark ? "bg-gray-800 border-gray-500" : "bg-gray-100 border-zinc-200"}`}>
                  <P variant={{ size: "base", theme: `${dark ? "light" : "dark"}`, weight: "semiBold" }} className="mb-2">
                    {item.Description}
                  </P>
                  <div className={`${dark ? "text-gray-300" : "text-gray-600"} text-sm space-y-1`}>
                    <p>
                      <span className="font-medium">Year:</span> {item.year}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {item.Location}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {item.Type}
                    </p>
                    <p>
                      <span className="font-medium">Scope:</span> {item.Scope}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Customorder" && <CustomOrderForm id={data?.artist?._id} dark={dark} />}
      </div>
    </div>
  );
};

const HighlightText = ({ text, dark }: { text: string; dark: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  const sanitizedText = DOMPurify.sanitize(text || "");
  const words = sanitizedText.split(/\s+/);
  const limitedText = words.slice(0, 30).join(" ");
  const isLongText = words.length > 30;

  return (
    <div className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
      <div
        dangerouslySetInnerHTML={{
          __html: expanded ? sanitizedText : `${limitedText}...`,
        }}
      />
      {isLongText && (
        <button onClick={() => setExpanded(!expanded)} className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2">
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ArtistDescription;
