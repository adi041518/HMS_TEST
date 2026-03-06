import axios from "axios";
 
const axiosPublic = axios.create({
    baseURL:  `http://${window.location.hostname}:8080`, 
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});
 
export default axiosPublic;