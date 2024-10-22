import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const SelectDateBtn = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <button className="py-1 px-2 h-auto rounded-md border-gray-100 bg-white flex gap-1 items-center w-fit outline-none">
      <MdOutlineDateRange />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </button>
  );
};

export default SelectDateBtn;
