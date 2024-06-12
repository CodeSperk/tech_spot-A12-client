import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://techspot-kohl.vercel.app"
})

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;