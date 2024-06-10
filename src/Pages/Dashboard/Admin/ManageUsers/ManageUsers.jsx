import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const ManageUsers = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {isLoading,  data: allUsers = [], refetch} = useQuery({
    queryKey:["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
      } 
  })

  if(isLoading) {
    return <div>Loading....</div>
  }


  // to hide current user's own data
  const filteredUsers = allUsers.filter(singleUser => singleUser.email !== user?.email);
 
// To make moderator
const handleMakeModerator = id => {
  axiosSecure.patch(`/moderator/${id}`)
  .then((res) => {
    if (res.data?.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Role Changed to Moderator",
      }); 
    refetch();
    }
    });
}

const handleMakeAdmin = id => {
  axiosSecure.patch(`/admin/${id}`).then((res) => {
    if (res.data?.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Role Changed to Admin",
      }); 
    refetch();
    }
  });
}

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 py-10 lg:py-12">
<div className="relative flex flex-col w-full h-full overflow-scroll max-h-[90vh] text-[var(--clr-secondary)] text-sm bg-[var(--clr-white)] shadow-md bg-clip-border rounded-lg">
  <table className="w-full text-left table-auto min-w-max ">
    <thead>
      <tr className="font-normal border-b border-[var(--clr-light-gray)] bg-[var(--bg-secondary)] text-[var(--clr-primary)]">
        <th className="p-4">User Name</th>
        <th className="p-4">Email</th>
        <th className="p-4">Status</th>
        <th className="p-4">Actions</th>
      </tr>
    </thead>

    <tbody>
      { filteredUsers.length > 0 && filteredUsers?.map((user) => (
          <tr key={user._id} className="even:bg-blue-gray-50/50">
            <td className="p-4">{user?.name}</td>
            <td className="p-4">{user?.email}</td>
            {/* User Status */}
            <td className="p-4">
               <div
              className="w-fit bg-blue-50 text-[#448ADE] px-2 rounded font-semibold text-[12px]"
            >
             {user?.role}
            </div> 
             
            </td>

            {/* Action Buttons (accept and reject) */}
              <td className="p-4 flex gap-2">
                {
                  user.role === "user" &&
                <button
                  className="bg-[var(--clr-focussed)] text-[12px] text-white hover:scale-110 px-2 py-[2px] rounded duration-500 font-semibold"
                  onClick={() => handleMakeModerator(user._id)}
                >
                  Moderator
                </button> 
                }
                {
                  (user.role === "user" || user.role === "moderator"  ) && <button
                  className="bg-[var(--clr-focussed)] text-[12px] text-white py-0.5 hover:scale-110
                  px-2 rounded  duration-500 font-semibold"
                  onClick={() => handleMakeAdmin(user._id)}
                >
                  Admin
                </button>
                }
              </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>
</div>
  );
};

export default ManageUsers;