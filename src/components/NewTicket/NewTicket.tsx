import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import Loader from "../ui/Loader";
import { RenderAllPicklists } from "../utils/RenderAllPicklist";
import useGetPostArtistTicketMutation from "./ticket history/http/usePostTicket";
import { useTranslation } from "react-i18next";
import { FiUser, FiFileText, FiAlertCircle, FiUpload, FiAlertTriangle, FiClock, FiType, FiRefreshCw, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileImage, FaFileExcel, FaFileWord, FaTimes } from "react-icons/fa";

const NewTicket = () => {
  const { t } = useTranslation();
  const darkMode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.user.user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validationSchema = Yup.object({
    subject: Yup.string().required(t("Ticket subject is required")),
    message: Yup.string()
      .required(t("Ticket description is required"))
      .test("min-words", `${t("Ticket description must be at least 10 words")}`, (value) => value && value.split(/\s+/).length >= 10),
    ticketType: Yup.string().required(t("Ticket type is required")),
  });

  const { data, isLoading } = useGetArtistDetails();
  const { mutate, isPending } = useGetPostArtistTicketMutation();

  const picklist = RenderAllPicklists(["Ticket Type", "Ticket Impact", "Ticket Priority", "Ticket Urgency"]);

  const picklistMap = picklist.reduce((acc: Record<string, any>, item: any) => {
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

  const fetchName = (val: any) => {
    let fullName = val?.artistName || "";
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  const initialValues = {
    requestedBy: fetchName(user) || fetchName(data?.data?.artist) || "",
    region: "",
    subject: "",
    message: "",
    ticketImg: null,
    ticketType: "",
    urgency: sortedticketUrgency?.[0]?.value || "",
    impact: sortedticketImpact?.[0]?.value || "",
  };

  const onSubmit = (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "ticketImg" && fileInputRefz.current?.files?.[0]) {
        formData.append(key, fileInputRef.current.files[0]);
      } else if (values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });
    mutate(formData);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-4xl mx-auto p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} shadow-lg`}
      >
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{t("New Ticket")}</h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {t(
              "Please categorize and describe your issue as much as you can in order our support team can help you properly and promptly. Also provide screen shots or files as required."
            )}
          </p>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ setFieldValue, resetForm, setErrors, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FiUser className="text-lg" />
                    {t("Requested By")} *
                  </label>
                  <Field
                    name="requestedBy"
                    type="text"
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-300"
                        : "bg-gray-50 border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                    }`}
                  />
                </div>

                <div>
                  <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FiFileText className="text-lg" />
                    {t("Ticket Subject")} *
                  </label>
                  <Field
                    name="subject"
                    type="text"
                    placeholder={t("Enter Ticket Subject")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                        : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                    }`}
                  />
                  <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    {(msg) => (
                      <span className="flex items-center gap-2 text-red-600">
                        <FiAlertCircle className="inline" />
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FiType className="text-lg" />
                    {t("Ticket Type")} *
                  </label>
                  <Field
                    name="ticketType"
                    as="select"
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                        : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                    }`}
                  >
                    <option value="">{t("Select Ticket Type")}</option>
                    {ticketType?.map((item, i: number) => (
                      <option key={i} value={item?.value}>
                        {t(item.value)}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="ticketType" component="div" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    {(msg) => (
                      <span className="flex items-center gap-2 text-red-600">
                        <FiAlertCircle className="inline" />
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <FiClock className="text-lg" />
                      {t("Urgency")} *
                    </label>
                    <Field
                      name="urgency"
                      as="select"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                          : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                      }`}
                    >
                      {sortedticketUrgency?.map((item, i) => (
                        <option key={i} value={item?.value}>
                          {t(item.value)}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div>
                    <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <FiAlertTriangle className="text-lg" />
                      {t("Impact")} *
                    </label>
                    <Field
                      name="impact"
                      as="select"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                          : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                      }`}
                    >
                      {sortedticketImpact?.map((item, i) => (
                        <option key={i} value={item?.value}>
                          {t(item.value)}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div>
                  <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FiFileText className="text-lg" />
                    {t("Ticket Description")} *
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder={t("Write description here (minimum 10 words)")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                        : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-700"
                    }`}
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    {(msg) => (
                      <span className="flex items-center gap-2 text-red-600">
                        <FiAlertCircle className="inline" />
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FiUpload className="text-lg" />
                    {t("Upload Your File")}
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      darkMode ? "border-gray-600 hover:border-gray-500 bg-gray-700/50" : "border-gray-300 hover:border-gray-400 bg-gray-50"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      name="ticketImg"
                      type="file"
                      ref={fileInputRef}
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) setFieldValue("ticketImg", file);
                      }}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />

                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiUpload className="text-2xl text-gray-500" />
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t("Click to upload or drag and drop")}</p>
                      <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{t("PDF, DOC, XLS, JPG, PNG (Max 5MB)")}</p>
                    </div>
                  </div>

                  {fileInputRef.current?.files?.[0] && (
                    <div className="mt-3 flex items-center gap-2">
                      {fileInputRef.current.files[0].name.includes(".pdf") ? (
                        <FaFilePdf className="text-red-500 text-xl" />
                      ) : fileInputRef.current.files[0].name.includes(".doc") ? (
                        <FaFileWord className="text-[#EE1D52] text-xl" />
                      ) : fileInputRef.current.files[0].name.includes(".xls") ? (
                        <FaFileExcel className="text-green-500 text-xl" />
                      ) : (
                        <FaFileImage className="text-purple-500 text-xl" />
                      )}
                      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{fileInputRef.current.files[0].name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (fileInputRef.current) fileInputRef.current.value = "";
                          setFieldValue("ticketImg", null);
                        }}
                        className="text-red-500 ml-auto"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setErrors({});
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                      darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    <FiRefreshCw />
                    {t("Reset")}
                  </button>

                  <button
                    type="submit"
                    disabled={isPending}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[#EE1D52] hover:bg-[#EE1D52]/80 disabled:opacity-70`}
                  >
                    {isPending ? (
                      <Loader />
                    ) : (
                      <>
                        <FiSend />
                        {t("Submit Ticket")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default NewTicket;
