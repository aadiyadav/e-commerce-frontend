import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"

const Home = () => {
  return (
    <div className="pb-10">
      <CategoryList />
      <BannerProduct/>
      <HorizontalCardProduct category={"speakers"} heading={"Best Airpodes under 3000!"}/>
      <HorizontalCardProduct category={"watches"} heading={"Get a New Wearable!"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Latest Mobiles"}/>
      <VerticalCardProduct category={"televisions"} heading={"Trending Screens"}/>
    </div>
  )
}

export default Home