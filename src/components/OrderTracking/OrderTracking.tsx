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
  

  useEffect(() => {
    refetch();
  }, [values.art]);

const generateInvoice = () => {
  if (!data?.foundArt) return;

  const order = data.foundArt;
  const doc = new jsPDF();
  
  // Calculate prices
  const discountPercentage = order?.items?.artwork?.pricing?.dpersentage || 0;
  const basePrice = order?.items?.artwork?.pricing?.basePrice || 0;
  const discountedPrice = basePrice - (basePrice * (discountPercentage / 100));
  const taxPercentage = order?.tax || 0;
  const taxAmount = parseFloat((discountedPrice * (taxPercentage / 100)).toFixed(2));
  const totalAmount = discountedPrice + parseFloat(taxAmount);


  const logoUrl = "/logofarcwhite.svg" 
  try {
    doc.addImage(logoUrl, 'PNG', 14, 10, 40, 20); 
  } catch (e) {
    console.warn("Could not load logo:", e);
    // Fallback to text if logo fails
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text("FRESHART CLUB", 105, 20, { align: "center" });
  }

 
  const primaryColor = [255, 83, 107]; 
  const secondaryColor = [60, 60, 60];
  const lightColor = [220, 220, 220];

  // Header section
  doc.setFontSize(16);
  doc.setTextColor(...secondaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 105, 40, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Art Marketplace", 105, 45, { align: "center" });

  
  doc.setFillColor(...lightColor);
  doc.rect(14, 55, 185, 10, 'F');
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE DETAILS", 20, 61);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`Invoice #: ${order.orderId}`, 14, 75);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 80);
  doc.text(`Customer: ${order.billingAddress?.billingFirstName} ${order.billingAddress?.billingLastName}`, 14, 85);
  doc.text(`Order Type: ${order.type}`, 100, 75);
  doc.text(`Status: ${order.status}`, 100, 80);
  doc.text(`Payment Method: ${order.paymentMethod || 'Credit Card'}`, 100, 85);

 
  doc.setFillColor(...lightColor);
  doc.rect(14, 95, 85, 10, 'F');
  doc.rect(105, 95, 85, 10, 'F');
  doc.setTextColor(...secondaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("BILLING ADDRESS", 20, 101);
  doc.text("SHIPPING ADDRESS", 110, 101);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`${order.billingAddress?.billingCompanyName || ''}`, 14, 110);
  doc.text(`${order.billingAddress?.billingAddress}, ${order.billingAddress?.billingCity}`, 14, 115);
  doc.text(`${order.billingAddress?.billingState}, ${order.billingAddress?.billingZipCode}`, 14, 120);
  doc.text(`${order.billingAddress?.billingCountry}`, 14, 125);
  doc.text(`Phone: ${order.billingAddress?.billingPhone}`, 14, 130);

  doc.text(`${order.shippingAddress?.address}, ${order.shippingAddress?.city}`, 105, 110);
  doc.text(`${order.shippingAddress?.state}, ${order.shippingAddress?.zipCode}`, 105, 115);
  doc.text(`${order.shippingAddress?.country}`, 105, 120);
  doc.text(`Phone: ${order.shippingAddress?.phone}`, 105, 125);
  doc.text(`Email: ${order.shippingAddress?.email}`, 105, 130);

  // Divider line
  doc.setDrawColor(...lightColor);
  doc.line(14, 135, 195, 135);


  autoTable(doc, {
    startY: 140,
    head: [
      [
        { 
          content: 'Item', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        },
        { 
          content: 'Description', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        },
        { 
          content: 'Qty', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        },
        { 
          content: 'Unit Price', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        },
        { 
          content: 'Discount', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        },
        { 
          content: 'Total', 
          styles: { 
            fillColor: primaryColor,
            textColor: 255,
            fontStyle: 'bold'
          }
        }
      ]
    ],
    body: [
      [
        order.items.artwork.artworkName,
        `Artist: ${order.items.artwork.artistName}\nMaterial: ${order.items.artwork.inventoryShipping?.packageMaterial}\nYear: ${order.items.artwork.yearCreated}`,
        1,
        `${order.items.artwork.pricing.currency} ${order.items.artwork.pricing.basePrice.toFixed(2)}`,
        `${discountPercentage}%`,
        `${order.items.artwork.pricing.currency} ${(discountedPrice + parseFloat(taxAmount)).toFixed(2)}`
      ]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    styles: {
      cellPadding: 3,
      fontSize: 9,
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 30, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 15 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 }
    }
  });

  const finalY = doc.lastAutoTable.finalY || 160;

  
  doc.setFillColor(...lightColor);
  doc.rect(14, finalY + 10, 185, 10, 'F');
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("ORDER SUMMARY", 20, finalY + 16);

doc.setFont("helvetica", "normal");
doc.setTextColor(80, 80, 80);
const summaryStartY = finalY + 25;
const summaryCol1 = 130;
const summaryCol2 = 170;


const subtotal = order.items.artwork.pricing.basePrice;
const discountAmount = subtotal * (discountPercentage / 100);
const taxableAmount = subtotal - discountAmount;
const calculatedTax = taxableAmount * (taxPercentage / 100);
const shipping = order.shipping || 0;
const calculatedTotal = subtotal - discountAmount + calculatedTax + shipping;

doc.text("Subtotal:", summaryCol1, summaryStartY);
doc.text(`${order.items.artwork.pricing.currency} ${subtotal.toFixed(2)}`, summaryCol2, summaryStartY, { align: "left" });

doc.text(`Discount (${discountPercentage}%):`, summaryCol1, summaryStartY + 5);
doc.text(`${order.items.artwork.pricing.currency} ${discountAmount.toFixed(2)}`, summaryCol2, summaryStartY + 5, { align: "left" });

doc.text(`Tax (${taxPercentage}%):`, summaryCol1, summaryStartY + 10);
doc.text(`${order.items.artwork.pricing.currency} ${calculatedTax.toFixed(2)}`, summaryCol2, summaryStartY + 10, { align: "left" });

   doc.text("Shipping:", summaryCol1, summaryStartY + 15);
   doc.text(`${order.items.artwork.pricing.currency} ${shipping.toFixed(2)}`, summaryCol2, summaryStartY + 15, { align: "left" });


  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("Total Amount:", summaryCol1, summaryStartY + 25);
  doc.text(`${order.items.artwork.pricing.currency} ${calculatedTotal.toFixed(2)}`, summaryCol2, summaryStartY + 25, { align: "left" });


  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Package Details:", 14, summaryStartY + 40);
  doc.text(`Dimensions: ${order.items.artwork.inventoryShipping?.packageLength} × ${order.items.artwork.inventoryShipping?.packageWidth} × ${order.items.artwork.inventoryShipping?.packageHeight} cm`, 14, summaryStartY + 45);
  doc.text(`Weight: ${order.items.artwork.inventoryShipping?.packageWeight} kg`, 14, summaryStartY + 50);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for choosing FreshArt Club for your premium art purchase.", 105, 280, { align: "center" });
  doc.text("For any inquiries, please contact freshartclub@gmail.com", 105, 285, { align: "center" });
  doc.text(`© ${new Date().getFullYear()} FreshArt Club. All rights reserved.`, 105, 290, { align: "center" });


  doc.save(`FreshArt_Invoice_${order.orderId}.pdf`);
};




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