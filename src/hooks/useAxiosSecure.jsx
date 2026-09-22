import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  withCredentials: true, //user for set cokkie in token
});

const useAxiosSecure = () => {

  return axiosSecure;
};

export default useAxiosSecure;