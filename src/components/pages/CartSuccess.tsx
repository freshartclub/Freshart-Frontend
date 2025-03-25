import Header from "../ui/Header";
import cart_image from "../../assets/illustration-order_complete.png";
import P from "../ui/P";
import Button from "../ui/Button";
import arrow from "../../assets/start icon.png";
import download from "../../assets/primary-shape.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const CartSuccess = () => {
  
  const navigate = useNavigate();


//   const { searchParams } = useSearchParams();
// const orderId = searchParams.get('orderId'); // Correct way to retrieve 'orderId' from the query string

  const continueToShpoing = () => {
    navigate("/home");
  };



  return (
    <div className="container mx-auto sm:px-6 px-3 lg:py-24 py-16">
      <div className="xl:w-[38%] lg:w-[47%] md:w-[74%] sm:w-[83%] w-full mx-auto flex flex-col ">
        <Header
          variant={{ size: "lg", weight: "bold" }}
          className="text-[#1C252E] mb-6 text-center"
        >
          Thank you for your purchase!
        </Header>
        <img
          src={cart_image}
          alt="cart image"
          className="w-[320px] h-[240px] mx-auto"
        />
        <div className="text-center mt-8">
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Thanks for placing order :
          </P>
          <P
            variant={{ size: "base", weight: "normal" }}
            className="text-[#00A76F]"
          >
            01dc1370-3df6-11eb-b378-0242ac130002
          </P>

          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="my-5"
          >
            We will send you a notification within 5 days when it ships. If you
            have any question or queries then fell to get in contact us.
          </P>

          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            All the best,
          </P>
        </div>

        <div className="flex sm:flex-row flex-col gap-5 mt-10 items-center">
          <Button
            onClick={continueToShpoing}
            className="flex gap-2 border items-center 2xl:text-base text-sm"
            variant={{
              fontWeight: "500",
              rounded: "lg",
              theme: "light",
              thickness: "moderate",
            }}
          >
            <img src={arrow} alt="arrow" />
            Continue shopping
          </Button>
          <Button
            className="flex gap-2 items-center 2xl:text-base text-sm border"
            variant={{
              fontWeight: "500",
              rounded: "lg",
              theme: "dark",
              thickness: "moderate",
            }}
          >
            <img src={download} alt="download" />
            Download as PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSuccess;
