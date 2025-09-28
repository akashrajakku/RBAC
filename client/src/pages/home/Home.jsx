import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../services/admin/api';
import Navbar from '../../components/ui/Navbar';
import Heading from '../../components/ui/Heading';
import { useState } from 'react';
import ManageManagers from '../admin/ManageManagers';
import ManageEmployees from '../admin/ManageEmployees';
import GetAll from '../../pages/admin/GetAll';

const Home = () => {

  const [activeTab, setActiveTab] = useState('getall');
  const [managerActivity, setManagerActivity] = useState('');
  const [employeeActivity, setEmployeeActivity] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split(";").find((row) => row.startsWith("token="));
    if (!token) {
      navigate("/")
    }
  })

  useEffect(() => {
    const storedRoleId = localStorage.getItem("roleId");
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }
    setLoading(false);
  }, []);

  const handlelogout = async () => {
    const res = await userLogout();
    if (res.data.success) {
      navigate("/");
    }
  }

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec] px-5'>

      <div className='flex justify-between items-center'>
        {roleId === '0' ? <Heading label="Welcome Admin" textColor='purple-600'/> : roleId === '1' ? <Heading label="Welcome Manager" /> : roleId === '2' ? <Heading label="Welcome Employee" /> : ""}
        <button
          className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:cursor-pointer active:scale-95 border-none outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          onClick={handlelogout}
        >
          Logout
        </button>
      </div>

        {
          roleId === '1' ? <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} showManagers={false} showAll={false} showEmployees={false} /> :
            roleId === '2' ? <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} showManagers={false} showAll={false} showEmployees={false} /> :
              <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} />
        }

      {activeTab === 'managers' && <ManageManagers managerActivity={managerActivity} />}
      {activeTab === 'employees' && <ManageEmployees employeeActivity={employeeActivity} />}
      {activeTab === 'getall' && <GetAll roleId={roleId} />}

    </div>
  )
}

export default Home
