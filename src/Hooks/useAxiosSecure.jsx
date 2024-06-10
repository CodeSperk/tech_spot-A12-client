import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://techspot-kohl.vercel.app"
})

// "https://techspot-kohl.vercel.app"
// "http://localhost:5000"
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;