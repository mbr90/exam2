import { useToken } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import authorizedFetch from "../api/get/authorizedFetch";

const useAuthorizedFetch = (endpoint, queryKey) => {
  const token = useToken();

  const { isPending, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => authorizedFetch(endpoint, token),
    staleTime: 1000 * 60 * 10,
  });

  return { data, isPending, error };
};

export default useAuthorizedFetch;
