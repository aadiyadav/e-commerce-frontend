import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Api from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import signin from "../assets/signin.gif"

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [data, setData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const context = useContext(Context);

  // Check if context is null
  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { fetchUserDetails, cartCountFunc } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataResponse = await fetch(Api.logIn.url, {
      method: Api.logIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchUserDetails();
      cartCountFunc();
      navigate('/');
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className="mx-auto container px-4 py-8 flex items-center">
      <div className="border-2 shadow-xl w-full max-w-lg mx-auto p-3 rounded-md">
        <div className="text-center md:py-5 py-3 md:text-2xl text-xl font-dmsans font-semibold">Hey, welcome to Stud.io!</div>
        <img src={signin} alt="" className="mx-auto md:size-32 size-24 md:mt-4 mt-2 rounded-full" />
        <form onSubmit={handleSubmit} className="md:py-6 py-2 md:px-8 px-2 md:text-base text-sm font-roboto">
          <div className="bg-pink-900 px-4 py-2 rounded-full my-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              placeholder="Enter your Email Address"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white"
            />
          </div>
          <div className="flex items-center bg-pink-900 px-4 py-2 my-1 rounded-full">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Enter your password"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white"
            />
            <div onClick={() => setPasswordVisible((prev) => !prev)} className="text-slate-200 cursor-pointer">
              {passwordVisible ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <Link to={'/forgot_password'}
            className="pl-4 text-sm cursor-pointer text-gray-400 hover:text-gray-700 transition-all">
            Forgot password?
          </Link>
          <div className="md:my-10 my-6 flex justify-center">
            <button type="submit" className="bg-red-300 py-2 px-10 rounded font-semibold hover:bg-red-400 transition-all font-inria md:text-xl text-lg">Login</button>
          </div>
          <div className="text-center">
            <div>Don't have an account?</div>
            <Link to={'/signin'} className="hover:text-red-500 underline transition-all duration-150 ml-1">Create one</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
