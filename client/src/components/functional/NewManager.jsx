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
       return manager;
    }


  return (
    <div className="w-1/2 m-auto mt-24 p-2 bg-white">
       <Input 
            label="Email" 
            type = 'email'
            name = "email"
            placeholder = 'abc123@gmail.com'
            value = {managerData.email}
            onChange={onChangeHandler}
        />

      <Input 
            label="Name" 
            name = "username"
            placeholder = 'akash raj'
            value = {managerData.username}
            onChange={onChangeHandler}
        />

      <Input 
            label="Department" 
            name = "department"
            placeholder = 'e.g. hr'
            value = {managerData.department}
            onChange={onChangeHandler}
        />

      <div className="w-full flex justify-center items-center"><Button label="Add Manager" onClick={addManagerHandler}/></div>
    </div>
  )
}

export default NewManager