import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { MdDelete, MdUpload } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import Api from "../common";
import { toast } from "react-toastify";

interface ProductDetails {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
}

interface EditProductProps {
  onClose: () => void;
  data: ProductDetails;
  fetchProducts: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ onClose, data, fetchProducts}) => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    ...data,
    productName: data?.productName,
    brandName: data?.brandName,
    category: data?.category,
    productImage: data?.productImage,
    description: data?.description || "",
    price: data?.price,
    sellingPrice: data?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState<boolean>(false);
  const [fullScreenImage, setFullScreenImage] = useState<string>("");

  const updateProductDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resData = await fetch(Api.updateProduct.url, {
      method: Api.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productDetails),
    });

    const data = await resData.json();

    if (data.success) {
      toast.success(data.message);
      onClose();
      fetchProducts();
    } else {
      toast.error(data.message);
    }
  };

  const handleUploadProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadImageCloudinary = await uploadImage(file);

      setProductDetails((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    }
  };

  const handleDeleteProductImage = (index: number) => {
    const newProductImage = [...productDetails.productImage];
    newProductImage.splice(index, 1);

    setProductDetails((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
  };

  return (
    <div className="fixed top-6 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-10">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[60%] overflow-hidden">
        <div className="flex justify-between text-2xl">
          <div className="text-lg font-bold px-4 font-poppins">Edit Product Details:</div>
          <IoIosCloseCircle onClick={onClose} className="cursor-pointer hover:text-red-600 transition-all" />
        </div>
        <form className="pb-8 my-4 text-base font-dmsans -mr-2 px-4 grid overflow-y-scroll h-[90%] gap-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={productDetails.productName}
            onChange={updateProductDetails}
            className="px-4 py-1 border rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Brand Name"
            name="brandName"
            value={productDetails.brandName}
            onChange={updateProductDetails}
            className="px-4 py-1 border rounded-md"
            required
          />

          <select
            required
            name="category"
            value={productDetails.category}
            onChange={updateProductDetails}
            className="px-3 py-1 border rounded-md"
          >
            <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
              <option key={el.value + index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="uploadImage">
            <div className="w-full h-32 border rounded-md flex flex-col items-center justify-center cursor-pointer">
              <MdUpload size={40} />
              <div>Upload Product Image</div>
              <input type="file" id="uploadImage" onChange={handleUploadProductImage} className="hidden" />
            </div>
          </label>

          <div>
            {productDetails?.productImage[0] ? (
              <div className="flex items-center gap-x-3">
                {productDetails.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt="el"
                      className="h-28 cursor-pointer border p-2 rounded-xs"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 cursor-pointer text-white p-0.5 m-1 bg-red-500 border rounded-full hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-400 -mt-4">* Please upload product image *</p>
            )}
          </div>

          <input
            required
            type="number"
            placeholder="Price"
            name="price"
            value={productDetails.price}
            onChange={updateProductDetails}
            className="px-4 py-1 border rounded-md"
          />

          <input
            required
            type="number"
            placeholder="Selling Price"
            name="sellingPrice"
            value={productDetails.sellingPrice}
            onChange={updateProductDetails}
            className="px-4 py-1 border rounded-md"
          />

          <textarea
            placeholder="Description"
            name="description"
            value={productDetails.description}
            onChange={updateProductDetails}
            className="px-4 resize-none h-28 py-1 border rounded-md"
          />

          <button type="submit" className="py-2.5 border-2 border-red-500 bg-red-500 hover:bg-white hover:text-red-500 transition-all text-white rounded-xl font-semibold text-lg font-inria">
            Update Product
          </button>
        </form>
      </div>
      {openFullScreenImage && <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />}
    </div>
  );
};

export default EditProduct;
