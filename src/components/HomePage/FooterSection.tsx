import { Link } from "react-router-dom";
import icon from "../../assets/Link (1).png";
import instagram from "../../assets/Link (2).png";
import cross from "../../assets/Link (3).png";
import linkedin from "../../assets/Link (4).png";
import facebook from "../../assets/Link.png";
import locationIcon from "../../assets/loacation.png";
import logo from "../../assets/Logo01 1.png";
import mail from "../../assets/mail.png";
import call from "../../assets/phone.png";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useEffect, useLayoutEffect, useState } from "react";
import { setProfile } from "../../store/userSlice/userSlice";

const FooterSection = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);


  const scrolToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const token = localStorage.getItem("auth_token");


    const profile = localStorage.getItem("profile");


  const userProfile = useAppSelector((state) => state.user.profile);

  console.log("this is profile", userProfile);
  const isArtist = useAppSelector((state) => state.user.isArtist);

  return (
    <>
    
        <footer className="bg-[#102030] text-white pt-16 pb-6 z-[5]">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="sm:text-left text-center">
                <img src={logo} alt="Fresh Art Club Logo" />
                <p className="mt-6 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>

              <div className="sm:text-left text-center">
                <h2 className="text-xl font-bold text-[#FF725E] mb-3">
                  Contact Fresh Art
                </h2>

                <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
                  <img
                    src={locationIcon}
                    alt="Location"
                    className="w-6 h-6 sm:block hidden"
                  />
                  <div className="ml-4 ">
                    <p className="text-sm">Visit Our Location</p>
                    <p className="mt-1 text-sm">
                      5th Street, 21st Floor, New York, USA
                    </p>
                  </div>
                </div>

                <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
                  <img
                    src={mail}
                    alt="Mail"
                    className="w-6 h-6 sm:block hidden"
                  />
                  <div className="ml-4 ">
                    <p className="text-sm">Send Us Email</p>
                    <p className="mt-1 text-sm">admin@gmail.com</p>
                  </div>
                </div>

                <div className="flex mt-6 md:items-start items-center sm:justify-start justify-center">
                  <img
                    src={call}
                    alt="Call"
                    className="w-6 h-6 sm:block hidden"
                  />
                  <div className="ml-4 ">
                    <p className="text-sm">Looking For Project</p>
                    <p className="mt-1 text-sm">+91-234-567-8900</p>
                  </div>
                </div>
              </div>

              {/* Company Links */}
              <div className="sm:text-left text-center">
                <h2 className="text-xl font-bold text-[#FF725E] mb-3">
                  Company
                </h2>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      to="/home"
                      className="text-sm hover:underline"
                      onClick={scrolToTop}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-sm hover:underline"
                      onClick={scrolToTop}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-sm hover:underline"
                      onClick={scrolToTop}
                    >
                      Contact Us
                    </Link>
                  </li>
                  {isAuthorized ? (
                    <>
                      <li>
                        <Link
                          to={token ? "/all_artist" : "/login"}
                          className="text-sm hover:underline"
                          onClick={scrolToTop}
                        >
                          Artists
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={token ? "/purchase" : "/login"}
                          className="text-sm hover:underline"
                          onClick={scrolToTop}
                        >
                          Gallery
                        </Link>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="sm:text-left text-center">
                <h2 className="text-xl font-bold text-[#FF725E] mb-3">
                  Quick Links
                </h2>

                <ul className="mt-6 space-y-4">
                  {isAuthorized ? null : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="text-sm hover:underline"
                          onClick={scrolToTop}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className="text-sm hover:underline"
                          onClick={scrolToTop}
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                  {isArtist ? null : (
                    <li>
                      <Link
                        to="/become_artist"
                        className="text-sm hover:underline"
                        onClick={scrolToTop}
                      >
                        Become An Artist
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/terms"
                      className="text-sm hover:underline"
                      onClick={scrolToTop}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-sm hover:underline"
                      onClick={scrolToTop}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden md:flex justify-between mt-10 border-t border-[#642f36]">
              {/* Footer Bottom */}
              <div className="text-center text-sm mt-8">
                <p>
                  Copyright © 2024 Fresh Art by{" "}
                  <a href="/" className="text-[#FF725E]">
                    Fresh Art
                  </a>{" "}
                  | All Rights Reserved
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center mt-10 space-x-6">
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
   
    </>
  );
};

export default FooterSection;
