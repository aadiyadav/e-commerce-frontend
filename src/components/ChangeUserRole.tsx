import ROLE from "../common/role";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";

interface ChangeUserRoleProps {
  userId: string | undefined;
  name: string | undefined;
  role: string | undefined;
  onClose: () => void;
  refresh: () => void;
}

const ChangeUserRole: React.FC<ChangeUserRoleProps> = ({ userId, name, role, onClose, refresh }) => {
  const [userRole, setUserRole] = useState<string>(role || "USER");

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const response = await fetch(Api.updateUser.url, {
      method: Api.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const resdata = await response.json();

    if (resdata.success) {
      toast.success(resdata.message);
      refresh();
    } else {
      toast.error(resdata.message);
    }
  };

  return (
    <div className="fixed top-6 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-200">
      <div className="bg-white flex flex-col justify-center w-[400px] z-10 p-4 rounded-md border shadow-lg relative">
        <div className="text-2xl absolute top-4 right-4">
          <IoIosCloseCircle className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="text-center text-xl font-medium font-roboto">Change User Role:</div>
        <div className="flex flex-col gap-4 mx-6 mt-8 mb-4 font-mont">
          <div className="flex justify-between items-center relative">
            <div className="font-medium">Name</div>
            <div className="absolute text-center w-full -left-2 font-bold">:</div>
            <div>{name}</div>
          </div>
          <div className="flex justify-between items-center relative">
            <div className="font-medium">Role</div>
            <div className="absolute text-center w-full -left-2 font-bold">:</div>
            <select
              className="focus:outline-none border transition-all cursor-pointer px-3 pb-1 rounded-md"
              value={userRole}
              onChange={handleRoleChange}
              name="userRole"
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-4 px-4 py-1.5 bg-lime-300 hover:bg-lime-600 hover:text-white rounded-xl font-inria"
            onClick={updateUserRole}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
