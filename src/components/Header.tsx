import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useEffect, useState } from "react";
import ROLE from "../common/role";
import logo from "../assets/logo.png";
import Context from "../context";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch();
  const context = useContext(Context);

  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(location?.search?.split("=")[1]);

  const handleLogOut = async () => {
    const fetchData = await fetch(Api.logOut.url, {
      method: Api.logOut.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    setShowAdmin(false);
  }, [location]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate(`/search`);
  };

  return (
    <header className="shadow-md h-16 bg-white fixed w-full z-40">
      <div className="h-full flex justify-between items-center lg:px-16 px-3 sm:border-b">
        <Link to={'/'}>
          <img src={logo} alt="Stud.io" className="sm:w-40 w-32 font-bold text-3xl" />
        </Link>
        <div className={`sm:flex items-center border-black border rounded-full hidden focus-within:shadow-md ${user?._id ? ("md:ml-20") : ("mr-14")}`}>
          <input
            type="text"
            placeholder="Search Product"
            onChange={handleSearch}
            value={search}
            className="focus:outline-none flex items-center pl-2 mx-2 md:w-72 font-dmsans"
          />
          <div className="bg-red-300 w-10 rounded-r-full flex justify-center items-center py-0.5">
            <CiSearch size={22} />
          </div>
        </div>

        <div className="flex justify-center items-center sm:gap-x-5 gap-x-2 text-3xl text-black">
          <div className="flex sm:gap-x-1 gap-x-0">
            <div className="flex justify-center items-center cursor-pointer lg:gap-x-16 md:gap-x-8 gap-x-4">
              {user?._id && (
                <div className="flex items-center md:gap-2">
                  {user?.profilePic ? (
                    <div className="flex flex-col items-center ml-2">
                      <img
                        src={user?.profilePic}
                        alt={user?.name}
                        onClick={() => setShowAdmin(prev => !prev)}
                        className="min-w-8 w-8 h-8 rounded-full object-cover"
                      />
                      {showAdmin && user?.role === ROLE.ADMIN && (
                        <Link
                          className="font-dmsans font-semibold text-sm absolute top-[68px] md:block hidden bg-white text-center p-2 whitespace-nowrap shadow-lg rounded-lg z-10"
                          to={"/admin/all-products"}
                          onClick={() => setShowAdmin(prev => !prev)}
                        >
                          Admin Panel
                        </Link>
                      )}
                    </div>
                  ) : (
                    <MdAccountCircle />
                  )}
                  <Link to={'/cart'} className="relative">
                    <IoMdCart className="cursor-pointer md:size-8 size-7" />
                    <div className="absolute text-[13px] font-extrabold -top-2 -right-2 w-5 h-5 border-2 flex items-center justify-center pt-[0.5px] border-black rounded-full bg-white font-roboto">
                      {context?.cartCount}
                    </div>
                  </Link>
                </div>
              )}
              {user?._id ? (
                <button
                  className="sm:ml-0 ml-1 text-lg pt-1 pb-1.5 md:px-5 px-3 border rounded-full bg-orange-600 text-white font-inria"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              ) : (
                <Link to={'/login'} className="flex items-center">
                  <button className="sm:ml-0 ml-1 text-lg pt-1 pb-1.5 md:px-5 px-3 border rounded-full bg-orange-600 text-white font-inria">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pb-6 pt-4 w-full sm:hidden flex justify-center items-center border-b shadow-md">
        <div className={`bg-white items-center border-black border rounded-full flex fixed focus-within:shadow-md`}>
          <input
            type="text"
            placeholder="Search Product"
            onChange={handleSearch}
            className="focus:outline-none flex items-center pl-2 mx-2 w-60 font-dmsans"
          />
          <div className="bg-red-300 w-10 rounded-r-full flex justify-center items-center py-0.5">
            <CiSearch size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
