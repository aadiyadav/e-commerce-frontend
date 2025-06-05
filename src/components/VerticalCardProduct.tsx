import { useEffect, useRef, useState } from "react";
import fetchCategory from "../helpers/fetchCategory";
import displayINRCurrency from "../helpers/displayCurrency";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
}

interface VerticalCardProductProps {
  category: string;
  heading: string;
}

const VerticalCardProduct: React.FC<VerticalCardProductProps> = ({ category, heading }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const loadingList = new Array(13).fill("Have some patience...");
  const scrollElement = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategory(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  const getScrollAmount = (window.innerWidth < 768 ? 210 : 310);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollTo({
        left: scrollElement.current.scrollLeft + getScrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollTo({
        left: scrollElement.current.scrollLeft - getScrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="md:px-6 lg:px-10 px-4 py-4">
      <div className="md:text-2xl md:ml-6 ml-4 font-semibold px-4 font-poppins text-bluelogo">{heading}</div>
      <div className="flex items-center md:pt-3 pt-2 relative">
        <div className="flex justify-between w-full absolute md:text-3xl text-2xl">
          <div className="cursor-pointer" onClick={scrollLeft}><IoIosArrowDropleftCircle className="rounded-full text-bluelogo" /></div>
          <div className="cursor-pointer" onClick={scrollRight}><IoIosArrowDroprightCircle className="rounded-full text-bluelogo" /></div>
        </div>
        <div className="flex items-center gap-5 overflow-x-scroll scrollbar-none md:mx-10 mx-8" ref={scrollElement}>
          {loading ? (
            loadingList.map((el, index) => (
              <div key={index} className="md:h-80 h-52 min-w-64 bg-white animate-pulse">
                {el}
              </div>
            ))
          ) : (
            data.map((el) => (
              <Link to={'/product/' + el._id} key={el._id} className="shadow-sm border-2 border-slate-400 rounded-md">
                <div className="flex justify-center mx-auto md:h-56 h-32 md:w-72 w-40 items-center rounded-t-md border-gray-300 mix-blend-multiply md:p-4 p-2">
                  <img src={el.productImage[0]} alt="" className="h-full hover:scale-110 transition-all mix-blend-multiply object-contain" />
                </div>
                <div className="h-0.5 bg-gray-300 mx-4"></div>
                <div className="md:p-3 p-2 md:h-32 h-20 md:w-72 w-48 flex flex-col justify-between md:text-base text-xs rounded-b-md">
                  <div className="flex flex-col">
                    <div className="md:text-lg/6 text-sm text-ellipsis md:line-clamp-2 line-clamp-1 font-semibold font-roboto">{el.productName}</div>
                    <div className="text-bluelogo capitalize text-sm font-merri">{el.category}</div>
                  </div>
                  <div className="flex gap-1 py-1 font-mont">
                    <div className="font-medium">{displayINRCurrency(el.sellingPrice)}</div>
                    <div className="line-through font-light text-gray-500">{displayINRCurrency(el.price)}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCardProduct;
