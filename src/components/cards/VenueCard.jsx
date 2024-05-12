import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { LuDot } from "react-icons/lu";

const VenueCard = ({ venue }) => {
  const imageUrl = venue.attributes?.Media?.data?.[0]?.attributes?.url
    ? `${venue.attributes.Media.data[0].attributes.url}`
    : "/images/hotel6.jpg";

  const formattedPrice = formatCurrency(venue.attributes?.Price || 0);
  const title = venue.attributes?.Title || "Default Venue";
  const description =
    venue.attributes?.Description || "No description available.";

  const petFriendly = venue.attributes.PetFriendly;

  return (
    <div className=" rounded-t-3xl   col-span-4 pc:col-span-3 flex flex-col pb-2 mx-auto">
      <Link to={`/venue/${venue.id}`}>
        <img
          className="w-full h-[271px] object-cover rounded-t-3xl"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
        />
        <div className="">
          <h1 className="text-xl font-header mt-4 px-2 text-deepsea font-semibold">
            {title}
          </h1>
          <ul className="flex flex-wrap  text-[12px] col-span-full  mx-auto w-full">
            <li className=" flex h-8 font-header font-bold text-deepsea ">
              <LuDot className="my-auto" size={20} />
              <span className="my-auto">
                {" "}
                {venue.attributes.NumberOfBedrooms} BEDROOM
              </span>
            </li>
            <li className="flex font-header font-bold text-deepsea ">
              <LuDot className="my-auto" size={20} />
              <span className="my-auto">
                {" "}
                {venue.attributes.NumberOfBeds} BEDS
              </span>
            </li>
            <li className="flex font-header font-bold text-deepsea">
              <LuDot className="my-auto" size={20} />
              <span className="my-auto">
                {" "}
                {venue.attributes.NumberOfBathrooms} BATHS
              </span>
            </li>
            <li className="flex font-header font-bold text-deepsea ">
              {petFriendly && (
                <>
                  <LuDot className="my-auto" size={20} />
                  <span className="my-auto"> PET-FRIENDLY </span>
                </>
              )}
            </li>
          </ul>

          <p className="font-button text-charcoal text-sm h-20 overflow-hidden  pl-2">
            {description}
          </p>
          <p className="text-tigerlily font-button mt-1 pl-2 pb-4">
            {formattedPrice} <span className="text-charcoal">/Night</span>
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
      NumberOfBedrooms: PropTypes.number,
      NumberOfBeds: PropTypes.number,
      NumberOfBathrooms: PropTypes.number,
      PetFriendly: PropTypes.bool,
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
  }).isRequired,
};
export default VenueCard;
