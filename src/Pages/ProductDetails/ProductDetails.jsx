// import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiUpvote } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineReportGmailerrorred } from "react-icons/md";
import useUpvote from "../../Hooks/useUpvote";
import useAuth from "../../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {handleUpvote} = useUpvote();

  // to get single data
  const { isPending, data: product = {} } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });
  isPending && <div>Loading ....</div>;
  const {
    ownerName,
    ownerEmail,
    productName,
    externalLinks,
    productImage,
    tags,
    description,
    upvote,
  } = product;

  console.log(product);
  return (
    <div className="">
      {/* Product Details Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 bg-[var(--bg-secondary)] py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-2 md:gap-10">
          <div className="flex-1">
            {/* product Image & Name */}
            <div className="flex gap-4">
              <div className="w-32 rounded-md">
                <img src={productImage} alt="" className="rounded-md" />
              </div>
              <div>
                <h2>{productName}</h2>
                <span>by {ownerName}</span>
              </div>
            </div>

            {/* description */}
            <p className="mt-2">{description}</p>
          </div>

          {/* tags */}
          <div
            className="md:w-36 flex flex-wrap justify-end gap-2 
              "
          >
            {tags && tags.map((item, idx) => (
              <div
                key={idx}
                className="border border-[var(--clr-light-gray)] text-[var(--clr-secondary)] px-2 rounded-md text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="border-2 border-[var(--clr-focussed)] text-[var(--clr-focussed)] font-medium rounded hover:scale-105 duration-300 w-32">
            <a href={externalLinks}>Visit</a>
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32"
          onClick={() => handleUpvote(product)} 
          disabled={ownerEmail === user?.email}
          >
            {" "}
            <BiUpvote /> upvote {upvote}
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32">
            {" "}
            <MdOutlineReportGmailerrorred /> Report
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32">
            {" "}
            <MdDeleteOutline /> Delete
          </button>
        </div>
      </section>

      {/* Review section */}
      <section></section>
    </div>
  );
};

export default ProductDetails;
