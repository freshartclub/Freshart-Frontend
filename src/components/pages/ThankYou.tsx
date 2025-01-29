import { Link } from "react-router-dom";
import arrow from "../../assets/arrow_3.png";
import successful from "../../assets/Successful.png";
import CommonPage from "./CommonPage";
import { useTranslation } from "react-i18next";

const ThankYou = () => {
  const { t } = useTranslation();
  return (
    <CommonPage
      image={successful}
      heading={t("THANK YOU!")}
      para={t(
        "Form has been submitted and Fresh Art Club will check your request and contact within the next days. Thanks for your interest in being part of our community"
      )}
      btn1={
        <Link to="/" className="flex justify-center w-full items-center">
          {t("Explore Now")}
          <img src={arrow} alt="" />
        </Link>
      }
    />
  );
};

export default ThankYou;
