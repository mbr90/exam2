import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import fetchVenues from "../api/get/fetchVenues";
import { useQuery } from "@tanstack/react-query";
import SingleVenueCard from "../components/cards/SingleVenueCard";

export default function Hotel() {
  const params = useParams();
  const endpoint = `/venues/${params.id}?populate=*`;

  const {
    isPending,
    error,
    data: venue,
  } = useQuery({
    queryKey: ["venue", `${params.id}`],
    queryFn: () => fetchVenues(endpoint),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main>
      <Helmet>
        <title>Venue {params.id}</title>
        <meta name="description" content="Our venues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>

      {isPending ? (
        <div className="col-span-full text-center">Loading results...</div>
      ) : error ? (
        <div className="col-span-full text-center">{error.message}</div>
      ) : (
        <SingleVenueCard data={venue?.data} />
      )}
    </main>
  );
}
