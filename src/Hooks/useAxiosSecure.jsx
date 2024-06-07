import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000"
})

// "https://b9a12-final-project.web.app"
// "http://localhost:5000"
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;