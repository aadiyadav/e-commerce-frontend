import { useContext, useEffect, useState } from "react"
import Api from "../common"
import Context from "../context"
import displayINRCurrency from "../helpers/displayCurrency"
import { MdDelete } from "react-icons/md";

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingData = useState(new Array(context?.cartCount).fill(null))

    const fetchData = async() => {
      const res = await fetch(Api.showCart.url, {
        method: Api.showCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      })
      const resData = await res.json()

      if (resData.success){
        setData(resData.data)
      }
    }
    
    const handleLoading = async() =>{
      await fetchData()
    }

    useEffect(() => {
      setLoading(true)
      handleLoading()
      setLoading(false)
    }, [])

    const updateProduct = async (id, qty, op) => {
      if (qty > 1 || op=== "+"){
        const res = await fetch(Api.updateCart.url, {
        method: Api.updateCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id : id,
          quantity: op === "+" ? qty+1 : qty-1
        })
      })
      const resData = await res.json()
      // console.log(resData)
      if (resData.success){
        fetchData()
      }
      }
    }

    const deleteProduct = async (id) => {
      const res = await fetch(Api.deleteFromCart.url,{
        method: Api.deleteFromCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id
        })
      })
      const resData = await res.json()

      if (resData.success){
        fetchData()
        context?.cartCountFunc()
      }
    }

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr?.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className="md:px-20 px-4 py-4">
      {
        data.length === 0 && !loading && 
          <div className="w-full h-[715px] py-auto flex justify-center items-center text-center text-3xl bg-slate-100">
            Your cart is feeling lonely :(
          </div>
      }
    { data.length!==0 &&
      <div>
      <div className="text-center md:text-5xl text-2xl font-bold md:pt-5 md:pb-8 py-2 ">YOUR CART</div>
      <div className="flex md:flex-row flex-col gap-x-14 min-h-[70vh]">
      <div className="md:w-2/3 w-full">
      {
        loading ? (
          loadingData.map((el, index) => {
            return (<div key={index} className="w-full rounded md:h-32 h-28 my-3 bg-slate-100 animate-pulse">{el}</div>)
          })
        ) : (
          data.map((el, index) => {
            return (<div key={index} className="rounded md:h-32 h-28 my-3 flex justify-between bg-white border shadow">
              <div className="flex w-full">
                <div className="md:min-w-36 min-w-24 h-full bg-slate-100">
                  <img src={el?.productId?.productImage[0]} className="p-1 w-full h-full object-contain bg-slate-100 bg-blend-multiply" alt="" />
                </div>
                <div className="h-full w-0.5 bg-slate-300"></div>
                <div className="flex md:flex-row flex-col justify-between w-full md:px-6 px-2 md:py-2 py-1">
                  <div className="w-full  ">
                    <div className="md:text-xl text-base/4 font-semibold line-clamp-2">{el?.productId?.productName}</div>
                    <div className="capitalize md:text-base text-xs font-light">{el?.productId?.category}</div>
                    <div className="flex flex-wrap items-center md:text-lg text-sm/3 md:gap-2 gap-1 md:pt-6 pt-1 font-normal">
                      <div>{displayINRCurrency(el?.productId?.sellingPrice)}</div>
                      <div className="text-xs">X</div>
                      <div>{el?.quantity}</div>
                      <div>=</div>
                      <div className="text-red-600 font-semibold">{displayINRCurrency(el?.productId?.sellingPrice * el?.quantity)}</div>
                    </div>
                  </div>
                  <div className="flex md:flex-col flex-row-reverse h-full items-end justify-between md:pb-3 pb-1">
                    {/* <div> */}
                      <MdDelete onClick={() => deleteProduct(el?._id)} className="text-2xl mt-1 text-zinc-400 hover:text-zinc-600 hover:border-zinc-600 transition-all cursor-pointer mx-1 border rounded-full p-0.5"/>
                    {/* </div> */}
                    <div className="flex gap-1 border rounded-full bg-white text-red-400 md:h-6 h-5 font-bold">
                      <div className="w-4 md:w-6 flex justify-center pt-5 items-end cursor-pointer hover:bg-red-400 hover:text-white transition-all rounded-l-full" onClick={() => updateProduct(el?._id, el?.quantity, "-")}>-</div>
                      <div className="w-4 md:w-6 flex md:items-center items-end md:py-0 pt-5 justify-center">{el?.quantity}</div>
                      <div className="w-4 md:w-6 flex justify-center cursor-pointer md:py-0 pt-5 items-end hover:bg-red-400 hover:text-white transition-all rounded-r-full" onClick={() => updateProduct(el?._id, el?.quantity, "+")}>+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          })
        )
      }
      </div>
      <div className="md:w-1/3 w-full h-full border rounded shadow my-3 p-0.5">
        <div className="bg-red-400 px-3 py-2 font-bold rounded mb-0.5 text-white md:text-2xl text-lg text-center">Summary</div>
        <div className="px-3 py-10 rounded bg-slate-100 h-full md:text-lg text-base">
          <div className="flex font-semibold justify-between relative pb-2">
            <div>Quantity</div>
            <div className="absolute w-full text-center">:</div>
            <div className="text-red-600">{totalQty}</div>
          </div>
          <div className="flex font-semibold justify-between relative">
            <div>Price</div>
            <div className="absolute w-full text-center">:</div>
            <div className="text-red-600">{displayINRCurrency(totalPrice)}</div>
          </div>
        </div>
        <div className="px-5 bg-slate-100 pb-4">
          <button className="w-full bg-red-600 text-white rounded-xl py-3 border font-bold border-red-600 hover:text-red-600 hover:bg-white transition-all">Payment</button>
        </div>
      </div>
      </div>
    </div>
    }
    </div>
  )
}

export default Cart