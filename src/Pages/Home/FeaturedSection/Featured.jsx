import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Featured = () => {
  const axiosPublic = useAxiosPublic();

  const {isPending, data: products = [] } = useQuery({
    queryKey:["fProducts"],
    queryFn: async () => {
      const res = await axiosPublic("/featured");
      return res.data;
    }
  })

  {
    isPending && <div> Loading ...</div>
  }
  console.log(products);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      {/* Section Title */}
      <header className="text-center">
        <h2>Featured Products</h2>
        <div className="bg-[var(--clr-focussed)] h-1 w-28 mx-auto mt-4"></div>
      </header>
      
      {/* Products */}
      <div>

      </div>

    </div>
  );
};

export default Featured;