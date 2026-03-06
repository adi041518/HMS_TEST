import axios from "axios";
 
const axiosPublic = axios.create({
    baseURL: "https://barbellate-insides-laney.ngrok-free.dev", 
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});
 
export default axiosPublic;