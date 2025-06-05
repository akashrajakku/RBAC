import { useEffect, useState } from "react";
import { getAll, getEmployee , getAnEmployee} from "../../services/api";
import Heading from "../ui/Heading";
import UserProfile from "../ui/UserProfile";

function GetAll({roleId}) {

  const [users, setUsers] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAll();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const fetchEmployees = async () =>{
      try {
        const res = await getEmployee();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    }

    const fetchAnEmployee = async () =>{
        try {
          const response = await getAnEmployee();
          // console.log(response.data.employee);
          setEmployee(response.data.employee);
        } catch (error) {
          console.error("Failed to fetch employee", error);
        }
    }

    roleId === '0' ? fetchAllUsers() : roleId === '1' ? fetchEmployees(): roleId === '2' ? fetchAnEmployee() : <p></p> ;
  }, []);

  return (
    <div className="text-white">
      {roleId === '0' ? <Heading label="All-Xcelorians" /> : roleId === '1' ? <Heading label="All Employees List"/> : <div></div>}

      {((roleId === '0' && users) || (roleId === '1' && users)) ? <table className="table-auto border-collapse border border-gray-300 w-full">
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
      </table> : <div></div>}

      <div>
        {employee ? <UserProfile user={employee} /> : <div></div>}
      </div>
      
    </div>
  );
}

export default GetAll;
