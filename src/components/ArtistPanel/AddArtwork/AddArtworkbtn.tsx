import { GoPlus } from "react-icons/go";
const AddArtworkbtn = ({ text }: any) => {
  return (
    <button
      type="submit"
      className="py-1 px-2 rounded-md border-gray-100 bg-[#102030] text-white flex gap-1 items-center"
    >
      <GoPlus /> {text}
    </button>
  );
};

export default AddArtworkbtn;
