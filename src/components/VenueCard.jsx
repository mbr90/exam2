import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const imageUrl = `http://localhost:1337${venue.attributes.MainImage.data.attributes.url}`; // TODO: REMOVE LOCALHOST WHEN GOING TO PROD, THE CORRECT URL IS FETCHED FROM PROD API...
  return (
    <div className="border rounded-lg shadow-md col-span-4 pc:col-span-3 flex flex-col pb-2">
      <Link to={`/venue/${venue.id}`}>
        <img
          className=" w-full h-[271px] object-cover"
          src={imageUrl}
          alt={venue.attributes.Title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
        />
        <div className="p-8">
          <h1 className="text-xl mb-2">{venue.attributes.Title}</h1>
          <p>{venue.attributes.Description}</p>
          <p className="text-tigerlily mt-2">150 Nok</p>
        </div>
      </Link>
    </div>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Added id validation
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
