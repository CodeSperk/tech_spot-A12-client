import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRout = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if(loading){
    return <h2>Loading....</h2>
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