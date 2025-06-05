import axiosApi from "./axiosApi";

export const userSignup=async(data)=>{
    try {
        const result = await axiosApi.post(`/signup` , data);
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
        const result = await axiosApi.post(`/login` , data);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const userLogout=async()=>{
    try {
        const result = await axiosApi.get(`/logout`);
        localStorage.removeItem("roleId");
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getManager=async()=>{
    try {
        const managers= await axiosApi.get(`/manager/`);
        return managers;
    } catch (error) {
        console.log(error);
    }
} 

export const editManager = async (id, updatedFields) => {
  try {
    const response = await axiosApi.patch(`/manager/edit/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.log('Error updating manager:', error);
    throw error;
  }
};

export const deleteManager = async (id) => {
  try {
    const response = await axiosApi.delete(`/manager/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting manager:', error);
    throw error;
  }
};

export const addManager = async (data) =>{
    try {
    const response = await axiosApi.post(`/manager/add/`, {
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
    const response = await axiosApi.post(`/employee/add/`, {
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
        const employees= await axiosApi.get(`/employee/`);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

export const editEmployee = async (id, updatedFields) => {
  try {
    const response = await axiosApi.patch(`/employee/edit/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.log('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axiosApi.delete(`/employee/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting employee:', error);
    throw error;
  }
};

export const getAnEmployee= async ()=>{
    try {
        const employees= await axiosApi.get(`/employee/fetch`);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

export const getAll= async ()=>{
    try {
        const everyone= await axiosApi.get(`/`);
        return everyone;
    } catch (error) {
        console.log(error);
    }
}

export const usersAuth = async(email)=>{
    try {
        const response = await axiosApi.post(`/users/auth`, {
        email:email
    });
    console.log(response);
    
    return response;
    } catch (error) {
      console.log(`error occured in usersAuth : ${error}`);
      
    }
}

export const usersSignup = async(email, password)=>{
    const data = {email, password};

    try {
        const response = await axiosApi.post(`/users/auth/signup`,data);
        return response;
    } catch (error) {
      console.log(`error occured in usersSignup : ${error}`);
    }
}

export const usersLogin = async(email, password)=>{
  const data = {email, password};

    try {
        const response = await axiosApi.post(`/users/auth/login`, data);
        return response;
    } catch (error) {
      console.log(`error occured in usersLogin : ${error}`); 
    }
}
