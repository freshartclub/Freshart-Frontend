import P from "../ui/P";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/loginlogo.png";
import semicircle from "../../assets/semicircle.png";
import globe from "../../assets/glob.png";
import arrow3 from "../../assets/arrow_3.png";
import { useLocation } from "react-router-dom";

const LogNaveBar = () => {
  const navigate = useNavigate();
  const handleRedirectToArtistLogin = () => {
    navigate("/become_artist");
  };

  console.log("LogNaveBar");

  const handleRedirectToBecomeAnArtist = () => {
    navigate("/become_artist");
  };

  const redirectToHomepage = () => {
    navigate("/");
  };

  const location = useLocation();
  const isSignupPage = location.pathname.includes("signup");

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto md:px-6 px-3">
        <header className="relative py-4">
          <div className=" flex md:flex-row flex-col justify-between items-center">
            <div onClick={redirectToHomepage}>
              <img
                src={logo}
                alt="Fresh Art Club"
                className="h-10 cursor-pointer"
              />
            </div>
            <div className="flex items-center mt-6 md:mt-0">
              <Link to="/">
                <img src={globe} alt="" className="mr-5" />
              </Link>

              {isSignupPage ? (
                <Link to="/login" className="text-black mr-4">
                  SIGN IN
                </Link>
              ) : (
                <Link to="/signup" className="text-black mr-4">
                  SIGN UP
                </Link>
              )}

              {isSignupPage ? (
                <Button
                  variant={{
                    theme: "dark",
                    rounded: "full",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="flex justify-center items-center"
                  onClick={handleRedirectToBecomeAnArtist}
                >
                  <P
                    variant={{ theme: "light", weight: "normal" }}
                    className="md:text-base text-sm"
                  >
                    Become an Artist
                  </P>
                  <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
                </Button>
              ) : (
                <Button
                  variant={{
                    theme: "dark",
                    rounded: "full",
                    fontWeight: "500",
                    thickness: "thick",
                    fontSize: "base",
                  }}
                  className="flex justify-center items-center"
                >
                  <P
                    variant={{ size: "base", theme: "light", weight: "normal" }}
                    onClick={handleRedirectToArtistLogin}
                  >
                    Become An Artist
                  </P>
                  <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
                </Button>
              )}
            </div>
          </div>
          <img
            src={semicircle}
            alt="Semicircle"
            className="md:absolute hidden right-[50%] left-[50%] top-0 h-full"
          />
        </header>
      </div>
    </div>
  );
};

export default LogNaveBar;
