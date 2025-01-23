import { Link } from "react-router-dom";
import arrow from "../../assets/arrow_3.png";
import successful from "../../assets/Successful.png";
import CommonPage from "./CommonPage";

const ThankYou = () => {
  return (
    <CommonPage
      image={successful}
      heading="THANK  YOU!"
      para="Form has been submitted and Fresh Art Club will check your request and contact within the next days. Thanks for your interest in being part of our community"
      btn1={
        <Link to="/" className="flex justify-center mx-auto items-center">
          Explore Now
          <img src={arrow} alt="" />
        </Link>
      }
    />
  );
};

export default ThankYou;
