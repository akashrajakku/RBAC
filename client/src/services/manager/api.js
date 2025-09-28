import axiosApi from "../axios/axiosApi";

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