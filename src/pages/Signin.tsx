import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64.tsx";
import Api from "../common/index.tsx";
import { toast } from "react-toastify";
import signin from "../assets/studio.gif"

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
      <div className="border-2 border-slate-400 bg-slate-100 shadow-xl w-full max-w-md mx-auto p-3 rounded-md">
        <div className="text-center md:py-6 py-3 md:text-4xl text-2xl font-inria font-medium">Welcome to Stud.io!</div>
        <div className="relative mx-auto md:size-28 size-20 md:mt-4 mt-2 overflow-hidden content-center rounded-full">
          <div>
            <img src={data.profilePic || signin} alt="" className="object-cover" />
          </div>
          {!data.profilePic && (
            <form>
              <label className="cursor-pointer">
                <div className="absolute text-xs font-medium text-center bg-slate-200 p-5 w-full -mt-14 opacity-80 font-roboto">Upload Photo</div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          )}
        </div>
        <form onSubmit={handleSubmit} className="md:py-6 py-2 md:px-4 px-2 md:text-base text-sm font-roboto">
          <div className="bg-bluelogo px-4 py-2 rounded-full my-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              placeholder="Your Name"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white" />
          </div>
          <div className="bg-bluelogo px-4 py-2 rounded-full my-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              value={data.email}
              placeholder="Enter your Email Address"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white" />
          </div>
          <div className="flex items-center bg-bluelogo px-4 py-2 my-4 rounded-full">
            <input
              type={password ? "password" : "text"}
              name="password"
              onChange={handleChange}
              required
              value={data.password}
              placeholder="Enter your password"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white" />
            <div onClick={() => setPassword((prev) => !prev)} className="text-slate-200 cursor-pointer">
              {password ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <div className="flex items-center bg-bluelogo px-4 py-2 my-4 rounded-full">
            <input
              type={confirmPassword ? "password" : "text"}
              name="confirmPassword"
              onChange={handleChange}
              required
              value={data.confirmPassword}
              placeholder="Confirm password"
              className="outline-none w-full bg-bluelogo placeholder:text-slate-200 placeholder:font-light text-white" />
            <div onClick={() => setConfirmPassword((prev) => !prev)} className="text-slate-200 cursor-pointer">
              {confirmPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <div className="md:my-10 my-6 flex justify-center">
            <button type="submit" className="hover:bg-orange-400 cursor-pointer bg-white border-2 border-orange-400 pb-2 pt-3 px-10 rounded-lg font-medium hover:text-white transition-all font-teko md:text-3xl text-xl">SIGN-IN</button>
          </div>
          <div className="flex justify-center font-inria">
            <Link to={'/signup'} className="but md:w-52 w-40 md:h-10 h-8 text-center">
              <div className="default-btn">
                <span className="w-full">Are you already a user?</span>
              </div>
              <div className="hover-btn">
                <span className="w-full">Get back to your account.</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;