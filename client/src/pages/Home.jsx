import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/api';
import Navbar from '../components/ui/Navbar';
import Heading from '../components/ui/Heading';
import { useState } from 'react';
import ManageManagers from '../components/functional/ManageManagers';
import ManageEmployees from '../components/functional/ManageEmployees';
import GetAll from '../components/functional/GetAll';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split(";").find((row) => row.startsWith("token="));
    if (!token) {
      navigate("/")
    }
  })

  const handlelogout = async () => {
    const res = await userLogout();
    if (res.data.success) {
      navigate("/");
    }
  }

  const [activeTab, setActiveTab] = useState('getall');
  const [managerActivity, setManagerActivity] = useState('');

  const [employeeActivity, setEmployeeActivity] = useState('');


  return (
    <div className='w-screen h-screen bg-gray-950'>
      <Heading label="Welcome Admin!!" />
      <Navbar setActiveTab={setActiveTab} setManagerActivity={setManagerActivity} setEmployeeActivity={setEmployeeActivity}/>
      {activeTab === 'managers' && <ManageManagers managerActivity={managerActivity}/>}
      {activeTab==='employees' && <ManageEmployees employeeActivity={employeeActivity}/>} 
      {activeTab==='getall' && <GetAll />}
    </div>
  )
}

export default Home
