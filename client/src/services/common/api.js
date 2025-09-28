import axiosApi from "../axios/axiosApi";

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

export const getAll = async()=>{
    try {
        const response = await axiosApi.get(`/`);
        return response;
    } catch (error) {
      console.log(`error occured in usersLogin : ${error}`); 
    }
}