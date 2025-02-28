import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useChnagePasswordMutation from "./http/useChnagePasswordMutation";
import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required(t("Old Password is required")),
    newPassword: Yup.string()
      .min(6, `${t("Password must be at least 6 characters")}`)
      .required(t("New Password is required")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        `${t("Confirm Password must match")}`
      )
      .required(t("Confirm Password is required")),
  });

  const { mutateAsync, isPending } = useChnagePasswordMutation();

  const onSubmit = (value, { resetForm }) => {
    try {
      const data = {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      };

      mutateAsync(data).then(() => {
        resetForm();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      <p className="text-black mt-2 p-2 border-l border-r border-t rounded-t bg-gray-200 font-semibold text-[18px]">
        {t("Change Password")}
      </p>
      <div className="p-4 bg-white mx-auto rounded-b shadow border">
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-3">
              <div className="relative">
                <Field
                  type={showPassword.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  placeholder={t("Old Password")}
                  className={`w-full p-2 border ${
                    errors.oldPassword && touched.oldPassword
                      ? "border-red-500"
                      : "border-[#abababa6]"
                  } rounded outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#637381]"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  {showPassword.oldPassword ? (
                    <i className="bi bi-eye" />
                  ) : (
                    <i className="bi bi-eye-slash" />
                  )}
                </button>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="relative">
                <Field
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder={t("New Password")}
                  className={`w-full p-2 border ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-500"
                      : "border-[#abababa6]"
                  } rounded outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#637381]"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? (
                    <i className="bi bi-eye" />
                  ) : (
                    <i className="bi bi-eye-slash" />
                  )}
                </button>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="relative">
                <Field
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={t("Confirm New Password")}
                  className={`w-full p-2 border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-[#abababa6]"
                  } rounded outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#637381]"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? (
                    <i className="bi bi-eye" />
                  ) : (
                    <i className="bi bi-eye-slash" />
                  )}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#102030] text-white py-2 px-4 rounded hover:bg-[#0d1a26] transition duration-300"
                >
                  {isPending ? t("Saving...") : t("Save Changes")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Security;
