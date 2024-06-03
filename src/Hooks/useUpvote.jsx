import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const useUpvote = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const handleUpvote = async (product) => {
    if(!user){
      return navigate("/login");
    }

    if(product?.votedUsers?.includes(user.email)){
      Swal.fire({
        icon: "error",
        text: "You have already voted for this product",
      });
      return;
    }

    const currentVote = product.upvote + 1;
    const newProduct = {
      currentVote,
      email: user.email,
    };

    const res = await axiosPublic.patch(`/product/${product._id}`, newProduct);
      if (res.data?.modifiedCount > 0) {
        queryClient.invalidateQueries(); 
      }
  }

  return {handleUpvote};
};

export default useUpvote;