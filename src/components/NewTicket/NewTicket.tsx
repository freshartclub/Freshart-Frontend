import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import useGetPostArtistTicketMutation from "./ticket history/http/usePostTicket";
import {
  impactOption,
  urgency,
  urgencyData,
  urgencyOption,
} from "../utils/mockData";
import { useAppSelector } from "../../store/typedReduxHooks";

const NewTicket = () => {
  const validationSchema = Yup.object({
    // name: Yup.string().required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required"),

    subject: Yup.string().required("Title is required"),
    message: Yup.string()
      .required("Message is required")
      .test(
        "min-words",
        "Message must be at least 10 words",
        (value) => value && value.split(/\s+/).length >= 10
      ),
    ticketType: Yup.string().required("Ticket type is required"),
  });

  const user = useAppSelector((state) => state.user.user);

  const requestedName = user.artistName;
  console.log(requestedName);

  const initialValues = {
    requestedBy: "",
    region: "",
    subject: "",
    message: "",
    ticketImg: null,
    ticketType: "",
  };

  // useEffect(() => {
  //   if (requestedName) {
  //     Formik.setFieldValue("requestedBy", requestedName);
  //   }
  // }, []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { mutate, isPending } = useGetPostArtistTicketMutation();

  const onSubmit = (values, action) => {
    console.log("onSubmit", values);

    try {
      console.log("onSubmit", values);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (
          key === "ticketImg" &&
          fileInputRef.current &&
          fileInputRef.current.files[0]
        ) {
          formData.append(key, fileInputRef.current.files[0]);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });
      mutate(formData);
    } catch (error) {
      console.log(error);
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

        <div className="w-full ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, resetForm, setErrors, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="bg-white my-4 p-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="requestedBy"
                  >
                    Requested By
                  </label>
                  <Field
                    name="requestedBy"
                    type="text"
                    placeholder="Requested By"
                    setFieldValue={requestedName}
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="requestedBy"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subject"
                  >
                    Title
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
                    htmlFor="ticketType"
                    className="block mb-2 text-sm font-bold text-gray-900 "
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

                <div className="flex justify-between items-center gap-3">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="urgency"
                      className="block mb-2 text-sm font-bold text-gray-900 "
                    >
                      Select Urgency
                    </label>
                    <Field
                      name="urgency"
                      as="select"
                      className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                    >
                      {/* <option value="">Choose Urgency Type</option> */}

                      {urgencyOption.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name="urgency"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label
                      htmlFor="impact"
                      className="block mb-2 text-sm font-bold text-gray-900 "
                    >
                      Select Impact
                    </label>
                    <Field
                      name="impact"
                      as="select"
                      className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                    >
                      {/* <option value="">Choose Impact Type</option> */}

                      {impactOption.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name="impact"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-bold text-gray-900 "
                  >
                    Ticket Description
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder="Write description here minimum words should be at least 10 characters"
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
                    className="block mb-2 text-sm font-bold text-gray-900 "
                  >
                    Upload Your File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 py-10 px-6 bg-[#FFD1D114] rounded-lg text-center flex sm:flex-row flex-col gap-4 items-center justify-center">
                    <label className="text-md mb-2 text-center">
                      Upload Your File Here
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
                        className=""
                      />
                      <ErrorMessage
                        name="ticketImg"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <button
                    type="submit"
                    className=" text-white rounded-md py-2 px-10  mr-4 bg-black"
                  >
                    {isPending ? "Loading..." : "Submit"}
                  </button>

                  <span
                    // variant={{
                    //   fontSize: "sm",
                    //   thickness: "thick",
                    //   fontWeight: "600",
                    // }}
                    onClick={() => {
                      resetForm();
                      setErrors({});
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className=" py-2 px-10 rounded border-2 border-[#102030] text-[#102030]"
                  >
                    Reset
                  </span>
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
