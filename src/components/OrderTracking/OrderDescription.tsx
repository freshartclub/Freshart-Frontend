import Header from "../ui/Header";
import P from "../ui/P";
import ArtWork from "./ArtWork";
import plus from "./assets/Plus.png";
import BillingSection from "./BillingSection";
import OrderHistory from "./OrderHistory";
import Progressbar from "./Progressbar";

const OrderDescription = () => {
  return (
    <div className="bg-white border border-[#E4E7E9]">
      <div className="flex justify-between p-4 border-b">
        <P
          variant={{ size: "small", theme: "dark", weight: "medium" }}
          className="uppercase"
        >
          Order Detail
        </P>
        <div className="flex gap-2 items-center">
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="text-[#FF536B]"
          >
            Leave a Rating
          </P>
          <img src={plus} alt="plus sign" />
        </div>
      </div>
      {/* ----------------- */}
      <div className="md:p-5 p-2">
        <div className=" flex justify-between">
          <div className="bg-[#FFD9DE54] border border-[#FFD9DE] sm:p-5 p-2 flex sm:flex-row flex-col justify-between sm:items-center w-full">
            <div>
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              >
                #96459761
              </Header>
              <div className="flex sm:flex-row flex-col md:gap-4 gap-2 mt-2">
                <P
                  variant={{ size: "base", weight: "medium" }}
                  className="text-[#475156]"
                >
                  4 Products
                </P>
                <P
                  variant={{ size: "base", weight: "normal" }}
                  className="text-[#475156]"
                >
                  Order Placed in 17 Jan, 2021 at 7:32 PM
                </P>
              </div>
            </div>
            <div>
              <Header
                variant={{ size: "xl", weight: "bold" }}
                className="text-[#FF536B]"
              >
                $1199.00
              </Header>
            </div>
          </div>
        </div>
        {/* --------------- */}

        <div className="mt-4">
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Order expected arrival
            <span className="font-semibold">23 Jan,2021</span>
          </P>
        </div>

        <Progressbar />
        <OrderHistory/>
        
        <ArtWork />
        <BillingSection />
      </div>
    </div>
  );
};

export default OrderDescription;
