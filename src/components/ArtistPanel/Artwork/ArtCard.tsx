import edit from "../assets/Container (1).png";
import deleteimg from "../assets/Container (2).png";
import { NavLink } from "react-router-dom";

const ArtCard = ({ record, data }: any) => {
  console.log("this is from searcched one", data);
  return (
    <>
      <div
        className={`bg-white rounded-lg pb-5 border-b-4 ${
          record?.status == "published"
            ? "border-[#00DE00]"
            : record?.status == "draft"
            ? "border-[#EE1D52]"
            : record.category == "In subscription"
            ? "border-[#FFA600]"
            : "border-[#D8F002]"
        }`}
      >
        <div className="flex justify-center relative overflow-hidden bg-cover bg-no-repeat">
          <img
            src={`${data.url}/uploads/users/${record.media?.mainImage}`}
            className="rounded-md w-[20vw] h-[40vh] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#D9D9D9] bg-fixed flex items-center justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-50 hover:cursor-pointer">
            <div className="flex gap-2 ">
              <NavLink to={`/artist-panel/artwork/add?id=${record._id}`}>
                <img src={edit} className="" alt="" />
              </NavLink>
              <img src={deleteimg} className="" alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center py-2">
          <div
            className={`w-[.8em] h-[.8em] rounded-lg ${
              record?.status == "published"
                ? "bg-[#00DE00]"
                : record.category == "Not Available"
                ? "bg-[#EE1D52]"
                : record.category == "In subscription"
                ? "bg-[#FFA600]"
                : "bg-[#D8F002]"
            }`}
          ></div>

          <p className="text-[12px]">{record.discipline?.artworkDiscipline}</p>
          <p className="text-black text-[16px] font-bold">
            {record.artworkName}
          </p>
          <p className="text-black text-[13px] font-meedium">
            {record.owner?.artistName}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArtCard;
