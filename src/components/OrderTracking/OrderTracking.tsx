import { useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import export_icon from "../../assets/export.png";
import invoice from "../../assets/invoice.png";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import OrderDescription from "./OrderDescription";
import { useGetOrderDetails } from "./http/useGetOrderDetails";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const values = {
    art: searchParams.get("art"),
    orderId: searchParams.get("id"),
    orderType: searchParams.get("orderType"),
  };

  const { data, isLoading, refetch } = useGetOrderDetails(values);
  const pdfRef = useRef();

  useEffect(() => {
    refetch();
  }, [values.art]);

 const generateInvoice = () => {
  if (!data?.foundArt) return;

  const order = data.foundArt;
  const doc = new jsPDF();

const discountPercentage = order?.items?.artwork?.pricing?.dpersentage ; 
const basePrice = order?.items?.artwork?.pricing?.basePrice;


const discountedPrice = basePrice - (basePrice * (discountPercentage / 100));


const taxPercentage = order?.tax || 0;

const taxAmount = parseFloat((discountedPrice * (taxPercentage / 100)).toFixed(2));



const totalAmount = discountedPrice + taxAmount;




  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 105, 20, { align: "center" });

 
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("FreshArt Club", 105, 30, { align: "center" });
  // doc.text("Vijay Nagar, Indore", 105, 35, { align: "center" });
  // doc.text("Madhya Pradesh, 452001, India", 105, 40, { align: "center" });
  // doc.text(`Phone: ${order.billingPhone}`, 105, 45, { align: "center" });
  // doc.text(`Email: ${order.billingEmail}`, 105, 50, { align: "center" });

 
  doc.setFontSize(10);
  doc.text(`Invoice #: ${order.orderId}`, 14, 60);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 65);
  doc.text(`Customer: ${order.billingAddress?.billingFirstName} ${order.billingAddress?.billingLastName}`, 14, 70);
  doc.text(`Order Type: ${order.type}`, 14, 75);
  doc.text(`Status: ${order.status}`, 14, 80);

  
  doc.text("Billing Address:", 14, 90);
  doc.text(`${order.billingAddress?.billingCompanyName}`, 14, 95);
  doc.text(`${order.billingAddress?.billingAddress}, ${order.billingAddress?.billingCity}`, 14, 100);
  doc.text(`${order.billingAddress?.billingState}, ${order.billingAddress?.billingZipCode}, ${order.billingAddress?.billingCountry}`, 14, 105);
  doc.text(`Phone: ${order.billingAddress?.billingPhone}`, 14, 110);

  doc.text("Shipping Address:", 105, 90);
  doc.text(`${order.shippingAddress.address}, ${order.shippingAddress.city}`, 105, 95);
  doc.text(`${order.shippingAddress.state}, ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`, 105, 100);
  doc.text(`Phone: ${order.shippingAddress.phone}`, 105, 105);
  doc.text(`Email: ${order.shippingAddress.email}`, 105, 110);

  
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 115, 195, 115);


  autoTable(doc, {
    startY: 120,
    head: [['Item', 'Description', 'Quantity', 'Unit Price', 'Discount',  'Total']],
    body: [
      [
        order.items.artwork.artworkName,
        `Material: ${order.items.artwork.inventoryShipping?.packageMaterial}`,
        1,
        `${order.items.artwork.pricing.currency  } ${order.items.artwork.pricing.basePrice.toFixed(2)}`,
        `${order.items?.artwork?.pricing?.dpersentage }%`,
       
        `${order.items.artwork.pricing.currency  } ${(order.items.artwork.pricing.basePrice - order.items?.artwork?.pricing?.dpersentage + order.items.artwork.pricing.vatAmount).toFixed(2)}`
      ]
    ],
    
    theme: 'grid',
    headStyles: {
      fillColor: [255, 83, 107],
      textColor: 255
    },
  });


  const finalY = doc.lastAutoTable.finalY || 140;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Order Summary", 14, finalY + 15);
  


  doc.setFont("helvetica", "normal");
  doc.text(`Subtotal: ${order.items.artwork.pricing.currency .split(' ')[0]} ${order.subTotal.toFixed(2)}`, 150, finalY + 15);
  doc.text(`Discount: ${order.items.artwork.pricing.currency .split(' ')[0]} ${order.discount.toFixed(2)}`, 150, finalY + 20);
 doc.text(
  `Tax (${order.tax.toFixed(2)}%): ${order.items.artwork.pricing.currency.split(' ')[0]} ${ taxAmount}`,
  150,
  finalY + 25
);


  doc.text(`Shipping: ${order.items.artwork.pricing.currency .split(' ')[0]} ${order.shipping.toFixed(2)}`, 150, finalY + 30);
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ${order.items.artwork.pricing.currency .split(' ')[0]} ${order.total.toFixed(2)}`, 150, finalY + 40);


  doc.setFontSize(10);
  doc.text("Package Details:", 14, finalY + 50);
  doc.text(`Dimensions: ${order.items.artwork.inventoryShipping?.packageLength} × ${order.items.artwork.inventoryShipping?.packageWidth} × ${order.items.artwork.inventoryShipping?.packageHeight} cm`, 14, finalY + 55);
  doc.text(`Weight: ${order.items.artwork.inventoryShipping?.packageWeight} kg`, 14, finalY + 60);


  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for your purchase!", 105, 280, { align: "center" });
  doc.text("For any queries, please contact freshartclub@gmail.com", 105, 285, { align: "center" });


  doc.save(`invoice_${order.orderId}.pdf`);
};


  console.log(data)

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#EFEFF7] pb-10">
      <div className="container mx-auto sm:px-6 px-3">
        <nav className="flex pt-5 gap-2 text-sm text-[#2E4053] items-center">
          <Link to="/" className="flex text-[#FF536B]">
            Home
          </Link>
          <MdOutlineKeyboardArrowRight />
          <Link to="/order" className="text-[#FF536B]">
            Order
          </Link>
          <MdOutlineKeyboardArrowRight />
          <span>Order Detail</span>
        </nav>

        <div className="flex sm:flex-row flex-col justify-end gap-5 mb-8 mt-6">
          <Button className="flex bg-[#DEDEFA]">
            <img src={export_icon} alt="Export" className="w-5 h-5 mr-2" />{" "}
            Export
          </Button>
          <Button className="flex" onClick={generateInvoice}>
            <img src={invoice} alt="Invoice" className="w-5 h-5 mr-2" /> Invoice
          </Button>
        </div>

        <div >
          <OrderDescription data={data} />
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;