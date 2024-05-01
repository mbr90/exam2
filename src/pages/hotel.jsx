import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import fetchVenues from "../api/get/fetchVenues";
import { useQuery } from "@tanstack/react-query";

export default function Hotel() {
  const params = useParams();
  const endpoint = `/venues/${params.id}`;

  const {
    isPending,
    error,
    data: venue,
  } = useQuery({
    queryKey: ["venue", `${params.id}`],
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
    <main>
      <Helmet>
        <title>Venue {params.id}</title>
        <meta name="description" content="Our venues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <h1 className="text-3xl font-bold underline">
        {venue?.data.attributes?.Title}
      </h1>
      <p>{venue?.data.attributes?.Description}</p>
    </main>
  );
}
