import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  // to fetch product data
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myProducts?email=${user?.email}`);
      return res.data;
    },
  });

  isLoading && <div>Loading...</div>;


  // to delete product
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF1749",
      cancelButtonColor: "#555555",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteProduct/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              confirmButtonColor: "#448ADE",
              title: "Job Deleted Successful",
              timer: 2500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 mt-6 md:mt-8">
      <table className="w-full text-left table-auto min-w-max bg-white">
        <thead>
          <tr className="font-bold bg-[var(--bg-secondary)] text-sm border-b border-[var(--clr-light-gray)]">
            <th className="p-4 text-[var(--clr-secondary)]">Product Name</th>
            <th className="p-4 text-[var(--clr-secondary)]">Votes</th>
            <th className="p-4 text-[var(--clr-secondary)]">Status</th>
            <th className="p-4 text-[var(--clr-secondary)]">Update</th>
            <th className="p-4 text-[var(--clr-secondary)]">Delete</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.length > 0 &&
            myProducts.map((product) => (
              <tr
                key={product._id}
                className="border-b border-[var(--clr-light-gray)] text-sm"
              >
                <td className="p-4 capitalize"> {product?.productName} </td>
                <td className="p-4"> {product?.upvote} </td>
                {/* status */}
                <td className="p-4">
                  <p
                    className={`${
                      product?.status === "pending"
                        ? "bg-yellow-100 text-[#F7B217]"
                        : product?.status === "accepted"
                        ? "bg-blue-100 text-[#448ADE]"
                        : product?.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : ""
                    }  w-fit px-2 py-1 text-[12px] rounded-md font-bold uppercase`}
                  >
                    {product?.status}
                  </p>
                </td>

                <td className="p-4">
                  <Link to={`/dashboard/update/${product._id}`}>
                    <div className="px-4 bg-[var(--bg-secondary)] w-fit py-1 rounded-sm text-lg cursor-pointer hover:scale-110 duration-500">
                    <MdEdit />
                    </div>
                  </Link>
                </td>
                  
                <td className="p-4" >
                    <div className="px-4 bg-red-100 text-red-500 w-fit py-1 rounded-sm text-lg cursor-pointer hover:scale-110 duration-500" onClick={() => handleDeleteProduct(product._id)}>
                    <MdOutlineDelete />
                    </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProduct;
