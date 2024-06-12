import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://techspot-kohl.vercel.app"
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;