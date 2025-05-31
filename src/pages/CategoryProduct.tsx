import { useParams } from "react-router-dom"
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay"
import { useState } from "react"

const CategoryProduct = () => {
  const params = useParams()
  const [sort, setSort] = useState("")

  return (
    <div className="w-full md:p-10 flex md:flex-row flex-col">
        <div className="md:block hidden h-[calc(100vh-170px)] md:w-80 w-full border border-gray-400 bg-slate-50 shadow-sm rounded px-3">
          <div className="py-2 text-xl font-semibold text-center border-b-2 border-gray-400">SORT BY</div>
          <div className="py-2">
            <div className="flex items-center gap-1.5">
              <input type="radio" name="sort" id="lowtohigh" value={"asc"} onChange={(e) => setSort(e.target.value)} className="size-4 mt-0.5" />
              <label htmlFor="lowtohigh">Price - Low to High</label>
            </div>
            <div className="flex items-center gap-1.5">
              <input type="radio" name="sort" id="hightolow" value={"dsc"} onChange={(e) => setSort(e.target.value)} className="size-4 mt-0.5" />
              <label htmlFor="hightolow">Price - High to Low</label>
            </div>
          </div>
        </div>
        <div className="w-full h-[610px] md:flex overflow-y-scroll border rounded bg-slate-50 md:ml-10">
          <div className="md:hidden flex justify-center pt-6 font-bold">
            <select name="sort" id="" onChange={(e) => setSort(e.target.value)} value={sort}
              className="px-10 py-2 rounded-lg font-bold border shadow-lg focus:border-slate-600 border-slate-400 outline-none">
              <option value="">Sort Price</option>
              <option value="asc" className="font-semibold">Low to High</option>
              <option value="dsc" className="font-semibold">High to Low</option>
            </select>
          </div>
          {
            params?.categoryName &&
            <CategoryWiseProductDisplay category={params?.categoryName} heading={""} sortBy={sort} />
          }
        </div>
    </div>
  )
}

export default CategoryProduct