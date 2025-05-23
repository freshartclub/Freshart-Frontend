import { Link } from "react-router-dom";
import icon from "../../assets/Link (1).png";
import instagram from "../../assets/Link (2).png";
import cross from "../../assets/Link (3).png";
import linkedin from "../../assets/Link (4).png";
import facebook from "../../assets/Link.png";
import locationIcon from "../../assets/loacation.png";
import logo from "/logofarcwhite.svg";
import mail from "../../assets/mail.png";
import call from "../../assets/phone.png";
import { useAppSelector } from "../../store/typedReduxHooks";

const FooterSection = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const scrolToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const token = localStorage.getItem("auth_token");
  const isArtist = useAppSelector((state) => state.user.isArtist);

  return (
    <footer className="bg-[#102030] text-white pt-8 pb-3 z-[5]">
      <div className="mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:text-left text-center">
            <img src={logo} alt="Fresh Art Club Logo" className="min-[450px]:w-[200px] w-[150px]" />
            <p className="mt-6 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>

          <div className="sm:text-left text-center">
            <h2 className="text-xl font-bold text-[#EE1D52] mb-3">Contact Fresh Art</h2>

            <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
              <img src={locationIcon} alt="Location" className="w-6 h-6 sm:block hidden" />
              <div className="ml-4 ">
                <p className="text-sm">Visit Our Location</p>
                <p className="mt-1 text-sm">5th Street, 21st Floor, New York, USA</p>
              </div>
            </div>

            <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
              <img src={mail} alt="Mail" className="w-6 h-6 sm:block hidden" />
              <div className="ml-4 ">
                <p className="text-sm">Send Us Email</p>
                <p className="mt-1 text-sm">admin@gmail.com</p>
              </div>
            </div>

            <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
              <img src={call} alt="Call" className="w-6 h-6 sm:block hidden" />
              <div className="ml-4 ">
                <p className="text-sm">Looking For Project</p>
                <p className="mt-1 text-sm">+91-234-567-8900</p>
              </div>
            </div>
          </div>

          <div className="sm:text-left text-center">
            <h2 className="text-xl font-bold text-[#EE1D52] mb-3">Company</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/home" className="text-sm hover:underline" onClick={scrolToTop}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:underline" onClick={scrolToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:underline" onClick={scrolToTop}>
                  Contact Us
                </Link>
              </li>
              {isAuthorized ? (
                <>
                  <li>
                    <Link to={token ? "/all_artist" : "/login"} className="text-sm hover:underline" onClick={scrolToTop}>
                      Artists
                    </Link>
                  </li>
                  <li>
                    <Link to={token ? "/purchase" : "/login"} className="text-sm hover:underline" onClick={scrolToTop}>
                      Gallery
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          <div className="sm:text-left text-center">
            <h2 className="text-xl font-bold text-[#EE1D52] mb-3">Quick Links</h2>

            <ul className="mt-6 space-y-4">
              {isAuthorized ? null : (
                <>
                  <li>
                    <Link to="/login" className="text-sm hover:underline" onClick={scrolToTop}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-sm hover:underline" onClick={scrolToTop}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
              {isArtist ? null : (
                <li>
                  <Link to="/become_artist" className="text-sm hover:underline" onClick={scrolToTop}>
                    Become An Artist
                  </Link>
                </li>
              )}

              <li>
                <Link to="/terms" className="text-sm hover:underline" onClick={scrolToTop}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:underline" onClick={scrolToTop}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:flex justify-between mt-5 pt-5 border-t border-[#EE1D52]">
          <div className="text-center text-sm">
            <p>
              Copyright © 2024{" "}
              <a href="/" className="text-[#EE1D52]">
                Fresh Art Club
              </a>{" "}
              | All Rights Reserved
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#">
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={icon} alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={cross} alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
