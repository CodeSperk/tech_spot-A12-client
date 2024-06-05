import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Products = () => {

  const axiosPublic = useAxiosPublic();

  const {isLoading, data: products = []} = useQuery({
    queryKey:['acceptedProducts'],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    }
  })

  console.log(products);


  return (
    <div>
      {
      isLoading ? (<div>Loading </div>) : (
        <div> {products.length} </div>
      )
      }
    </div>
  );
};

export default Products;