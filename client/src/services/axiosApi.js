import axios from "axios"

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_EXPRESS_URL
})

axiosApi.interceptors.request.use((config) => {

    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
    };

    config.withCredentials = true;
    return config;
});


axiosApi.interceptors.response.use((response) => {
    const { url } = response.config;
    let roleId = null;

    if (url.includes('/login') && (response.data?.admin?.roleId===0)) {
        roleId = response.data.admin.roleId;
    }

    else if (
        (url.includes('/users/auth/login') && response.data?.user?.roleId) ||
        (url.includes('/users/auth/signup') && response.data?.user?.roleId)
    ) {
        roleId = response.data.user.roleId;
    }

    if (roleId || roleId===0) {
        localStorage.setItem("roleId", roleId);
    }

    return response;
});

export default axiosApi;
