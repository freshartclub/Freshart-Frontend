import order from "./assets/Notebook.png";
import truck from "./assets/Truck.png";
import delivered from "./assets/Handshake.png";
import pack from "./assets/Package.png";
import check from "./assets/Check.png";
import Header from "../ui/Header";

const Progressbar = () => {
  return (
    <div>
      <ol className="flex items-center lg:w-[60%] w-full my-10 mx-auto">
        <div className=" w-full ">
          <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full  after:border-b after:border-[#FF536B] after:border-4 after:inline-block dark:after:border-blue-800">
            <span className="flex items-center justify-center md:p-2 p-1 bg-[#FF536B] rounded-full shrink-0">
              <img src={check} alt="check" />
            </span>
          </li>
          <div className="mt-4">
            <img
              src={order}
              alt="image"
              className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]"
            />
            <Header
              variant={{ theme: "dark", weight: "medium" }}
              className="md:text-base text-sm hidden"
            >
              Order Placed
            </Header>
          </div>
        </div>
        <div className=" w-full ">
          <li className="flex w-full items-center after:content-[''] after:w-full  after:border-b after:border-[#FFE7D6] after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="flex items-center justify-center md:p-3 p-1 bg-[#FF536B] rounded-full shrink-0"></span>
          </li>
          <div className="mt-4">
            <img
              src={truck}
              alt="image"
              className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]"
            />
            <Header
              variant={{ theme: "dark", weight: "medium" }}
              className="md:text-base text-sm hidden"
            >
              Packaging
            </Header>
          </div>
        </div>
        <div className=" w-full ">
          <li className="flex items-center w-full after:content-[''] after:w-full  after:border-b after:border-[#FFE7D6] after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="flex items-center justify-center md:p-3 p-1 bg-[#FF536B] rounded-full shrink-0"></span>
          </li>
          <div className="mt-4">
            <img
              src={delivered}
              alt="image"
              className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]"
            />
            <Header
              variant={{ theme: "dark", weight: "medium" }}
              className="md:text-base text-sm hidden"
            >
              On The Road
            </Header>
          </div>
        </div>
        <div className="w-[20%]">
          <li className="flex items-center w-full ">
            <span className="flex items-center justify-center md:p-3 p-1 bg-[#FF536B] rounded-full shrink-0"></span>
          </li>
          <div className="mt-4">
            <img
              src={pack}
              alt="image"
              className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]"
            />
            <Header
              variant={{ theme: "dark", weight: "medium" }}
              className="md:text-base text-sm hidden"
            >
              Delivered
            </Header>
          </div>
        </div>
      </ol>
    </div>
  );
};

export default Progressbar;
