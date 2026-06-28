import axios from "axios";

// ১. পরিবেশ অনুযায়ী baseURL সেটআপ (স্থানীয় এবং লাইভ সার্ভার দুই জায়গাতেই কাজ করবে)
const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  withCredentials: true, // যদি কুকি (Cookies) এর মাধ্যমে টোকেন পাঠাতে চান
});

const useAxiosSecure = () => {
  // আপনি চাইলে এখানে Axios Interceptors যুক্ত করতে পারেন
  // যেমন: রিকোয়েস্ট পাঠানোর আগে হেদারে টোকেন যুক্ত করা
  
  /* axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  */

  return axiosSecure;
};

export default useAxiosSecure;