import Header from "../ui/Header";
import P from "../ui/P";

const address_data = [
  {
    heading: "Billing Address",
    name: "Kevin Gilbert",
    address:
      "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
    phone: "Phone Number:",
    number: " +1-202-555-0118",
    email: "Email:",
    email_address: " kevin.gilbert@gmail.com",
  },
  {
    heading: "Shipping Address",
    name: "Kevin Gilbert",
    address:
      "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
    phone: "Phone Number:",
    number: " +1-202-555-0118",
    email: "Email:",
    email_address: " kevin.gilbert@gmail.com",
  },
  {
    heading: "Order Notes",
    address:
      "Donec ac vehicula turpis. Aenean sagittis est eu arcu ornare, eget venenatis purus lobortis. Aliquam erat volutpat. Aliquam magna odio.",
  },
];

const BillingSection = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 mt-10">
      {address_data.map((item, index) => (
        <div key={index} className="lg:border-r px-4 md:mt-6 mt-0">
          <Header
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
            className="lg:mb-4 mb-2"
          >
            {item.heading}
          </Header>
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="mb-3"
          >
            {item.name}
          </P>
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="text-[#203F58]"
          >
            {item.address}
          </P>
          <div className="flex gap-1 my-2">
            <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
              {item.phone}
            </P>
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#203F58]"
            >
              {item.number}
            </P>
          </div>

          <div className="flex gap-1">
            <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
              {item.email}
            </P>
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#203F58]"
            >
              {item.email_address}
            </P>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillingSection;
