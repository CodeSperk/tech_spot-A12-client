import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { BiSolidUpvote } from "react-icons/bi";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    isPending,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["fProducts"],
    queryFn: async () => {
      const res = await axiosPublic("/featured");
      return res.data;
    },
  });
  {
    isPending && <div> Loading ...</div>;
  }

  const handleUpvote = (product) => {
    if (!user) {
      return navigate("/login");
    }

    if (product?.votedUsers?.includes(user.email)) {
      Swal.fire({
        icon: "error",
        text: "You have already voted for this product",
      });
    }

    const currentVote = product.upvote + 1;
    const newProduct = {
      currentVote,
      email: user.email,
    };

    axiosPublic.patch(`/product/${product._id}`, newProduct).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      {/* Products */}
      <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border py-6 rounded-xl shadow-md hover:shadow-sm px-4 lg:px-6"
          >
            {/* Name and vote */}
            <div className="flex items-center justify-between">
            <Link to={`/details/${product._id}`}>
              <h5 className="hover:text-[var(--clr-focussed)] hover:underline cursor-pointer">
                {product.productName}
              </h5>
              </Link>
             
                <button
                  className="border border-[var(--clr-focussed)] text-[var(--clr-focussed)] rounded-md text-sm px-2 flex items-center gap-2 font-semibold"
                  title="Vote Now"
                  onClick={() => handleUpvote(product)}
                  disabled={product.ownerEmail === user?.email}
                >
                  {product?.upvote} <BiSolidUpvote />
                </button>
            </div>

            {/* Product Image */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-6 my-6">
              <div className="h-40 mx-auto">
                <img
                  src={product.productImage}
                  alt=""
                  className="rounded-xl h-full w-auto mx-auto"
                />
              </div>
            </div>

            {/* tags */}
            <div className="flex gap-4 flex-wrap">
              {product?.tags.map((tag, idx) => (
                <small
                  key={idx}
                  className="text-[var(--clr-secondary)] font-medium text-sm"
                >
                  {tag}
                </small>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
