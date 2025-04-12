import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { ToastContainer } from "react-toastify"
import { useState } from "react"
import Api from "./common"
import Context from "./context"
import { useDispatch } from "react-redux"
import { setUserDetails } from "./store/userSlice"
import "./App.css"

function App(){
  const dispatch = useDispatch()
  const [cartCount, setCartCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataRes = await fetch(Api.current_user.url, {
      method: Api.current_user.method,
      credentials: "include"
    })

    const dataApi = await dataRes.json()
    console.log("dataApi", dataApi)

    if (dataApi.success){
      console.log("successss")
      dispatch(setUserDetails(dataApi.data))
    }
  }

  async function cartCountFunc(){
    const dataRes = await fetch(Api.countCart.url, {
      method: Api.countCart.method,
      credentials: "include"
    })

    const dataApi = await dataRes.json()

    setCartCount(dataApi?.data)
  }

  // useEffect(() => {
  //   fetchUserDetails()
  //   cartCountFunc()
  // }, [])

  return (
    <>
      <Context.Provider value={{fetchUserDetails, cartCount, cartCountFunc}}>
      <Header/>
      <ToastContainer className={"md:pt-14 pt-28"}/>
      <main className="sm:pt-16 pt-24">
        <Outlet/>
      </main>
      <Footer/>
      </Context.Provider>
    </>
  )
}

export default App