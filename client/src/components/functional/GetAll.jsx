import { useEffect, useState } from "react";
import { getAll } from "../../services/api";
import Heading from "../ui/Heading";

function GetAll() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAll();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="text-white">
      <Heading label="All-Xcelorians" />

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="py-4">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S. No.</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email Address</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            const { username, email, department, role } = user;
            return (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{username}</td>
                <td className="border border-gray-300 px-4 py-2">{email}</td>
                <td className="border border-gray-300 px-4 py-2">{department}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GetAll;
