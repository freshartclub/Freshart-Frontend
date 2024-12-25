import GeneralForm from "./GeneralForm";

const GeneralUpload = ({ isActiveStatus }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full mt-6">
      <GeneralForm isActiveStatus={isActiveStatus} />
    </div>
  );
};

export default GeneralUpload;
