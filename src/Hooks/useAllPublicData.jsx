import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPublicData = (endpointURL) => {
  const axiosPublic = useAxiosPublic();

  const {
    isLoading,
    data: allData = [],
    refetch,
  } = useQuery({
    queryKey: ["allPublicData", endpointURL],
    queryFn: async () => {
      const res = await axiosPublic.get(endpointURL);
      return res.data;
    },
  });

  return [isLoading, allData, refetch];
};

export default useAllPublicData;
