import { RxCross2 } from "react-icons/rx";
const Cancelbtn = ({ text, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="border border-1 border-black rounded-md py-1 px-2 flex gap-2 items-center text-[18px] font-light"
    >
      <RxCross2 /> {text}
    </button>
  );
};

export default Cancelbtn;
