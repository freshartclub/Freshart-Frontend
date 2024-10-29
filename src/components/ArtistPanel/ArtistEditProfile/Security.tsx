import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Security = () => {
  // Toggle visibility state for password fields
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="p-4 md:p-6 mx-auto rounded-lg shadow-lg ">
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log("Form data", values); // This prints the form data to the console
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Old Password */}
            <div className="relative">
              <Field
                type={showPassword.oldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Old password"
                className={`w-full px-4 py-3 border ${
                  errors.oldPassword && touched.oldPassword
                    ? "border-red-500"
                    : "border-[#919EAB33]"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#637381]"
                onClick={() => togglePasswordVisibility("oldPassword")}
              >
                {showPassword.oldPassword ? (
                  <i className="bi bi-eye" /> /* Bootstrap Icon */
                ) : (
                  <i className="bi bi-eye-slash" /> /* Bootstrap Icon */
                )}
              </button>
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <Field
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                className={`w-full px-4 py-3 border ${
                  errors.newPassword && touched.newPassword
                    ? "border-red-500"
                    : "border-[#919EAB33]"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#637381]"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? (
                  <i className="bi bi-eye" /> /* Bootstrap Icon */
                ) : (
                  <i className="bi bi-eye-slash" /> /* Bootstrap Icon */
                )}
              </button>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <Field
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 border ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-[#919EAB33]"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#637381]"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? (
                  <i className="bi bi-eye" /> /* Bootstrap Icon */
                ) : (
                  <i className="bi bi-eye-slash" /> /* Bootstrap Icon */
                )}
              </button>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#102030] text-white py-2 px-4 rounded hover:bg-[#0d1a26] transition duration-300"
              >
                Save changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Security;
