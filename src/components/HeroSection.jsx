import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function HeroSection({ venues = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterVenues = venues.filter((venue) =>
    venue.attributes?.Title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col relative">
      <div className=" text-cloud overflow-hidden max-h-[600px]">
        <img
          src="/images/banner.png"
          alt="Hero Image"
          className="w-full h-full"
        />
        <div className="absolute inset-x-0 bottom-0 mb-10 flex justify-center">
          <div className="inline-flex shadow-lg relative">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 border-2 text-black border-gray-300 rounded-l-md focus:outline-none focus:border-salmon"
            />{" "}
            {filterVenues.length > 0 && searchTerm.length > 0 && (
              <ul className="absolute top-11 left-1/2 transform -translate-x-1/2  text-black flex flex-col  w-64 bg-white z-50 p-2">
                {filterVenues.map((venue) => {
                  return (
                    <li
                      key={venue.id}
                      className="p  -2 hover:border-solid hover:border-2 border-salmon"
                    >
                      <Link to={`/venue/${venue.id}`}>
                        {venue.attributes.Title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        Title: PropTypes.string,
      }),
    })
  ),
};
