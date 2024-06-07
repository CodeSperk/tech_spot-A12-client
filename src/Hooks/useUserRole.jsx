import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data: userRole, isLoading: isUserLoading} = useQuery({
    queryKey:[user?.email, "userRole"],
    queryFn: async () => {
      if(user.email){
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data.role;
      }
      return null;
    },
    enabled: !!user?.email,
  })
  return [userRole, isUserLoading];
};

export default useUserRole;