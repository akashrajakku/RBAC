import { useState } from "react";
import { addEmployee } from "../../services/employee/api";


function NewEmployee() {
  const [employeeData, setEmployeeData] = useState({
    email: "",
    username: "",
    department: "",
  });

  const onChangeHandler = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })
  }

  const addEmployeeHandler = async () => {
    const employee = await addEmployee(employeeData);
    alert('employee created');
    setEmployeeData({
      email: "",
      username: "",
      department: "",
    });
    return employee;
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec] flex items-center justify-center">
      <div className="relative">
        <div className="relative bg-white/80 rounded-3xl shadow-2xl w-full max-w-md mx-auto p-10 space-y-6 hover:shadow-3xl transition-all duration-300">

          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              Add New <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">Employee</span>
            </h2>
            <p className="text-gray-600">Fill in the employee details</p>
          </div>

         
          <div className="relative group">
            <input
              id="email"
              placeholder="e.g. employee1@gmail.com"
              className="w-full pl-12 pr-4 py-4 border border-purple-600 rounded-2xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-200"
              name="email"
              type="email"
              value={employeeData.email}
              onChange={onChangeHandler}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          
          <div className="relative group">
            <input
              id="username"
              placeholder="e.g. Rahul Raj"
              className="w-full pl-12 pr-4 py-4 border border-purple-600 rounded-2xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-200"
              name="username"
              type="text"
              value={employeeData.username}
              onChange={onChangeHandler}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

         
          <div className="relative group">
            <input
              id="department"
              placeholder="e.g. marketing"
              className="w-full pl-12 pr-4 py-4 border border-purple-600 rounded-2xl backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-200"
              name="department"
              type="text"
              value={employeeData.department}
              onChange={onChangeHandler}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          
          <button
            type="submit"
            onClick={addEmployeeHandler}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none active:scale-[0.98] hover:cursor-pointer"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Employee</span>
            </span>
          </button>

        </div>
      </div>
    </div>
  )
}

export default NewEmployee