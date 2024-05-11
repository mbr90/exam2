import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const VenueCard = ({ venue }) => {
  // TODO: remove localhost when going to production
  // const imageUrl = venue.attributes?.Media?.data?.[0]?.attributes?.url
  //   ? `http://localhost:1337${venue.attributes.Media.data[0].attributes.url}`
  //   : "/images/default-image.jpg";

  const imageUrl = venue.attributes?.Media?.data?.[0]?.attributes?.url
    ? `${venue.attributes.Media.data[0].attributes.url}`
    : "/images/default-image.jpg";

  const formattedPrice = formatCurrency(venue.attributes?.Price || 0);
  const title = venue.attributes?.Title || "Default Venue";
  const description =
    venue.attributes?.Description || "No description available.";

  return (
    <div className="border rounded-lg shadow-md col-span-4 pc:col-span-3 flex flex-col pb-2">
      <Link to={`/venue/${venue.id}`}>
        <img
          className="w-full h-[271px] object-cover"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
        />
        <div className="p-8">
          <h1 className="text-xl font-header mb-2">{title}</h1>
          <p className="font-text">{description}</p>
          <p className="text-tigerlily font-button mt-2">
            Price per night: {formattedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      Price: PropTypes.number,
      Media: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            attributes: PropTypes.shape({
              url: PropTypes.string,
            }),
          })
        ),
      }),
    }),
  }),
};

export default VenueCard;
