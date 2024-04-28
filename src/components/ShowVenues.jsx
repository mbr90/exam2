import useFetchData from "../hooks/useFetchData";

import VenueCard from "./VenueCard";

export default function ShowVenues() {
  const { data, isLoading, isError } = useFetchData(
    "/venues?populate=MainImage"
  );

  if (isLoading) {
    return <div>Loading results..</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    // <div className="flex flex-wrap gap-8 mx-auto">
    <div className="w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8">
      {data.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
