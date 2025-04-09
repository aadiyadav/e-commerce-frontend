import { useState } from "react"
import { MdModeEdit } from "react-icons/md"
import EditProduct from "../components/EditProduct"
import displayINRCurrency from '../helpers/displayCurrency';

interface Product {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
}

interface AdminProductCardProps {
  product: Product;
  fetchProducts: () => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, fetchProducts }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    <div className="w-40 border relative shadow-md shadow-zinc-300 p-2 hover:bg-gray-100 transition-all duration-150 cursor-pointer rounded-md">
      <div className="h-36 flex justify-center items-center my-2">
        <img src={product?.productImage[0]} alt="" className="mx-auto max-h-full mix-blend-multiply" />
      </div>
      <div className="text-ellipsis line-clamp-2 mx-1 font-semibold font-roboto">{product?.productName}</div>
      <div className="flex justify-between font-mont">
        <p className='font-medium mx-1'>
          {
            displayINRCurrency(product.sellingPrice)
          }
        </p>
        <div className="absolute right-0 bottom-0 m-1.5">
        <MdModeEdit
          className="p-1 border transition-all bg-red-300 hover:bg-red-500 text-white rounded-full text-2xl"
          onClick={() => setOpenEdit(true)}
        />
        </div>
      </div>
        {
          openEdit && 
          <EditProduct data={product} onClose={() => setOpenEdit(false)} fetchProducts={fetchProducts} />
        }
    </div>
  )
}

export default AdminProductCard