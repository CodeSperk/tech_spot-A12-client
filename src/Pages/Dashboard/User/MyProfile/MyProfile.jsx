import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const { data: userInfo = [], isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  console.log(userInfo.subscriptionStatus);

  
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 mt-6 md:mt-8">
      {/*  */}
      <div className="bg-[var(--clr-white)]">
        {/* banner and profile pic */}
        <div className="relative bg-[var(--bg-secondary)] rounded-xl h-40">
          {/* user Image */}
          <div className="absolute w-28 h-28 rounded-full border-2 -bottom-12 bg-red-50 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
            <img
              src={userInfo?.photo}
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>

        <div className="p-6 pt-16 md:pt-6 md:pl-36 flex justify-between flex-col md:flex-row gap-4">
              <div>
                <h3>{userInfo?.name}</h3>
                <p className="text-[var(--clr-secondary)]">{userInfo?.email}</p>
              </div>

              <div>
                {
                  userInfo?.subscriptionStatus === "varified" ? <button className="bg-[var(--clr-focussed)] text-white py-2 px-4 rounded-md">Status : Verified</button>  :
                  <button className="bg-[var(--clr-focussed)] text-white py-2 px-4 rounded-md" onClick={handleOpen}>Subscribe : 500Tk</button>
                }
              </div>
        </div>
      </div>




      {/* Modal */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
       <div className="bg-[var(--clr-white)] p-4 md:p-6 lg:p-10">Payment Info: Pay Here</div>
      </Dialog>
    </div>
  );
};

export default MyProfile;
