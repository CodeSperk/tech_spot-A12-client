import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import TrendingProductCard from "./TrendingProductCard";
import { Link } from "react-router-dom";

const Trending = () => {
  const axiosPublic = useAxiosPublic();

  const {_id, isPending, data: trending = [] } = useQuery({
    queryKey: ["TrendingP"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trending");
      return res.data;
    },
  });
  {
    isPending && <div> Loading ...</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-8 md:mt-10">
      {/* aside */}
      <div className="relative hidden lg:flex flex-col justify-between  bg-[var(--clr-white)] rounded-lg p-10">
        <div>
          <h3>Brows these best trending products.</h3>
          <p className="mt-4">
            The Trending section features the most popular and in-demand
            products, highlighting what's currently hot and top-rated.{" "}
          </p>
        </div>

        <Link to={`/product/${_id}`}>
        <button className="btn1 py-4 bg-[var(--clr-focussed)] text-white">
          View All Products
        </button>
        </Link>
        <div className="absolute h-full w-full border-2 border-dashed top-4 left-4 -z-10">
          {" "}
        </div>
      </div>

      {/* Trending cards */}
      <div className="lg:col-span-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {trending?.map((item) => (
          <TrendingProductCard
            key={item._id}
            product={item}
          ></TrendingProductCard>
        ))}
      </div>
    </div>
  );
};

export default Trending;
