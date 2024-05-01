import { useQuery } from "@tanstack/react-query";
import VenueCard from "./VenueCard";
import fetchVenues from "../api/get/fetchVenues";

const endpoint = "/venues?populate=MainImage";

export default function ShowVenues() {
  const {
    isPending,
    error,
    data: venues,
  } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchVenues(endpoint),
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return <div>Loading results..</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8 ">
      {venues.data.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
