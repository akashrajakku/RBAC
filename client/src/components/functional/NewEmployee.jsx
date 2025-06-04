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
     return employee;
  }
 

  return (
    <div className="w-1/2 m-auto mt-24 p-2 bg-white">
       <Input 
            label="Email" 
            type = 'email'
            name = "email"
            placeholder = 'e.g. employee1@gmail.com'
            value = {employeeData.email}
            onChange={onChangeHandler}
        />

      <Input 
            label="Name" 
            name = "username"
            placeholder = 'e.g. Rahul Raj'
            value = {employeeData.username}
            onChange={onChangeHandler}
        />

      <Input 
            label="Department" 
            name = "department"
            placeholder = 'e.g. marketing'
            value = {employeeData.department}
            onChange={onChangeHandler}
        />

      <div className="w-full flex justify-center items-center" onClick={addEmployeeHandler}><Button label="Add Employee"/></div>
    </div>
  )
}

export default NewEmployee