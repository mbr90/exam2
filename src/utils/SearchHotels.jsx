import { Link } from "react-router-dom";
import { useState } from "react";

export function SearchHotels(venues) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterVenues = venues.filter((venue) =>
    venue.attributes?.Title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
  );
}
