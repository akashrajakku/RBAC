import axios from "axios"

const url=import.meta.env.VITE_EXPRESS_URL;

export const userSignup=async(data)=>{
    try {
        const result = await axios.post(`${url}/signup` , data, {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
        })
        
        return result;
    } catch (error) {
        console.log(error);
         
           
        
        if(error.response.data.error=="validate") {
           return alert(error.response.data.message.slice(24))
        }
         alert(error.response.data.message)
        
    }
}

export const userLogin=async(data)=>{
    try {
        const result = await axios.post(`${url}/login` , data, {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
        })
        console.log(result)
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const userLogout=async()=>{
    try {
        const result = await axios.get(`${url}/logout` , {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getManager=async()=>{
    try {
        const managers= await axios.get(`${url}/manager/`);
        return managers;
    } catch (error) {
        console.log(error);
    }
} 

export const editManager = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${url}/manager/edit/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.log('Error updating manager:', error);
    throw error;
  }
};

export const deleteManager = async (id) => {
  try {
    const response = await axios.delete(`${url}/manager/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting manager:', error);
    throw error;
  }
};

export const addManager = async (data) =>{
    try {
    const response = await axios.post(`${url}/manager/add/`, {
      username: data.username,
      email: data.email,
      department: data.department,
    });

    return response.data; 
  } catch (error) {
    console.error('Error adding manager:', error);
    throw error;
  }
}

export const addEmployee = async (data) => {
  try {
    const response = await axios.post(`${url}/employee/add/`, {
      username: data.username,
      email: data.email,
      department: data.department,
    });

    return response.data; 
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const getEmployee= async ()=>{
    try {
        const employees= await axios.get(`${url}/employee/`);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

export const editEmployee = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${url}/employee/edit/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.log('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${url}/employee/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting employee:', error);
    throw error;
  }
};

export const getAll= async ()=>{
    try {
        const everyone= await axios.get(`${url}/`);
        return everyone;
    } catch (error) {
        console.log(error);
    }
}

export const usersAuth = async(email)=>{
    try {
        const response = await axios.post(`${url}/users/auth`, {
        email:email
    });
    console.log(response);
    
    return response;
    } catch (error) {
      console.log(`error occured in usersAuth : ${error}`);
      
    }
}
