export function isVenueAvailable(venue, checkInDate, checkOutDate) {
  if (!venue.attributes.bookings.data.length) return true;

  const checkIn =
    typeof checkInDate === "string" ? new Date(checkInDate) : checkInDate;
  const checkOut =
    typeof checkOutDate === "string" ? new Date(checkOutDate) : checkOutDate;

  return venue.attributes.bookings.data.every((booking) => {
    const bookingStart = new Date(booking.attributes.startDate);
    const bookingEnd = new Date(booking.attributes.endDate);

    return checkOut < bookingStart || checkIn > bookingEnd;
  });
}
