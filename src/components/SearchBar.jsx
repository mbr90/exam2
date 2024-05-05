import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add } from "date-fns";
import {
  MdOutlineSearch,
  MdOutlineDateRange,
  MdOutlinePermIdentity,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import {
  useSearchActions,
  useSearchStoreState,
} from "../stores/useSearchStore";

import BackgroundButton from "./common/buttons/BackgroundButton";

export default function SearchBar({ venues }) {
  const {
    setLocation,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    clearSearchStore,
  } = useSearchActions();
  const { location, checkInDate, checkOutDate, guests } = useSearchStoreState();
  const [isGuestsOpen, setGuestsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const toggleGuestsDropdown = () => {
    setGuestsOpen((prev) => !prev);
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setIsInputFocused(false);
  };

  const uniqueLocations = Array.from(
    new Set(venues?.data.map((venue) => venue.attributes?.Location))
  );

  const filterVenues = uniqueLocations.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleParticipantChange = (type, operation) => {
    const maxValue = 20;
    setGuests((currentGuests) => {
      const currentValue = currentGuests[type];
      return {
        ...currentGuests,
        [type]:
          operation === "increment"
            ? currentValue < maxValue
              ? currentValue + 1
              : currentValue
            : currentValue > 0
            ? currentValue - 1
            : 0,
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setGuestsOpen(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (checkInDate && (!checkOutDate || checkOutDate <= checkInDate)) {
      const newCheckOutDate = add(new Date(checkInDate), { days: 1 });
      setCheckOutDate(newCheckOutDate);
    }
  }, [checkInDate, checkOutDate, setCheckOutDate]);

  return (
    <div className="flex flex-col w-full">
      <ul className="flex gap-2 mx-auto border-solid border-2 border-black p-4 rounded-full">
        <li className="flex clear-start hover:cursor-pointer relative">
          <MdOutlineSearch />
          <input
            ref={inputRef}
            type="text"
            placeholder="Where to"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
            className="ml-2 outline-none cursor-pointer"
          />

          {isInputFocused && filterVenues.length > 0 && (
            <ul className="absolute top-11 left-1/2 transform -translate-x-1/2 text-black flex flex-col w-64 bg-white z-50 p-2">
              {filterVenues.map((loc) => (
                <li
                  key={loc}
                  onClick={() => handleLocationSelect(loc)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="flex hover:cursor-pointer">
          <MdOutlineDateRange />
          <ReactDatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-in"
            className="cursor-pointer"
          />
        </li>
        <li className="flex hover:cursor-pointer">
          <MdOutlineDateRange />
          <ReactDatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            minDate={
              checkInDate ? add(new Date(checkInDate), { days: 1 }) : new Date()
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-out"
            className="ml-2 outline-none cursor-pointer"
          />
        </li>
        <li className="flex items-center relative">
          <MdOutlinePermIdentity />
          <button
            ref={buttonRef}
            onClick={toggleGuestsDropdown}
            className="ml-2"
          >
            Who?
          </button>
          {isGuestsOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full  bg-cloud border border-ash rounded-lg p-2 shadow-lg"
            >
              {Object.keys(guests).map((type) => (
                <div
                  key={type}
                  className="flex justify-between items-center my-1"
                >
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <div className="flex items-center">
                    <span className="text-deepsea">
                      <button
                        onClick={() =>
                          handleParticipantChange(type, "decrement")
                        }
                        className="p-1"
                      >
                        <MdRemoveCircleOutline size={24} />
                      </button>
                    </span>

                    <span className="mx-2">{guests[type]}</span>
                    <button
                      onClick={() => handleParticipantChange(type, "increment")}
                      className="p-1"
                    >
                      <span className="text-deepsea">
                        <MdAddCircleOutline size={24} />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
        <li>
          <BackgroundButton text={"Clear"} onClick={() => clearSearchStore()} />
        </li>
      </ul>
    </div>
  );
}

SearchBar.propTypes = {
  venues: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        attributes: PropTypes.shape({
          Location: PropTypes.string,
        }),
      })
    ),
  }),
};
