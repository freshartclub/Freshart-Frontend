import * as Yup from "yup";

export const CommonValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters long")
    .required("Password is required"),
  category: Yup.string().required("Category is required"),
  style: Yup.string().required("Style is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  country: Yup.string().required("Country is required"),
  zipCode: Yup.string().required("Zip code is required"),
  socialMedia: Yup.string().required("Social Media Link is required"),
  website: Yup.string().required("Website link is required"),
  uploadDocs: Yup.string().required("CV is required"),
  //   ======create invite========
  name: Yup.string().required("Name is required"),
  surname1: Yup.string().required("Surname1 is required"),
  surname2: Yup.string().required("Surname2 is required"),
  province: Yup.string().required("Province is required"),
  selectGender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Dob is required"),
  discountCode: Yup.string().required("Discount Code is required"),
  inviteCode: Yup.string().required("Invite Code is required"),
});
