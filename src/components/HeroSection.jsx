import PropTypes from "prop-types";
import SearchBar from "./common/search/SearchBar.jsx";
import MobileSearch from "./common/search/MobileSearch.jsx";

export default function HeroSection({ venues }) {
  return (
    <div className="flex flex-col relative">
      <div className="absolute inset-x-0 top-0 mt-10 flex justify-center tablet:hidden pc:hidden">
        <img
          src="/logo/Holidaze.svg"
          alt="Holidae Logo"
          className="w-auto h-[74px]"
        />
      </div>
      <div className=" text-cloud overflow-hidden w-full h-[536px]  pc:max-h-[636px]">
        <img
          src="/images/banner.jpg"
          alt="Hero Image"
          className="w-full h-full  object-cover object-right  "
        />
        <div className="absolute inset-x-0 bottom-0 mb-10 flex justify-center">
          <span className="bg-white rounded-full hidden  pc:block">
            <SearchBar venues={venues} />
          </span>
          <span className="bg-white rounded-full max-w-[70%]   pc:hidden">
            <MobileSearch venues={venues} />
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
    PropTypes.object,
  ]),
};
