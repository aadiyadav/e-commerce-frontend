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

interface HorizontalCardProductProps {
  category: string;
  heading: string;
}

const HorizontalCardProduct: React.FC<HorizontalCardProductProps> = ({ category, heading }) => {
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

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollTo({
        left: scrollElement.current.scrollLeft + 220,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollTo({
        left: scrollElement.current.scrollLeft - 220,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="lg:px-10 md:px-6 px-4 py-4">
      <div className="md:text-2xl font-semibold px-4 md:ml-6 ml-4 font-poppins text-bluelogo">{heading}</div>
      <div className="flex items-center md:pt-3 pt-2 relative">
        <div className="flex justify-between w-full absolute md:text-3xl text-2xl bg-orange">
          <div className="cursor-pointer" onClick={scrollLeft}><IoIosArrowDropleftCircle className="rounded-full text-bluelogo" /></div>
          <div className="cursor-pointer" onClick={scrollRight}><IoIosArrowDroprightCircle className="rounded-full text-bluelogo" /></div>
        </div>
        <div className="md:mx-10 mx-8 flex items-center gap-5 overflow-x-scroll scrollbar-none" ref={scrollElement}>
          {loading ? (
            loadingList.map((el, index) => (
              <div key={index} className="h-32 min-w-64 bg-white animate-pulse">
                {el}
              </div>
            ))
          ) : (
            data.map((el) => (
              <Link to={'/product/' + el._id} key={el._id} className="flex shadow-sm border-2 border-slate-400 rounded-md">
                <div className="flex justify-center md:h-32 h-20 md:w-32 w-20 items-center rounded-l-md border-gray-300 mix-blend-multiply md:p-4 p-2">
                  <img src={el.productImage[0]} alt="" className="w-full h-full hover:scale-125 transition-all mix-blend-multiply object-contain" />
                </div>
                <div className="w-[1px] bg-gray-300 my-3"></div>
                <div className="md:p-3 p-2 md:h-32 h-20 md:min-w-44 md:max-w-48 min-w-28 max-w-36 flex flex-col justify-between md:text-base text-xs rounded-r-md">
                  <div className="flex flex-col ">
                    <div className="md:text-lg/6 text-sm text-ellipsis md:line-clamp-2 line-clamp-1 font-semibold font-roboto">{el?.productName}</div>
                    <div className="text-bluelogo capitalize text-sm font-merri">{el.category}</div>
                  </div>
                  <div className="flex gap-1 py-1 font-mont">
                    <div className="font-medium">{displayINRCurrency(el.sellingPrice)}</div>
                    <div className="line-through font-light text-zinc-500">{displayINRCurrency(el.price)}</div>
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

export default HorizontalCardProduct;
