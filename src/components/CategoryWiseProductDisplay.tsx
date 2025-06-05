import { useEffect, useState } from "react";
import fetchCategory from "../helpers/fetchCategory";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
}

interface CategoryWiseProductDisplayProps {
  category: string;
  heading: string;
  sortBy: string // Assuming sortBy can be either 'asc' or 'dsc'
}

const CategoryWiseProductDisplay: React.FC<CategoryWiseProductDisplayProps> = ({ category, heading, sortBy }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const loadingList = new Array(13).fill("Have some patience...");

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategory(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  const handleOnChangeSortBy = () => {
    if (sortBy === 'asc') {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    handleOnChangeSortBy();
  }, [sortBy]);

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="py-4 w-full md:px-6 lg:px-10 px-4">
      <div className="md:text-2xl md:ml-6 ml-4 font-semibold px-4 font-poppins">{heading}</div>
      <div className="md:py-6 py-4 grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] justify-around items-center md:gap-8 gap-4 md:px-6 px-10">
        {
          loading ? (
            loadingList.map((el, index) => (
              <div key={index} className="md:h-80 h-52 min-w-64 bg-white animate-pulse">
                {el}
              </div>
            ))
          ) : (
            data.map((el) => (
              <Link to={'/product/' + el._id} key={el._id} className="shadow-sm border-2 border-slate-400 rounded-md bg-white">
                <div className="flex justify-center mx-auto md:h-56 h-32 w-full items-center rounded-t-md border-gray-300 mix-blend-multiply md:p-4 p-2">
                  <img src={el.productImage[0]} alt="" className="h-full hover:scale-110 transition-all mix-blend-multiply object-contain" />
                </div>
                <div className="h-0.5 bg-gray-300 mx-4"></div>
                <div className="md:p-3 p-2 md:h-32 h-20 flex flex-col justify-between md:text-base text-xs rounded-b-md">
                  <div className="flex flex-col">
                    <div className="md:text-lg text-sm text-ellipsis line-clamp-1 font-semibold font-roboto">{el.productName}</div>
                    <div className="text-bluelogo capitalize font-merri">{el.category}</div>
                  </div>
                  <div className="flex gap-2 py-1 font-mont">
                    <div className="font-medium">{displayINRCurrency(el.sellingPrice)}</div>
                    <div className="line-through font-light text-zinc-500">{displayINRCurrency(el.price)}</div>
                  </div>
                </div>
              </Link>
            ))
          )
        }
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;