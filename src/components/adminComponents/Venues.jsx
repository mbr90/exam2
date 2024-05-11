import VenueForm from "../forms/VenueForm.jsx";
import useFetchVenues from "../../hooks/useFetchVenues";
import VenueCard from "../cards/VenueCard.jsx";
import BorderButton from "../common/buttons/BorderButton.jsx";
import deleteVenue from "../../api/delete/deleteVenue";
import { useToken } from "../../stores/useUserStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Venues() {
  const queryClient = useQueryClient();
  const { isPending, error, venues } = useFetchVenues();
  const token = useToken();

  const handleDelete = (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    deleteVenue({ id: venueId, token })
      .then(() => {
        alert("Venue deleted successfully.");

        queryClient.invalidateQueries(["venues"]);
      })
      .catch((error) => {
        alert(`Failed to delete venue: ${error.message}`);
      });
  };

  return (
    <div className=" w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8 max-w-[1636px]">
      <h1>List a venue</h1>
      <VenueForm />

      {isPending ? (
        <div className="col-span-full text-center">Loading results...</div>
      ) : error ? (
        <div className="col-span-full text-center">{error.message}</div>
      ) : (
        <div className="col-span-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 my-12 border-t border-ash pt-8 ">
          <h2 className="col-span-full">Delete Venues</h2>
          {venues.data.map((venue) => (
            <div
              key={venue.id}
              className=" col-span-4 pc:col-span-3 flex flex-col pb-2 relative"
            >
              <VenueCard venue={venue} />
              <span className="absolute top-0 right-0 m-2 ">
                <BorderButton
                  text="DELETE"
                  onClick={() => handleDelete(venue.id)}
                />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
