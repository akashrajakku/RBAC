import axiosApi from "../axios/axiosApi";

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
