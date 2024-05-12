import fetchVenues from "../api/get/fetchVenues";
import { useQuery } from "@tanstack/react-query";

const useFetchVenues = () => {
  const endpoint = "/venues?populate=*";
  const {
    isPending,
    error,
    data: venues,
  } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchVenues(endpoint),
    staleTime: 1000 * 60 * 10,
  });

  return { venues, isPending, error };
};

export default useFetchVenues;
