import VenueForm from "../forms/VenueForm";
import useFetchVenues from "../../hooks/useFetchVenues";
import VenueCard from "../cards/VenueCard";
import BorderButton from "../common/buttons/BorderButton";

export default function Venues() {
  const { isPending, error, venues } = useFetchVenues();

  return (
    <div className=" w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8 max-w-[1636px]">
      <h1>List a venue</h1>
      <VenueForm />

      {isPending ? (
        <div className="col-span-full text-center">Loading results...</div>
      ) : error ? (
        <div className="col-span-full text-center">{error.message}</div>
      ) : (
        <div className="col-span-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 my-12">
          <h2 className="col-span-full">Venues</h2>
          {venues.data.map((venue) => (
            <div
              key={venue.id}
              className="border rounded-lg shadow-md col-span-4 pc:col-span-3 flex flex-col pb-2"
            >
              <VenueCard venue={venue} />
              <BorderButton />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
