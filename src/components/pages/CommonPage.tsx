import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const CommonPage = ({ image, para, heading, btn1, btn2, btn3 }: any) => {
  const navigate = useNavigate();

  const redirectToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#F9F7F6] py-10">
      <div className="container mx-auto md:px-6 px-3">
        <div className="md:w-[60%] w-full mx-auto">
          <div className="flex justify-center">
            <img src={image} alt="Error Imagr" />
          </div>
          <div className="text-center">
            <Header
              variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
              className="my-3"
            >
              {heading}
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="w-[80%] mx-auto"
            >
              {para}
            </P>
            <div className="flex flex-col md:w-[40%] w-full mx-auto my-4">
              {btn1 && (
                <Button
                  variant={{
                    theme: "dark",
                    rounded: "large",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="uppercase"
                  onClick={redirectToHomepage}
                >
                  {btn1}
                </Button>
              )}
              {btn2 && (
                <Button
                  variant={{
                    theme: "light",
                    rounded: "large",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="border border-[#102030] uppercase mt-5"
                  onClick={redirectToHomepage}
                >
                  {btn2}
                </Button>
              )}
              {btn3 && (
                <Button
                  variant={{
                    theme: "pink",
                    rounded: "full",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="items-center uppercase mt-5 w-[65%] flex flex-col justify-center mx-auto"
                >
                  {btn3}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
