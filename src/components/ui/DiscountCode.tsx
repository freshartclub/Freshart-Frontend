import Button from "./Button";

const DiscountCode = () => {
  return (
    <div className="bg-white border-4 border-[#EDE8FF] rounded-md px-3 py-2 flex justify-between">
      <input
        type="text"
        placeholder="Discount Code"
        className="outline-none placeholder:text-black font-semibold w-full"
      />
      <Button
        variant={{ fontSize: "base", theme: "light", fontWeight: "600" }}
        className="text-[#004E92] uppercase"
      >
        Apply
      </Button>
    </div>
  );
};

export default DiscountCode;
