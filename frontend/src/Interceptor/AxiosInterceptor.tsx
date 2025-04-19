import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:'http://localhost:3005/',
    timeout:200000
})
axiosInstance.interceptors.request.use(
    (config) =>     {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
 
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        return Promise.reject(error)
    }
)

const api = axios.create({
   
    baseURL: "http://localhost:3002",
    withCredentials: true,

});

export const googleAuth = (code:string) => api.get(`/auth/google?code=${code}`);