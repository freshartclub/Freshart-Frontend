import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { RenderAllPicklists } from "../utils/RenderAllPicklist";
import useGetPostArtistTicketMutation from "./ticket history/http/usePostTicket";
import { useTranslation } from "react-i18next";

const NewTicket = () => {
  const { t } = useTranslation();
  
  const validationSchema = Yup.object({
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

  const fetchName = (val) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  const { data, isLoading } = useGetArtistDetails();
  const picklist = RenderAllPicklists([
    "Ticket Type",
    "Ticket Impact",
    "Ticket Priority",
    "Ticket Urgency",
  ]);

  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const ticketType = picklistMap["Ticket Type"];
  const ticketImpact = picklistMap["Ticket Priority"];
  const ticketUrgency = picklistMap["Ticket Urgency"];

  const sortedticketImpact = ticketImpact?.sort((a, b) => {
    if (a.label > b.label) return -1;
    if (a.label < b.label) return 1;
    return 0;
  });

  const sortedticketUrgency = ticketUrgency?.sort((a, b) => {
    if (a.label > b.label) return -1;
    if (a.label < b.label) return 1;
    return 0;
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useGetPostArtistTicketMutation();

  const initialValues = {
    requestedBy: "",
    region: "",
    subject: "",
    message: "",
    ticketImg: null,
    ticketType: "",
    urgency: sortedticketUrgency?.[0]?.value || "",
    impact: sortedticketImpact?.[0]?.value || "",
  };

  const onSubmit = (values) => {
    try {
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

  if (isLoading || Object.keys(picklistMap).length === 0) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="lg:w-[80%] w-full mx-auto mt-8">
        <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
          {t("New Ticket")}
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
            {({ setFieldValue, resetForm, setErrors, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="bg-white my-4 p-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="requestedBy"
                  >
                    {t("Requested By")}
                  </label>
                  <Field
                    name="requestedBy"
                    type="text"
                    placeholder={t("Requested By")}
                    setFieldValue={fetchName(user)}
                    value={fetchName(user) || fetchName(data?.data?.artist)}
                    readOnly
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
                    {t("Title")}
                  </label>
                  <Field
                    name="subject"
                    type="text"
                    placeholder={t("Enter Subject")}
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
                    {t("Select Ticket Type")} *
                  </label>
                  <Field
                    name="ticketType"
                    as="select"
                    className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                  >
                    <option value="">{t("Choose Ticket Type")}</option>
                    {ticketType
                      ? ticketType?.map((item, i: number) => (
                          <option key={i} value={item?.value}>
                            {t(item.value)}
                          </option>
                        ))
                      : null}
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
                      {t("Select Urgency")}
                    </label>
                    <Field
                      name="urgency"
                      as="select"
                      className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                    >
                      {sortedticketUrgency
                        ? sortedticketUrgency?.map((item, i) => (
                            <option key={i} value={item?.value}>
                              {t(item.value)}
                            </option>
                          ))
                        : null}
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
                      {t("Select Impact")}
                    </label>
                    <Field
                      name="impact"
                      as="select"
                      className="outline-[#FDB7DC] bg-[#FFD1D114] shadow border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-[#FDB7DC] focus:shadow-outline"
                    >
                      {sortedticketImpact
                        ? sortedticketImpact?.map((item, i) => (
                            <option key={i} value={item?.value}>
                              {t(item.value)}
                            </option>
                          ))
                        : null}
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
                    {t("Ticket Description")}
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder={t(
                      "Write description here minimum words should be at least 10 characters"
                    )}
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
                    {t("Upload Your File")}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 py-10 px-6 bg-[#FFD1D114] rounded-lg text-center flex sm:flex-row flex-col gap-4 items-center justify-center">
                    <label className="text-md mb-2 text-center">
                      {t("Upload Your File Here")}
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
                    {isPending ? t("Loading...") : t("Submit")}
                  </button>

                  <span
                    onClick={() => {
                      resetForm();
                      setErrors({});
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className=" py-2 px-10 rounded border-2 border-[#102030] text-[#102030]"
                  >
                    {t("Reset")}
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
