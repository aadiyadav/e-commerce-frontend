import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Api from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import signin from "../assets/studio.gif"

interface LoginData {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
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
    <section className="mx-auto container px-4 py-16 flex items-center">
      <div className="border-2 border-slate-400 bg-slate-100 shadow-xl w-full max-w-md mx-auto p-3 rounded-md">
        <div className="text-center md:py-5 py-3 md:text-4xl text-2xl font-inria font-medium">Hey, welcome back user!</div>
        <img src={signin} alt="" className="mx-auto md:size-28 size-20 md:mt-4 mt-2 rounded-full" />
        <form onSubmit={handleSubmit} className="md:py-6 py-2 md:px-4 px-2 md:text-base text-sm font-roboto">
          <div className="bg-bluelogo px-4 py-2 rounded-full my-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              placeholder="Enter your Email Address"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white"
            />
          </div>
          <div className="flex items-center bg-bluelogo px-4 py-2 my-1 rounded-full">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Enter your password"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white"
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
            <button type="submit" className="hover:bg-orange-400 cursor-pointer bg-white border-2 border-orange-400 md:pb-2 pb-1 md:pt-3 pt-2 px-10 rounded-lg font-medium hover:text-white transition-all font-teko md:text-3xl text-2xl">SIGN-UP</button>
          </div>
          <div className="flex justify-center font-inria">
            <Link to={'/signin'} className="but md:w-52 w-36 md:h-10 h-8 text-center">
              <div className="default-btn">
                <span className="w-full">Are you new here?</span>
              </div>
              <div className="hover-btn">
                <span className="w-full">Create an account!</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
