import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useRef } from "react";

const NewTicket = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    reason: Yup.string().required("Reason is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
    cv: Yup.mixed().required("CV is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
    cv: null,
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (values: any) => {
    console.log(values);
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
            {({ setFieldValue }) => (
              <Form className="bg-white my-4">
                <div className="mb-4">
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
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Select Reason*
                  </label>
                  <Field
                    name="reason"
                    as="select"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  >
                    <option value="">Choose reason</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </Field>
                  <ErrorMessage
                    name="reason"
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
                    placeholder="Choose location"
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
                  <div className="border-2 border-dashed border-gray-300 py-10 px-6 bg-[#FFD1D114] rounded-lg text-center flex sm:flex-row flex-col gap-4 items-center justify-center">
                    <label className="text-md mb-2 text-center">
                      Upload Your Image Here
                    </label>
                    <label className="block text-center">
                      <input
                        name="cv"
                        type="file"
                        ref={fileInputRef}
                        onChange={(event) => {
                          const file =
                            event.currentTarget.files &&
                            event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("cv", file);
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
                        name="cv"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant={{
                    fontSize: "md",
                    thickness: "thick",
                    fontWeight: "600",
                    theme: "dark",
                  }}
                  className=" text-white py-2 px-4 rounded"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
