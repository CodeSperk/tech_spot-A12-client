import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';
import { Spinner } from "@material-tailwind/react";

const PrivateRout = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if(loading){
    return <div className="h-screen w-full flex justify-center items-center"> <Spinner color="red" className="h-16 w-16" /> </div>
  }
  if(user){
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>
}

PrivateRout.propTypes = {
  children: PropTypes.node
}

export default PrivateRout;