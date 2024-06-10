import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedProducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await axiosSecure("/reported");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading ....</div>;
  }
  console.log(products);

  // to delete reportedProduct product
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
        axiosSecure.delete(`/deleteProduct/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              iconColor: "#448ADE",
              confirmButtonColor: "#448ADE",
              title: "Product Deleted Successful",
              timer: 2500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 py-10 lg:py-12">
      <div className="relative flex flex-col w-full h-full overflow-scroll max-h-[90vh] text-[var(--clr-secondary)] text-sm bg-[var(--clr-white)] shadow-md bg-clip-border rounded-lg">
        <table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr className="font-normal border-b border-[var(--clr-light-gray)] bg-[var(--bg-secondary)] text-[var(--clr-primary)]">
              <th className="p-4">Product Name</th>
              <th className="p-4">Details</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr key={product._id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{product?.productName}</td>
                  {/* details field */}
                  <td className="p-4">
                    <Link to={`/details/${product._id}`}>
                      <button className="bg-[var(--bg-secondary)] px-2 py-[2px] rounded hover:scale-110 duration-500 font-semibold text-[12px]">
                        Details
                      </button>
                    </Link>
                  </td>

                  <td className="p-4">
                    <button
                      className="bg-red-50 text-[var(--clr-focussed)] hover:scale-110 px-2 py-0.5 rounded duration-500 font-semibold text-[12px]"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProducts;
