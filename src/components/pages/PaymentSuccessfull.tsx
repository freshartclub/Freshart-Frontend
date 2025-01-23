import successful from "../../assets/Successful.png";
import CommonPage from "./CommonPage";

const PaymentSuccessfull = () => {
  return (
    <CommonPage
      image={successful}
      heading="Congrats, Your plan has been activated"
      para="Dear User, ID #45475fdgfbv your exclusive plan successfuuly activated, now you can explore frsh art club premium feature."
      btn1=" Explore Fresh Art Club"
      btn2="complete your profile"
    />
  );
};

export default PaymentSuccessfull;
