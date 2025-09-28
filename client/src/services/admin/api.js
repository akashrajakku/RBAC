import axiosApi from "../axios/axiosApi";

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