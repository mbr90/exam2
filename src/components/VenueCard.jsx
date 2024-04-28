import PropTypes from "prop-types";

const VenueCard = ({ venue }) => {
  const imageUrl = `http://localhost:1337${venue.attributes.MainImage.data.attributes.url}`; // Adjust URL as necessary
  return (
    <div className="border rounded-lg shadow-md col-span-4 pc:col-span-3 flex flex-col gap-2 pb-2">
      <img
        className=" w-full h-[271px] object-cover"
        src={imageUrl}
        alt={venue.attributes.Title}
      />
      <h1 className="text-xl">{venue.attributes.Title}</h1>
      <p>{venue.attributes.Description}</p>
      <p className="text-tigerlily">150 Nok</p>
    </div>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    attributes: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      MainImage: PropTypes.shape({
        data: PropTypes.shape({
          attributes: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default VenueCard;
