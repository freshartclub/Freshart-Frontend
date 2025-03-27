import Header from "../ui/Header";
import P from "../ui/P";

const BillingSection = ({ data }) => {
  const address_data = [
    {
      heading: "Billing Details",
      name: data?.foundArt?.billingAddress?.billingFirstName
        ? data?.foundArt?.billingAddress?.billingFirstName +
          " " +
          data?.foundArt?.billingAddress?.billingLastName
        : "N/A",
      addHead: "Address:",
      address: data?.foundArt?.billingAddress?.billingAddress,
      phone: "Phone Number:",
      number: data?.foundArt?.billingAddress?.billingPhone,
      email: "Email:",
      email_address: data?.foundArt?.billingAddress?.billingEmail,
    },
    {
      heading: "Shipping Details",
      // name: data?.foundArt?.billingAddress?.firstName
      //   ? data?.foundArt?.billingAddress?.firstName +
      //     " " +
      //     data?.foundArt?.billingAddress?.lastName
      //   : "N/A",
      addHead: "Address :",
      address:
        data?.foundArt?.shippingAddress?.address ||
        data?.foundArt?.billingAddress?.billingAddress,
      phone: "Phone Number :",
      number:
        data?.foundArt?.shippingAddress?.phone ||
        data?.foundArt?.billingAddress?.billingPhone,
      email: "Email :",
      email_address:
        data?.foundArt?.shippingAddress?.email ||
        data?.foundArt?.billingAddress?.billingEmail,
    },
    {
      heading: "Order Notes:",
      address: data?.foundArt?.note ? data?.foundArt?.note : "N/A",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 md:mt-10 mt-1">
      {address_data.map((item, index) => (
        <div key={index} className="lg:border-r px-4 md:mt-6 mt-6">
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
          <div className="flex gap-1 my-2">
            <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
              {item.addHead}
            </P>
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#203F58]"
            >
              {item.address}
            </P>
          </div>
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
