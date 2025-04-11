import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64.tsx";
import Api from "../common/index.tsx";
import { toast } from "react-toastify";
import signin from "../assets/signin.gif"

interface SigninData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
}

const Signin = () => {
  const [password, setPassword] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(true);
  const [data, setData] = useState<SigninData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUploadPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const userData = await fetch(Api.signIn.url, {
        method: Api.signIn.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const resData = await userData.json();

      console.log(resData);
      if (resData.success) {
        console.log(resData);
        toast.success(resData.message);
        navigate('/login');
      } else {
        toast.error(resData.message);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <div className="mx-auto container px-4 py-8">
      <div className="border-2 shadow-xl w-full max-w-lg mx-auto p-3 rounded-md">
        <div className="text-center md:py-6 py-3 md:text-2xl text-xl font-dmsans font-semibold">Hey, welcome back to Stud.io!</div>
        <div className="relative mx-auto md:size-32 size-24 md:mt-4 mt-2 overflow-hidden content-center rounded-full">
          <div>
            <img src={data.profilePic || signin} alt="" className="object-cover" />
          </div>
          {!data.profilePic && (
            <form>
              <label className="cursor-pointer">
                <div className="absolute text-xs font-medium text-center bg-slate-200 p-6 w-full -mt-16 opacity-80 font-roboto">Upload Photo</div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          )}
        </div>
        <form onSubmit={handleSubmit} className="md:py-6 py-2 md:px-8 px-2 md:text-base text-sm font-roboto">
          <div className="bg-pink-900 px-4 py-2 rounded-full my-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              placeholder="Your Name"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white" />
          </div>
          <div className="bg-pink-900 px-4 py-2 rounded-full my-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              value={data.email}
              placeholder="Enter your Email Address"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white" />
          </div>
          <div className="flex items-center bg-pink-900 px-4 py-2 my-4 rounded-full">
            <input
              type={password ? "password" : "text"}
              name="password"
              onChange={handleChange}
              required
              value={data.password}
              placeholder="Enter your password"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white" />
            <div onClick={() => setPassword((prev) => !prev)} className="text-slate-200 cursor-pointer">
              {password ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <div className="flex items-center bg-pink-900 px-4 py-2 my-4 rounded-full">
            <input
              type={confirmPassword ? "password" : "text"}
              name="confirmPassword"
              onChange={handleChange}
              required
              value={data.confirmPassword}
              placeholder="Confirm password"
              className="outline-none w-full bg-pink-900 placeholder:text-slate-200 placeholder:font-light text-white" />
            <div onClick={() => setConfirmPassword((prev) => !prev)} className="text-slate-200 cursor-pointer">
              {confirmPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <div className="md:my-10 my-6 flex justify-center">
            <button type="submit" className="bg-red-300 py-2 px-10 rounded font-semibold hover:bg-red-400 transition-all font-inria md:text-xl text-lg">Sign In</button>
          </div>
          <div className="text-center">
            <div>Already have an account?</div>
            <Link to={'/login'} className="hover:text-red-500 underline transition-all duration-150 ml-1">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;