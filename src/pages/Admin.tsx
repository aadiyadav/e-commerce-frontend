import { MdAccountCircle } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { FaUserGroup } from "react-icons/fa6"
import { AiFillProduct } from "react-icons/ai"

const Admin = () => {
    const user = useSelector(state => state?.user?.user)
    return (
    <div className="md:flex hidden min-h-[calc(100vh-70px)]">
        <aside className="bg-white w-80 border-r">
            <div className="w-full py-20 flex justify-center items-center">
                {
                    user?.profilePic ? (
                    <div className="flex flex-col items-center text-lg">
                        <img src={user?.profilePic} alt={user?.name} className="w-28 h-28 rounded-full object-cover" />
                        <div className="pt-6 font-merri">{user?.name}</div>
                        <div className="font-poppins font-semibold">{user?.role || "Admin"}</div>
                    </div>
                ) : (
                    <MdAccountCircle/>
                )}
            </div>
            <div className="grid p-4 gap-2 font-inria text-lg">
                <Link to={'all-users'} className="px-2 py-1 hover:bg-gray-200 flex items-center justify-between rounded-sm">
                    <div>All Users</div>
                    <FaUserGroup size={22}/>
                </Link>
                <Link to={"all-products"} className="px-2 py-1 hover:bg-gray-200 flex items-center justify-between rounded-sm">
                    <div>All Products</div>
                    <AiFillProduct size={24}/>
                </Link>
            </div>
            <div className="p-4 my-6 text-sm">
                <p>
                    This is the Admin Panel. You can see all the users that are connected with Stud.io.
                    You can edit their roles as per your convenience. Not just this, you can even add new
                    products in the website or edit the existing ones.
                </p>
                <p className="py-2">Enjoy!</p>
            </div>
        </aside>
        <main className="w-full h-full">
            <Outlet/>
        </main>
    </div>
  )
}

export default Admin