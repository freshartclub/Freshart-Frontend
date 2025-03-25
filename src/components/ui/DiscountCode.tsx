import { useTranslation } from "react-i18next";
import Button from "./Button";

const DiscountCode = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border-4 border-[#EDE8FF] rounded-md px-3 flex justify-between">
      <input
        type="text"
        placeholder={t("Discount Code")}
        className="outline-none font-semibold w-full"
      />
      <Button
        variant={{ fontSize: "base", theme: "light", fontWeight: "600" }}
        className="text-[#004E92] uppercase"
      >
        {t("Apply")}
      </Button>
    </div>
  );
};

export default DiscountCode;
