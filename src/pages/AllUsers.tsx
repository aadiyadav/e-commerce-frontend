import { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

interface User {
  _id: string;
  name: string;
  role: string;
  createdAt: string;
}

const AllUsers: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<Partial<User>>({
    _id: "",
    name: "",
    role: ""
  });

  const fetchAllUsers = async () => {
    const dataRes = await fetch(Api.allUser.url, {
      method: Api.allUser.method,
      credentials: "include"
    });

    const data = await dataRes.json();

    if (data.success) {
      setAllUsers(data.data);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-10 space-y-10">
      <div className="text-center text-3xl font-semibold font-poppins">USER DATA</div>
      <table className="w-full userTable font-dmsans">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Role</th>
            <th>Created On</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((el, index) => (
            <tr key={el._id}>
              <td>{index + 1}.</td>
              <td>{el.name}</td>
              <td>{el.role}</td>
              <td>{el.createdAt.split("T")[0]}</td>
              <td>
                <button
                  className="cursor-pointer mt-1 hover:bg-green-700 p-1 rounded-full hover:text-white transition-all"
                  onClick={() => {
                    setUpdateUser(el);
                    setOpenUpdate(true);
                  }}
                >
                  <MdModeEdit size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdate && (
        <ChangeUserRole
          userId={updateUser._id}
          name={updateUser.name}
          role={updateUser.role}
          onClose={() => setOpenUpdate(false)}
          refresh={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;