import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000"
})

// "https://b9a12-final-project.web.app"
// "http://localhost:5000"

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;