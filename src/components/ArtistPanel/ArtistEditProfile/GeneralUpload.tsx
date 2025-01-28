import GeneralForm from "./GeneralForm";

const GeneralUpload = ({ isActiveStatus }) => {
  return (
    <div className="w-full mt-4">
      <GeneralForm isActiveStatus={isActiveStatus} />
    </div>
  );
};

export default GeneralUpload;
