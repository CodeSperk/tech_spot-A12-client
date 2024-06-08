import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000"
})

// "https://techspot-kohl.vercel.app"
// "http://localhost:5000"
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;