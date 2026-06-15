import axios from "axios";

const axiosSquir = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
})


const useAxiosSequire = ()=> {
    return axiosSquir;
}

export default useAxiosSequire;