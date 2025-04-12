import { useEffect, useState } from "react"
import UploadProduct from "../components/UploadProduct"
import Api from "../common"
import AdminProductCard from "../components/AdminProductCard"


const AllProducts = () => {

  const [openUpload, setOpenUpload] = useState(false)
  
  const [allProducts, setAllProducts] = useState([])

  const getAllProducts = async() => {
    const res = await fetch(Api.getProducts.url)
    const data = await res.json()

    setAllProducts(data?.data)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="px-4 py-4 m-4 bg-white rounded-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl font-poppins">All Products</h2>
          <button className="rounded-full px-4 py-1 bg-red-500 text-white border border-red-500 hover:bg-white hover:text-red-500 font-inria"
          onClick={() => setOpenUpload(true)}>Upload Product</button>
        </div>
        <div className="flex flex-wrap h-[calc(100vh-250px)] overflow-y-scroll my-8 py-2 gap-4 lg:px-16">
        {
          allProducts.map((product, index) => {
            return (
              <AdminProductCard key={index} product={product} fetchProducts={getAllProducts} />
            )
          })
        }
        </div>
        {openUpload && <UploadProduct onClose={() => setOpenUpload(false)} />}
    </div>
  )
}

export default AllProducts