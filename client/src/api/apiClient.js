import axios from "axios";
import {toast} from "react-toastify";
import {VITE_END_POINT} from "../config/env.js";

const apiClient = axios.create({
    baseURL: VITE_END_POINT,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(configs => {
    try {
        const token = getToken()
        if (token) configs.headers.authorization = `Bearer ${token}`
    } catch (e) {
        console.log(e)
    }

    return configs
})

apiClient.interceptors.response.use((res) => res, err => {
    console.log("AXIOS ERROR:", err.response?.data?.message);
    const message = err?.response?.data?.message || "Something went wrong";

    // window.dispatchEvent(new CustomEvent("SHOW_POPUP", {detail: {message, type: 'error'}}))
    toast.error(message);
    return Promise.reject(err)
})

export default apiClient;