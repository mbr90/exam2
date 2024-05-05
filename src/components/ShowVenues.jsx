import VenueCard from "./cards/VenueCard";
import PropTypes from "prop-types";
import { useSearchStoreState } from "../stores/useSearchStore";
import { isVenueAvailable } from "../utils/venueAvailability";

export default function ShowVenues({ isPending, error, venues }) {
  const { location, checkInDate, checkOutDate, guests } = useSearchStoreState();

  const filteredVenues = venues?.data.filter((venue) => {
    const totalGuests = guests.adults + guests.children;
    return (
      venue.attributes.Location.toLowerCase().includes(
        location.toLowerCase()
      ) &&
      venue.attributes.Adults + venue.attributes.Children >= totalGuests &&
      isVenueAvailable(venue, checkInDate, checkOutDate)
    );
  });

  if (isPending) {
    return <div>Loading results..</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8">
      {filteredVenues.length > 0 ? (
        filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))
      ) : (
        <div>No matching venues found.</div>
      )}
    </div>
  );
}

ShowVenues.propTypes = {
  isPending: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  venues: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  }),
};
