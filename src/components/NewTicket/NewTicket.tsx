import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../http/apiEndPoints/Artist";
import axiosInstance from "../utils/axios";

const NewTicket = () => {
  const validationSchema = Yup.object({
    // name: Yup.string().required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required"),
    region: Yup.string().required("Region is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const initialValues = {
    // name: "",
    // email: "",
    region: "",
    subject: "",
    message: "",
    ticketImg: null,
    ticketType: "",
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (values: object) => {
    try {
      const response = await axiosInstance.post(
        `${ARTTIST_ENDPOINTS.RaiseTicket}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/tickets");
      return response;
    } catch (error) {
      console.error("Error while creating the ticket:", error);

      throw error;
    }
  };

  return (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="lg:w-[80%] w-full mx-auto mt-8">
        <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
          New Tickets
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="my-7"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </P>

        <div className="w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, resetForm, setErrors }) => (
              <Form className="bg-white my-4">
                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 font-readex"
                    htmlFor="name"
                  >
                    Name*
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <Field
                    name="email"
                    type="text"
                    placeholder="admin@gmail.com"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div> */}

                <div className="mb-4">
                  <label
                    htmlFor="region"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Select Region*
                  </label>
                  <Field
                    name="region"
                    as="select"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  >
                    <option value="">Choose region</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </Field>
                  <ErrorMessage
                    name="region"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <Field
                    name="subject"
                    type="text"
                    placeholder="Enter Subject"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="region"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Select Ticket Type*
                  </label>
                  <Field
                    name="ticketType"
                    as="select"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  >
                    <option value="">Choose Ticket Type</option>
                    <option value="Login">Login</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug">Bug</option>
                    <option value="Account Recovery">Account Recovery</option>
                    <option value="Payment">Payment</option>
                    <option value="Data Sync">Data Sync</option>
                  </Field>
                  <ErrorMessage
                    name="ticketType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder="Write description here..."
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Upload Your Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 py-10 px-6 bg-[#FFD1D114] rounded-lg text-center flex sm:flex-row flex-col gap-4 items-center justify-center">
                    <label className="text-md mb-2 text-center">
                      Upload Your Image Here
                    </label>
                    <label className="block text-center">
                      <input
                        name="ticketImg"
                        type="file"
                        ref={fileInputRef}
                        onChange={(event) => {
                          const file =
                            event.currentTarget.files &&
                            event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("ticketImg", file);
                          }
                        }}
                        className="hidden"
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                        variant={{
                          fontSize: "md",
                          thickness: "thick",
                          fontWeight: "600",
                        }}
                        className="border-2 border-[#E30077] text-[#E30077] rounded-2xl "
                      >
                        Browse File
                      </Button>
                      <ErrorMessage
                        name="ticketImg"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <Button
                    type="submit"
                    variant={{
                      fontSize: "sm",
                      thickness: "thick",
                      fontWeight: "600",
                      theme: "dark",
                    }}
                    className=" text-white py-2 px-10 rounded mr-4"
                  >
                    Submit
                  </Button>

                  <Button
                    type="submit"
                    variant={{
                      fontSize: "sm",
                      thickness: "thick",
                      fontWeight: "600",
                    }}
                    onClick={() => {
                      resetForm();
                      setErrors({});
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-white py-2 px-10 rounded border-2 border-[#102030] text-[#102030]"
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
