import Button from "../ui/Button";
import Header from "../ui/Header";
import support from "../../assets/security.png";
import search from "../../assets/MagnifyingGlass.png";
import P from "../ui/P";
import truck from "../../assets/Truck.png";
import lock from "../../assets/LockOpen.png";
import credit from "../../assets/CreditCard.png";
import user from "../../assets/User.png";
import stack from "../../assets/Stack99.png";
import notepad from "../../assets/Notepad.png";
import shopping from "../../assets/CreditCard.png";
import store from "../../assets/Storefront.png";
import arrow from "../../assets/arrow.png";
import call from "../../assets/PhoneCall.png";
import msg from "../../assets/ChatCircleDots.png";
import { FaWhatsapp } from "react-icons/fa";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const assist_Data = [
  {
    image: truck,
    title: "Track Order",
  },
  {
    image: lock,
    title: "Reset Password",
  },
  {
    image: credit,
    title: "Payment Option",
  },
  {
    image: user,
    title: "User & Account",
  },
  {
    image: stack,
    title: "Wishlist & Compare",
  },
  {
    image: notepad,
    title: "Shipping & Billing",
  },
  {
    image: shopping,
    title: "Shoping Cart & Wallet",
  },
  {
    image: store,
    title: "Sell on Clicon",
  },
];

const Support = () => {
  const navigate = useNavigate();

  const handleSubmitButton = () => {
    navigate("/tickets");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="container mx-auto md:px-6 px-3">
        <div className="flex sm:flex-row flex-col justify-between my-10 w-full">
          <div className="md:w-[70%] w-full">
            <Button
              variant={{
                fontWeight: "400",
                thickness: "thick",
                fontSize: "base",
              }}
              className="bg-[#FF536B] rounded-md text-white mb-5 uppercase"
            >
              Help Center
            </Button>
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              How we can help you!
            </Header>
            <div className="border border-lightgray py-2 px-2 md:w-[70%] w-full flex justify-between my-5">
              <div className="flex w-full">
                <img
                  src={search}
                  alt="search icon"
                  className="w-[24px] h-[24px] mt-3 mr-3"
                />
                <input
                  type="text"
                  placeholder="Enter your question or keyword"
                  className="w-[90%] outline-none"
                ></input>
              </div>
              <Button
                variant={{
                  fontWeight: "500",
                  theme: "dark",
                  thickness: "thick",
                  fontSize: "base",
                }}
                className="rounded-none"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="sm:w-[30%] w-full">
            <img src={support} alt="support image" className="w-full" />
          </div>
        </div>
      </div>

      <div className="bg-[#E9E4DF] py-10">
        <div className="container mx-auto md:px-6 px-3 mb-10">
          <Header
            variant={{ size: "2xl", weight: "bold", theme: "dark" }}
            className="mb-10 text-center"
          >
            What can we assist you with today?
          </Header>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4">
            {assist_Data.map((item, index) => (
              <div
                key={index}
                className="bg-white flex p-4 border border-[#FFD8DD] shadow-lg"
              >
                <img src={item.image} alt="image" />
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="ml-3 mt-1"
                >
                  {item.title}
                </P>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container m-auto px-6">
        <div className="my-12">
          <Header
            variant={{ size: "2xl", theme: "dark", weight: "bold" }}
            className="text-center mb-10"
          >
            Popular Topics
          </Header>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 justify-between px-3 gap-10">
            <div className="">
              <ul className="list-disc">
                <li className="mb-5  font-normal">How do I return my item?</li>
                <li className="mb-5  font-normal">
                  What is Clicons Returns Policy?
                </li>
                <li className="mb-5  font-normal">
                  How long is the refund process?
                </li>
              </ul>
            </div>

            <div>
              <ul className="list-disc">
                <li className="mb-5  font-normal">
                  What are the 'Delivery Timelines'?
                </li>
                <li className="mb-5  font-normal">
                  What is 'Discover Your Daraz Campaign 2022'?
                </li>
                <li className="mb-5  font-normal">
                  What is the Voucher & Gift Offer in this Campaign?
                </li>
              </ul>
            </div>

            <div>
              <ul className="list-disc">
                <li className="mb-5  font-normal">
                  How to cancel Clicon Order.
                </li>
                <li className="mb-5  font-normal">
                  Ask the Digital and Device Community
                </li>
                <li className="mb-5  font-normal">
                  How to change my shop name?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E9E4DF] py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Button
              variant={{ fontSize: "md", fontWeight: "400" }}
              className="uppercase text-white bg-[#FF536B] mb-3"
            >
              Contact Us
            </Button>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              Don’t find your answer.
            </Header>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              Contact with us
            </Header>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-10 ">
            <div className="flex flex-col md:flex-row bg-white py-8 pl-8">
              <div className="bg-[#d1dde9] w-[120px] h-[80px] p-2 flex items-center justify-center mr-5">
                <BsFillTicketPerforatedFill size="3em" />
              </div>
              <div>
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                  className="mb-3"
                >
                  Submit a ticket
                </Header>
                <P
                  variant={{ size: "md", theme: "dark", weight: "normal" }}
                  className="mb-4 pr-10"
                >
                  we are available online from 9:00 AM to 5:00 PM (GMT95:45)
                  Talk with use now
                </P>

                <Button
                  onClick={handleSubmitButton}
                  variant={{
                    fontSize: "base",
                    fontWeight: "500",
                    theme: "dark",
                  }}
                  className="uppercase flex mt-8"
                >
                  Submit ticket
                  <img src={arrow} alt="arrow" className="mt-1 ml-2" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row bg-white py-8 pl-8">
              <div className="bg-green-100 w-[120px] h-[80px] p-2  flex items-center justify-center mr-5">
                <FaWhatsapp size="3em" color="green" />
              </div>
              <div>
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                  className="mb-3"
                >
                  Chat with us on Whatsapp
                </Header>
                <P
                  variant={{ size: "md", theme: "dark", weight: "normal" }}
                  className="mb-4 pr-10"
                >
                  we are available online from 9:00 AM to 5:00 PM (GMT95:45)
                  Talk with use now
                </P>
                {/* <P
                  variant={{ weight: "semiBold", theme: "dark", size: "md" }}
                  className="mb-3"
                >
                  Support@clicon.com
                </P> */}
                <Button
                  variant={{ fontSize: "base", fontWeight: "500" }}
                  className="uppercase flex bg-[#FF536B] text-white mt-8"
                >
                  Start Chat
                  <img src={arrow} alt="arrow" className="mt-1 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <Link className="text-red-400 font-medium text-center underline">
              See Recent Ticket History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
