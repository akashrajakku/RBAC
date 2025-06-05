import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/api';
import Navbar from '../components/ui/Navbar';
import Heading from '../components/ui/Heading';
import { useState } from 'react';
import ManageManagers from '../components/functional/ManageManagers';
import ManageEmployees from '../components/functional/ManageEmployees';
import GetAll from '../components/functional/GetAll';
import Button from '../components/ui/Button';

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
    <div className='w-screen h-screen bg-gray-950'>

      <div className='flex'>
        {roleId === '0' ? <Heading label="Welcome Admin!!" /> : roleId === '1' ? <Heading label="Welcome Manager!!" /> : roleId === '2' ? <Heading label="Welcome Employee!!" /> : ""}

        {
          roleId === '1' ? <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} showManagers={false} showAll={false} showEmployees={false} /> :
            roleId === '2' ? <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} showManagers={false} showAll={false} showEmployees={false} /> :
              <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity} />
        }

        <Button label="Logout" onClick={handlelogout} text='xl' />
      </div>



      {activeTab === 'managers' && <ManageManagers managerActivity={managerActivity} />}
      {activeTab === 'employees' && <ManageEmployees employeeActivity={employeeActivity} />}
      {activeTab === 'getall' && <GetAll roleId={roleId} />}

    </div>
  )
}

export default Home
