import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandVite } from "react-icons/tb";

const Footer: React.FC = () => {
  return (
    <div className="w-full h-full md:px-10 md:py-6 p-5 bg-bluelogo text-gray-100">
      <div className="flex md:justify-center justify-between items-center md:gap-10 text-3xl font-medium font-teko">
        <div className="text-orange-400 mt-1">Let's Get Social</div>
        <div className="flex md:gap-6 gap-3 text-2xl">
          <a
            href="https://www.linkedin.com/in/aadi-yadav"
            target="_blank"
            className="md:hover:text-blue-400 text-blue-400 md:text-gray-200 transition-all"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/aadiyadav"
            target="_blank"
            className="md:hover:text-purple-500 text-purple-500 md:text-gray-200 transition-all"
          >
            <FiGithub />
          </a>
          <a
            href="https://aadi-yadav.vercel.app"
            target="_blank"
            className="md:hover:text-yellow-200 text-yellow-200 md:text-gray-200 transition-all"
          >
            <TbBrandVite />
          </a>
        </div>
      </div>
      <div className="h-[1px] my-5 w-full bg-gray-500"></div>
      <div className="w-full md:flex justify-between font-mont font-light md:px-10">
        <div className="flex md:mb-0 mb-5 flex-wrap text-xs md:gap-3 gap-2">
          <div className="cursor-pointer text-gray-300 hover:text-gray-100">Privacy Policy</div>
          <div>|</div>
          <div className="cursor-pointer text-gray-300 hover:text-gray-100">User Agreement</div>
          <div>|</div>
          <div className="cursor-pointer text-gray-300 hover:text-gray-100">Terms of Sale</div>
        </div>
        <div className="text-xs flex md:flex-row flex-col md:items-center gap-1">
          <div>For further queries, do check out my other projects, especially my portfolio.</div>
          <div className="md:mb-0 mb-3">Thank you! : )</div>
        </div>
      </div>
      <div className="text-center font-inria text-xs font-light pt-4">© January 2025 - Present - Stud.io. All Rights Reserved.</div>
    </div>
  );
};

export default Footer;
