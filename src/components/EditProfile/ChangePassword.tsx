import Header from "../ui/Header";
import Button from "../ui/Button";
import eye from "../../assets/view.png";
import eyeclose from "../../assets/hidden.png";
import { useState } from "react";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswordIcon, setNewPasswordIcon] = useState(eyeclose);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeclose);
  const [currentPasswordIcon, setCurrentPasswordIcon] = useState(eyeclose);

  const handleNewPasswordToggle = () => {
    if (newPasswordType === "password") {
      setNewPasswordIcon(eye);
      setNewPasswordType("text");
    } else {
      setNewPasswordIcon(eyeclose);
      setNewPasswordType("password");
    }
  };

  const handleConfirmPasswordToggle = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordIcon(eye);
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordIcon(eyeclose);
      setConfirmPasswordType("password");
    }
  };

  const handleCurrentPasswordToggle = () => {
    if (currentPasswordType === "password") {
      setCurrentPasswordIcon(eye);
      setCurrentPasswordType("text");
    } else {
      setCurrentPasswordIcon(eyeclose);
      setCurrentPasswordType("password");
    }
  };

  return (
    <div className="xl:w-[70%] lg:w-[95%] w-full mx-auto shadow-xl my-10">
      <div className="rounded-md bg-white border border-[#E6E6E6]">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
          className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
        >
          Change Password
        </Header>

        <div className="xl:p-6 lg:p-4 md:p-6 p-4">
          <div className="">
            <label htmlFor="newPassword" className="mb-2 text-gray-700">
              Current Password
            </label>
            <div className="flex w-full">
              <input
                type={currentPasswordType}
                id="currentPassword"
                name="currentPassword"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
              />
              <img
                src={currentPasswordIcon}
                alt="eye"
                className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                onClick={handleCurrentPasswordToggle}
              />
            </div>
          </div>

          <div className="w-full my-5 flex md:flex-row flex-col md:gap-5">
            <div className="mb-5 md:mb-0 flex flex-col md:w-[49%] w-full">
              <label htmlFor="newPassword" className="mb-2 text-gray-700">
                New Password
              </label>
              <div className="flex w-full">
                <input
                  type={newPasswordType}
                  id="newPassword" // Added id for linking with the label
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="current-password"
                  className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                />
                <img
                  src={newPasswordIcon}
                  alt="eye"
                  className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                  onClick={handleNewPasswordToggle}
                />
              </div>
            </div>

            <div className=" flex flex-col md:w-[49%] w-full">
              <label htmlFor="newPassword" className="mb-2 text-gray-700">
                Confirm Password
              </label>
              <div className="flex w-full">
                <input
                  type={confirmPasswordType}
                  placeholder="Confirm Password"
                  className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                />
                <img
                  src={confirmPasswordIcon}
                  alt="eye"
                  className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                  onClick={handleConfirmPasswordToggle}
                />
              </div>
            </div>
          </div>

          <Button
            variant={{ fontSize: "base", fontWeight: "600", theme: "dark" }}
            className="rounded-full"
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
