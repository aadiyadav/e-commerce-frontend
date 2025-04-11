import { useNavigate, useParams } from "react-router-dom";
import Api from "../common";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import displayINRCurrency from "../helpers/displayCurrency";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbReplaceFilled } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { HiReceiptTax } from "react-icons/hi";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

interface ProductData {
  _id: string,
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  sellingPrice: number;
}

const ProductDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductData>({
    _id: "",
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<boolean>(false);

  const loadingImages = new Array(4).fill(null);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchDetails = async () => {
    setLoading(true);
    const res = await fetch(Api.productDetails.url, {
      method: Api.productDetails.method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const resData = await res.json();
    setData(resData.data);
  };

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params]);
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { cartCountFunc } = context;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleAddToCart = async (id: string) => {
    await addToCart(id);
    cartCountFunc();
  };

  const handleBuy = async (id: string) => {
    await addToCart(id);
    cartCountFunc();
    navigate('/cart');
  };

  return (
    <div className="lg:py-16 md:py-10 py-4">
      <div className="flex md:flex-row flex-col-reverse md:px-10 lg:px-16 px-4">
        <div className="flex md:block md:overflow-auto overflow-x-scroll scrollbar-none gap-2 max-w-full min-w-fit">
          {
            loading ? (
              loadingImages.map((el, index) => {
                return (
                  <div key={index} className="w-20 h-20 my-3 bg-slate-200">
                    {el}
                  </div>
                );
              })) : (
              data?.productImage.map((el, index) => {
                return (
                  <div key={index} onMouseOver={() => handleImageClick(index)} className="md:w-20 w-14 md:my-3 p-0.5 cursor-pointer mix-blend-multiply border shadow-sm flex justify-center items-center">
                    <img src={el} alt={"Image" + index} className="w-full h-full" />
                  </div>
                );
              })
            )
          }
        </div>
        <div className="my-3 md:mx-6 md:w-5/12 flex items-center border-2 rounded-sm mix-blend-multiply overflow-hidden">
          <div className="carousel flex mx-auto" style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}>
            {data?.productImage.map((image, index) => (
              <img key={index} src={image} className="md:p-4 p-1 max-h-[calc(100vh-200px)] h-full cursor-pointer" alt={`Image`} onClick={() => setZoomImage(true)} />
            ))}
          </div>
        </div>
        {
          zoomImage &&
            <div className="absolute hidden w-full h-full top-0 left-0 md:mt-8 md:flex justify-center items-center bg-slate-200 bg-opacity-70" onClick={() => setZoomImage(false)}>
              <img src={data?.productImage[selectedImageIndex]} className="h-[700px] bg-white p-4" alt="" />
            </div>
        }
        <div className="py-10 px-6 md:w-1/2 w-full md:block hidden">
          <div className="text-sm flex items-center my-5 font-dmsans">
            {<FaStar size={18} className="text-yellow-300 mr-1.5 mb-0.5" />}
            <div className="mx-2 font-semibold">4.7</div>
            <div>(114</div>
            <div className="ml-0.5 text-green-700 text-base pb-0.5"><RiVerifiedBadgeFill /></div>
            <div>)</div>
          </div>
          <div className="text-3xl font-medium font-poppins">{data?.productName}</div>
          <div className="my-3 md:text-base text-sm w-full text-zinc-800 font-extralight font-merri">{data?.description}</div>
          <div className="text-zinc-600 text-lg font-bold flex gap-1 font-inria">
            <div>Brand:</div>
            <div className="font-medium">{data?.brandName}</div>
          </div>
          <div className="flex gap-3 mt-14 text-3xl items-center font-mont">
            <div className="font-medium">{displayINRCurrency(data?.sellingPrice)}</div>
            <div className="line-through font-light text-zinc-600 text-xl">{displayINRCurrency(data?.price)}</div>
          </div>
          <div className="mb-16 mx-4 font-light text-gray-800 font-roboto">MRP (inclusive of all taxes)</div>
          <div className="flex justify-between gap-4 items-center font-inria font-semibold">
            <button className="py-2 w-72 border border-red-700 rounded-xl text-white bg-red-700" onClick={() => handleBuy(data?._id)}>Buy Now</button>
            <button className="py-2 w-72 border border-red-700 rounded-xl text-red-700" onClick={() => handleAddToCart(data?._id)}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="my-6 w-full md:hidden block md:px-10 lg:px-16 px-4">
        <div className="text-sm flex items-center my-2 font-dmsans">
        {<FaStar size={18} className="text-yellow-300 mr-1.5 mb-1" />}
          <div className="mx-2 font-semibold">4.7</div>
          <div>(114</div>
          <div className="mx-0.5 text-green-700 text-base mb-0.5"><RiVerifiedBadgeFill /></div>
          <div>)</div>
        </div>
        <div className="text-2xl font-medium font-poppins">{data?.productName}</div>
        <div className="my-1 md:text-base text-sm w-full font-extralight font-merri">{data?.description}</div>
        <div className="text-zinc-600 font-bold flex mt-2 mb-6 gap-1 font-inria">
            <div>Brand:</div>
            <div className="font-medium">{data?.brandName}</div>
          </div>
          <div className="flex gap-2 text-2xl items-center font-mont">
            <div className="font-medium">{displayINRCurrency(data?.sellingPrice)}</div>
            <div className="line-through font-light text-zinc-600 text-lg">{displayINRCurrency(data?.price)}</div>
          </div>
          <div className="mb-6 mx-2 font-light text-sm text-gray-800 font-roboto">MRP (inclusive of all taxes)</div>
          <div className="flex md:flex-row flex-col gap-4 justify-between items-center font-inria font-semibold">
            <button className="py-2 w-72 border border-red-700 rounded-xl text-white bg-red-700" onClick={() => handleBuy(data?._id)}>Buy Now</button>
            <button className="py-2 w-72 border border-red-700 rounded-xl text-red-700" onClick={() => handleAddToCart(data?._id)}>Add to Cart</button>
          </div>
      </div>
      <div className="h-0.5 bg-zinc-400 md:my-12 my-8 md:mx-10 lg:mx-16 mx-4"></div>
      <div className="flex flex-wrap gap-y-6 md:gap-x-32 sm:gap-x-16 gap-x-10 justify-center items-center md:my-10 my-4 md:px-10 lg:px-16 px-4 md:text-6xl text-5xl font-poppins">
        <div className="min-w-48">
          <div className="text-white max-w-min mx-auto bg-zinc-600 rounded-md p-2"><AiFillSafetyCertificate/></div>
          <div className="md:text-xl text-sm md:my-4 my-1 flex gap-1 justify-center">
            <div className="font-bold">1 Year</div>
            <div className="font-medium">Warranty</div>
          </div>
        </div>
        <div className="min-w-48">
          <div className="text-white max-w-min mx-auto bg-zinc-600 rounded-md p-2"><TbReplaceFilled/></div>
          <div className="md:text-xl text-sm md:my-4 my-1 flex gap-1 justify-center">
            <div className="font-bold">7 - Day</div>
            <div className="font-medium">Replacement*</div>
          </div>
        </div>
        <div className="min-w-48">
          <div className="text-white max-w-min mx-auto bg-zinc-600 rounded-md p-2"><HiReceiptTax/></div>
          <div className="md:text-xl text-sm md:my-4 my-1 flex gap-1 justify-center">
            <div className="font-bold">GST</div>
            <div className="font-medium">Billing</div>
          </div>
        </div>
        <div className="min-w-48">
          <div className="text-white max-w-min mx-auto bg-zinc-600 rounded-md p-2"><FaTruckFast/></div>
          <div className="md:text-xl text-sm md:my-4 my-1 flex gap-1 justify-center">
            <div className="font-bold">Free Express</div>
            <div className="font-medium">Delivery*</div>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-zinc-400 md:mx-10 lg:mx-16 mx-4"></div>
      {data.category && <div className="md:pt-6 pt-0">
        <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} sortBy={"asc"} />
        <VerticalCardProduct category={"mobiles"} heading={"See Something Related"} />
      </div>}
    </div>
  );
}

export default ProductDetails;
