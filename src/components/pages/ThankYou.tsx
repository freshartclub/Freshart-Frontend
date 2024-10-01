import arrow from "../../assets/arrow_3.png";
import successful from "../../assets/Successful.png";
import CommonPage from "./CommonPage";

const ThankYou = () => {
  return (
    <>
      <CommonPage
        image={successful}
        heading="THANK  YOU!"
        para="Your form has been submit successfully. our admin department will get in touch shortly. if you want to discuss something. you can contact to our customer care number or helpline."
        btn1={
          <span className="flex justify-center mx-auto items-center">
            Explore Now
            <img src={arrow} alt="" />
          </span>
        }
      />
    </>
  );
};

export default ThankYou;
