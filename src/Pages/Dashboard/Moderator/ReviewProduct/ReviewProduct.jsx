import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ReviewProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allProducts");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // sort product to display pending product first
  const sortedProducts = products.length > 0 ? products.sort((a, b) => {
    const order = { pending: 0, accepted: 1, rejected: 2};
    return order[a.status] - order[b.status];
  }) : [];
  console.log(sortedProducts);

  // to make product featured
  const handleMakeFeature = nonFeaturedId => {
    axiosSecure.patch(`/featured/${nonFeaturedId}`)
    .then(res  => {
      console.log(res.data);
      refetch();
    })
  }

  // To accept product
  const handleAcceptProduct = pendingId => {
    axiosSecure.patch(`/accepted/${pendingId}`)
    .then(res  => {
      console.log(res.data);
      refetch();
    })
  }

  // To rejected product
  const handleRejectProduct = pendingId => {
    axiosSecure.patch(`/rejected/${pendingId}`)
    .then(res  => {
      console.log(res.data);
      refetch();
    })
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 py-10 lg:py-12">
      <div className="relative flex flex-col w-full h-full overflow-scroll max-h-[90vh] text-[var(--clr-secondary)] text-sm bg-[var(--clr-white)] shadow-md bg-clip-border rounded-lg">
        <table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr className="font-normal border-b border-[var(--clr-light-gray)] bg-[var(--bg-secondary)] text-[var(--clr-primary)]">
              <th className="p-4">Product Name</th>
              <th className="p-4">Details</th>
              <th className="p-4">Make  Feature</th>
              <th className="p-4">Accept Product</th>
              <th className="p-4">Reject Product</th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.length > 0 &&
              sortedProducts.map((product) => (
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
                  {/* Make featured */}
                  <td className="p-4">
                    <button className={`${product?.featured ? "bg-gray-200 text-[var(--clr-secondary)]" : "bg-blue-50 text-blue-500 hover:scale-110"} px-2 py-[2px] rounded duration-500 font-semibold text-[12px]`}
                    disabled={product?.featured}
                    onClick={() => handleMakeFeature(product._id)}
                    >
                      {product?.featured ? "Featured" : "Make Featured"}
                    </button>
                  </td>

                   {/* Accept product */}
              <td className="p-4">
                <button className={`${product?.status === "accepted"? "bg-gray-200 text-[var(--clr-secondary)]"  : "bg-orange-50 text-orange-500 hover:scale-110" }  px-2 py-[2px] rounded  duration-500 font-semibold text-[12px]`}
                disabled={product?.status === "accepted"}
                onClick={() => handleAcceptProduct(product._id)}
                >
                  {product?.status === "pending" ? "Pending" : product?.status === "accepted" ? "Accepted" : ""}
                </button>
              </td>

              {/* Reject product */}
              <td className="p-4">
                <button className={`${product?.status === "rejected"? "bg-gray-200 text-[var(--clr-secondary)]"  : "bg-orange-50 text-orange-500 hover:scale-110" }  px-2 py-[2px] rounded  duration-500 font-semibold text-[12px]`}
                disabled={product?.status === "rejected"}
                onClick={() => handleRejectProduct(product._id)}
                >
                  {product?.status === "pending" ? "Pending" : product?.status === "rejected" ? "Rejected" : ""}
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

export default ReviewProduct;
