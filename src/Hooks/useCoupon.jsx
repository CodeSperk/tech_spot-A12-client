import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupon = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isCouponLoading,
    data: coupons = [],
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coupons");
      return res.data;
    },
  });

  return [isCouponLoading, coupons, refetch];
};

export default useCoupon;