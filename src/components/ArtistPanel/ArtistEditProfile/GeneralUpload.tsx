import Loader from "../../ui/Loader";
import GeneralForm from "./GeneralForm";

const GeneralUpload = ({ isActiveStatus, isLoading }) => {
  return <div className="w-full p-4">{isLoading ? <Loader /> : <GeneralForm isActiveStatus={isActiveStatus} />}</div>;
};

export default GeneralUpload;
