import { useContext, useEffect, useState } from "react";
import Api from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  quantity: number;
  productId: {
    productImage: string[];
    productName: string;
    category: string;
    sellingPrice: number;
  };
}

const Cart = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(Context);
  const loadingData = new Array(13).fill(null)

  const fetchData = async () => {
    const res = await fetch(Api.showCart.url, {
      method: Api.showCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const resData = await res.json();

    if (resData.success) {
      setData(resData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const updateProduct = async (id: string, qty: number, op: string) => {
    if (qty > 1 || op === "+") {
      const res = await fetch(Api.updateCart.url, {
        method: Api.updateCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: op === "+" ? qty + 1 : qty - 1,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        fetchData();
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(Api.deleteFromCart.url, {
      method: Api.deleteFromCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const resData = await res.json();

    if (resData.success) {
      fetchData();
      context?.cartCountFunc();
    }
  };

  const handlePayment = () => {
    toast.success("Order placed successfully!")
  }

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce((prev, curr) => prev + (curr?.quantity * curr?.productId?.sellingPrice), 0);

  return (
    <div className="md:px-20 px-4 py-4">
      {data.length === 0 && !loading && (
        <div className="w-full h-[715px] py-auto flex justify-center font-dmsans items-center text-center text-3xl bg-slate-100">
          Your cart is feeling lonely :(
        </div>
      )}
      {data.length !== 0 && (
        <div>
          <div className="text-center md:text-6xl text-4xl font-bold font-teko md:pt-5 md:pb-8 py-2 text-bluelogo">YOUR CART</div>
          <div className="flex md:flex-row flex-col gap-x-14 min-h-[70vh]">
            <div className="md:w-2/3 w-full">
              {loading ? (
                loadingData.map((el, index) => (
                  <div key={index} className="w-full rounded md:h-32 h-28 my-3 bg-slate-100 animate-pulse">{el}</div>
                ))
              ) : (
                data.map((el, index) => (
                  <div key={index} className="rounded md:h-32 h-28 my-3 p-1 flex justify-between bg-white border border-slate-500 shadow">
                    <div className="flex w-full">
                      <div className="md:min-w-36 min-w-24 h-full bg-slate-100">
                        <img src={el?.productId?.productImage[0]} className="p-1 w-full h-full object-contain bg-slate-100 bg-blend-multiply" alt="" />
                      </div>
                      <div className="h-full w-0.5 bg-slate-300 ml-1"></div>
                      <div className="flex md:flex-row flex-col justify-between w-full md:px-6 px-2 md:py-2 py-1">
                        <div className="w-full">
                          <div className="md:text-xl text-base/4 font-medium line-clamp-2 font-roboto">{el?.productId?.productName}</div>
                          <div className="capitalize md:text-base text-xs font-light text-bluelogo font-merri">{el?.productId?.category}</div>
                          <div className="flex flex-wrap items-center md:text-2xl text-lg md:gap-2 gap-1 md:pt-6 pt-1 font-normal font-teko">
                            <div>{displayINRCurrency(el?.productId?.sellingPrice)}</div>
                            <div>x</div>
                            <div>{el?.quantity}</div>
                            <div>=</div>
                            <div className="font-medium">{displayINRCurrency(el?.productId?.sellingPrice * el?.quantity)}</div>
                          </div>
                        </div>
                        <div className="flex md:flex-col flex-row-reverse h-full items-end justify-between md:pb-3 pb-1">
                          <MdDelete onClick={() => deleteProduct(el?._id)} className="text-2xl mt-1 text-zinc-500 hover:text-zinc-700 hover:border-zinc-700 transition-all cursor-pointer mx-1 border rounded-full p-0.5" />
                          <div className="flex md:gap-1 border rounded-full md:h-6 h-5 font-semibold font-poppins">
                            <div className="w-6 flex justify-center items-center cursor-pointer hover:bg-orange-400 md:bg-white bg-orange-400 text-white md:text-orange-400 hover:text-white transition-all rounded-l-full" onClick={() => updateProduct(el?._id, el?.quantity, "-")}>-</div>
                            <div className="w-6 flex items-center justify-center text-orange-400">{el?.quantity}</div>
                            <div className="w-6 flex justify-center cursor-pointer items-center hover:bg-orange-400 md:bg-white bg-orange-400 text-white md:text-orange-400 hover:text-white transition-all rounded-r-full" onClick={() => updateProduct(el?._id, el?.quantity, "+")}>+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="md:w-1/3 w-full h-full border border-slate-400 rounded shadow my-3 p-0.5">
              <div className="bg-bluelogo px-3 py-2 font-bold font-mont rounded mb-0.5 text-white md:text-2xl text-lg text-center">Summary</div>
              <div className="px-3 py-10 font-dmsans rounded bg-slate-100 h-full md:text-lg text-base">
                <div className="flex font-semibold justify-between relative pb-2">
                  <div>Quantity</div>
                  <div className="absolute w-full text-center">:</div>
                  <div>{totalQty}</div>
                </div>
                <div className="flex font-semibold justify-between relative text-bluelogo">
                  <div>Price</div>
                  <div className="absolute w-full text-center">:</div>
                  <div>{displayINRCurrency(totalPrice)}</div>
                </div>
              </div>
              <div className="px-5 bg-slate-100 pb-4">
                <Link to={'/'} onClick={handlePayment}>
                <button className="w-full cursor-pointer text-lg font-merri bg-orange-400 text-white rounded-xl py-3 border font-bold border-orange-400 hover:text-orange-400 hover:bg-white transition-all">
                  Payment
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;