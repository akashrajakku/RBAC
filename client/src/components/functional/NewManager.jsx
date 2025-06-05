import { addManager } from "../../services/api";
import Button from "../ui/Button";
import Input from "../ui/Input"
import { useState } from "react";

function NewManager() {
  const [managerData, setManagerData] = useState({
      email: "",
      username:"",
      department:"",
    });

  const onChangeHandler = (e)=>{
      setManagerData({...managerData, [e.target.name]: e.target.value})
  }

  const addManagerHandler = async()=>{
       const manager = await addManager(managerData);     
       alert('manager created');
       setManagerData({email: "",
      username:"",
      department:"",})
       return manager;
    }


  return (
    <div className="w-1/3 mx-auto mt-20 p-6 bg-black border border-white rounded-xl">
      
       <Input 
            label="Email" 
            type = 'email'
            name = "email"
            placeholder = 'e.g. employee1@gmail.com'
            value = {managerData.email}
            onChange={onChangeHandler}
            textColor="white"
        />

      <Input 
            label="Name" 
            name = "username"
            placeholder = 'e.g. Rahul Raj'
            value = {managerData.username}
            onChange={onChangeHandler}
            textColor="white"
        />

      <Input 
            label="Department" 
            name = "department"
            placeholder = 'e.g. marketing'
            value = {managerData.department}
            onChange={onChangeHandler}
            textColor="white" 
        />

      <div className="w-full flex justify-center items-center mt-2" onClick={addManagerHandler}><Button label="Add Manager"/></div>
    </div>
  )
}

export default NewManager