import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

export default function HeroSection({ venues }) {
  return (
    <div className="flex flex-col relative">
      <div className=" text-cloud overflow-hidden max-h-[600px]">
        <img
          src="/images/banner.png"
          alt="Hero Image"
          className="w-full h-full"
        />
        <div className="absolute inset-x-0 bottom-0 mb-10 flex justify-center">
          <span className="bg-white rounded-full">
            <SearchBar venues={venues} />
          </span>
        </div>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  venues: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        attributes: PropTypes.shape({
          Title: PropTypes.string,
        }),
      })
    ),
    PropTypes.object, // If there might be a chance it could be an object
  ]),
};
