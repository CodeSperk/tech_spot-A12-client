import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://techspot-kohl.vercel.app"
})

// "https://techspot-kohl.vercel.app"
// "http://localhost:5000"

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;