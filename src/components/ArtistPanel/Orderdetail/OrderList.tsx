const OrderList = ({ order }: any) => {
  const grandTotal =
    parseFloat(order.totle) +
    parseFloat(order.vat) +
    parseFloat(order.shippingrate);

  return (
    <div className="">
      <h2 className="text-[18px] text-black font-semibold p-5">Order List</h2>
      <>
        <div className="grid grid-cols-6 bg-gray-50 p-5">
          <div className="col-span-2 ">
            <h2 className="text-[16px] font-bold ">Product</h2>
          </div>
          <div>
            <h2 className="text-[16px] font-bold">SKU</h2>
          </div>
          <div>
            <h2 className="text-[16px] font-bold">QTY</h2>
          </div>
          <div>
            <h2 className="text-[16px] font-bold">Price</h2>
          </div>
          <div>
            <h2 className="text-[16px] font-bold">Total</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-6 bg-white p-5">
          <div className="col-span-2 flex gap-2">
            <div>
              <img
                src={order.image}
                alt="product image"
                className="w-[2em] h-[2.5em] rounded-xl"
              />
            </div>
            <div>
              <p className="text-black font-bold text-[12px] md:text-[14px]">
                {order.artname}
              </p>
              <p className="text-[10px] md:text-[14px]">{order.color}</p>
            </div>
          </div>
          <div className="grid-cols-1">
            <h2 className="text-[14px] text-[#FF536B] font-semibold">
              {order.Orderid}
            </h2>
          </div>
          <div className="grid-cols-1">
            <p className="text-[14px] font-semibold">{order.qty}</p>
          </div>
          <div className="grid-cols-1">
            <p className="text-[14px] font-semibold">${order.price}</p>
            <p className="text-[14px] text-black font-semibold pt-7">
              Subtotal
            </p>
            <p className="text-[14px] text-black font-semibold pt-7">VAT(0%)</p>
            <p className="text-[14px] text-black font-semibold pt-7">
              Shipping Rate
            </p>
            <p className="text-[14px] text-black font-semibold pt-7">
              Grand Total
            </p>
          </div>

          <div className="grid-cols-1">
            <p className="text-[14px] font-semibold">${order.totle}</p>
            <p className="text-[14px] text-black font-semibold pt-7">
              ${order.totle}
            </p>
            <p className="text-[14px] text-black font-semibold pt-7">
              ${order.vat}
            </p>
            <p className="text-[14px] text-black font-semibold pt-7">
              ${order.shippingrate}
            </p>
            <p className="text-[14px] text-black font-semibold pt-7">
              ${grandTotal}
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default OrderList;