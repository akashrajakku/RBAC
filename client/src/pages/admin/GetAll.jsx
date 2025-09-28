import { useEffect, useState } from "react";
import { getAll} from "../../services/common/api";
import { getAnEmployee, getEmployee } from "../../services/employee/api";
import Heading from "../../components/ui/Heading";
import UserProfile from "../../components/ui/UserProfile";
import UserCard from "../../components/ui/UserCard"; 

function GetAll({roleId}) {

  const [users, setUsers] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAll();
        console.log(res);
        
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
          setEmployee(response.data.employee);
        } catch (error) {
          console.error("Failed to fetch employee", error);
        }
    }

    roleId === '0' ? fetchAllUsers() : roleId === '1' ? fetchEmployees(): roleId === '2' ? fetchAnEmployee() : null;
  }, [roleId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        {roleId === '0' ? (
          <Heading label="All-Xcelorians" />
        ) : roleId === '1' ? (
          <Heading label="All Employees List" />
        ) : null}
      </div>

      {/* Users Grid */}
      {((roleId === '0' && users.length > 0) || (roleId === '1' && users.length > 0)) && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user, index) => (
              <UserCard 
                key={user.id || index} 
                user={user} 
                index={index} 
              />
            ))}
          </div>
          
          {/* Stats footer */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total {roleId === '0' ? 'Users' : 'Employees'}: <span className="font-semibold text-purple-600">{users.length}</span></span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                All data loaded successfully
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Individual Employee Profile */}
      {roleId === '2' && employee && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <UserProfile user={employee} />
        </div>
      )}

      {/* Empty States */}
      {((roleId === '0' || roleId === '1') && users.length === 0) && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">There are no users to display at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default GetAll;
