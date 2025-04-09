import { useEffect, useState } from "react"
import Api from "../common"
import { Link } from "react-router-dom"

interface ProductDetails {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
}

const CategoryList = () => {

  const [categoryProduct, setCategoryProduct] = useState<ProductDetails[]>([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const res = await fetch(Api.categoryProduct.url)
    const data = await res.json()
    setLoading(false)
    setCategoryProduct(data.data)
  }

  useEffect( () => {
    fetchCategoryProduct()
  }, [])

  return (
    <div className="md:p-4 py-4">
      <div className="flex justify-between gap-4 overflow-scroll scrollbar-none px-4">
      {
        loading ? (
          categoryLoading.map((el, index) => {
            return <div key={index} className="rounded-full md:p-12 p-7 mb-6 bg-slate-100 animate-pulse">{el}</div>
          })
        ) : (
        categoryProduct.map((product, index) => {
          return(
            <Link to={"/product-category/"+product?.category} className="cursor-pointer" key={index}>
              <div className="md:w-24 md:h-24 w-14 h-14 rounded-full border-2 border-gray-300 p-3 flex items-center justify-center">
                <img src={product?.productImage[0]} alt={product?.category} className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all overflow-hidden" />
              </div>
              <div className="text-center capitalize md:text-lg text-xs font-inria">{product?.category}</div>
            </Link>
          )
        })
      )}
      </div>
    </div>
  )
}

export default CategoryList