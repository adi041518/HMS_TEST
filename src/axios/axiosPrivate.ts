import axios from "axios";

const axiosPrivate = axios.create({
    baseURL:  "https://barbellate-insides-laney.ngrok-free.dev",
});

axiosPrivate.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosPrivate;
