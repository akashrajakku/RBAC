import Button from "../ui/Button";
import Input from "../ui/Input"
import { useState } from "react";
import { addEmployee } from "../../services/api";


function NewEmployee() {
  const [employeeData, setEmployeeData] = useState({
      email: "",
      username:"",
      department:"",
    });

  const onChangeHandler = (e)=>{
      setEmployeeData({...employeeData, [e.target.name]: e.target.value})
  }

  const addEmployeeHandler = async()=>{
     const employee = await addEmployee(employeeData);     
     alert('employee created');
     setEmployeeData({
      email: "",
      username:"",
      department:"",
    });
    return employee;
  }
 

  return (
    <div className="w-1/3 mx-auto mt-20 p-6 bg-black border border-white rounded-xl">
      
       <Input 
            label="Email" 
            type = 'email'
            name = "email"
            placeholder = 'e.g. employee1@gmail.com'
            value = {employeeData.email}
            onChange={onChangeHandler}
            textColor="white"
        />

      <Input 
            label="Name" 
            name = "username"
            placeholder = 'e.g. Rahul Raj'
            value = {employeeData.username}
            onChange={onChangeHandler}
            textColor="white"
        />

      <Input 
            label="Department" 
            name = "department"
            placeholder = 'e.g. marketing'
            value = {employeeData.department}
            onChange={onChangeHandler}
            textColor="white" 
        />

      <div className="w-full flex justify-center items-center mt-2" onClick={addEmployeeHandler}><Button label="Add Employee"/></div>
    </div>
  )
}

export default NewEmployee