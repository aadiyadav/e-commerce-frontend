import { toast } from "react-toastify"
import Api from "../common"

async function addToCart (id){
    const res = await fetch(Api.addToCart.url,{
        method: Api.addToCart.method,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({productId: id})
    })

    const resData = await res.json()

    if (resData?.success){
        toast.success(resData?.message)
    }
    else toast.error(resData?.message)
    return resData
}

export default addToCart