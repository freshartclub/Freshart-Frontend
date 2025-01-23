import circle from "../../assets/CheckCircle.png";
import Header from "../ui/Header";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import stack from "../../assets/Stack.png";
import Button from "../ui/Button";

const CardSuccessPage = () => {
  return (
    <div className="container mx-auto sm:px-6 px-3 py-24">
      <div className="lg:w-[48%] md:w-[55%] mx-auto text-center">
        <div className="flex justify-center">
          <img src={circle} alt="check circle" />
        </div>
        <Header variant={{ size: "3xl", theme: "dark", weight: "bold" }}>
          Your order is successfully place
        </Header>
        <P
          variant={{ size: "md", theme: "secoundry", weight: "medium" }}
          className="my-5"
        >
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum
          risus. Donec volutpat mollis nulla non facilisis.
        </P>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 xl:w-[70%] lg:w-[70%] md:w-full sm:w-[90%] mx-auto">
          <Button
            variant={{ fontSize: "md", theme: "light", fontWeight: "600" }}
            className="flex justify-center border border-[#263238]"
          >
            <img src={stack} alt="" className="mr-2" />
            <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
              Go to Dashboard
            </P>
          </Button>

          <Button
            variant={{ fontSize: "md", theme: "dark", fontWeight: "600" }}
            className="flex justify-center"
          >
            <P variant={{ size: "small", theme: "light", weight: "medium" }}>
              View Order
            </P>
            <img src={arrow} alt="" className="mt-1 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardSuccessPage;
