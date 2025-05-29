import { Link, useLocation } from "react-router-dom";
import Api from "../common";
import { useCallback, useEffect, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import debounce from "lodash.debounce"

interface Product {
  _id: string;
  productImage: string[];
  productName: string;
  category: string;
  sellingPrice: number;
  price: number;
}

const SearchProduct: React.FC = () => {
  const query = useLocation();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = useCallback(
    debounce(async (search: string) => {
      try {
        const res = await fetch(Api.searchProdct.url + search);
        const resData = await res.json();
        if (resData.success) setData(resData.data);
        else setData([]);
      } catch (err) {
        console.log(err)
        setData([]);
      }
      setLoading(false);
    }, 600), // 400ms debounce
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchProduct(query.search);
    // Cancel debounce on unmount or query change
    return () => {
      fetchProduct.cancel();
    };
  }, [query.search, fetchProduct]);

  return (
    <div className="md:py-12 md:px-28 p-6 min-h-[90vh]">
      {loading ? (
        <div className="text-xl font-medium text-center font-dmsans">Loading...</div>
      ) : data.length === 0 ? (
        <div className="md:text-2xl text-xl w-full flex justify-center font-normal font-roboto">Sorry, we couldn't catch you up. Try again...</div>
      ) : (
        <div className="flex flex-col md:gap-10 gap-6">
          <div className="md:text-xl text-lg font-medium font-mont">We have {data.length} {data.length === 1 ? 'option' : 'options'} for you :</div>
          <div className="flex items-center justify-center md:gap-5 gap-3 flex-wrap">
            {data.map((el) => (
              <Link to={'/product/' + el._id} key={el._id} className="shadow-sm border-2 border-slate-400 rounded-md">
                <div className="flex justify-center mx-auto md:h-56 h-32 md:w-72 w-40 items-center rounded-t-md border-gray-300 mix-blend-multiply md:p-4 p-2">
                  <img src={el.productImage[0]} alt="" className="h-full hover:scale-110 transition-all mix-blend-multiply object-contain" />
                </div>
                <div className="h-0.5 bg-gray-300 mx-4"></div>
                <div className="md:p-3 p-2 md:h-32 h-20 md:w-72 w-48 flex flex-col justify-between md:text-base text-xs rounded-b-md">
                  <div className="flex flex-col">
                    <div className="md:text-lg text-sm text-ellipsis line-clamp-1 font-semibold font-roboto">{el.productName}</div>
                    <div className="text-bluelogo capitalize font-merri">{el.category}</div>
                  </div>
                  <div className="flex gap-2 py-1 font-mont">
                    <div>{displayINRCurrency(el.sellingPrice)}</div>
                    <div className="line-through font-light text-zinc-500">{displayINRCurrency(el.price)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;