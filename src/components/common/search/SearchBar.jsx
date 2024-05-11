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
} from "../../../stores/useSearchStore";

import BackgroundButton from "../buttons/BackgroundButton";

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
      let newCount = currentGuests[type];

      if (operation === "increment") {
        newCount = newCount < maxValue ? newCount + 1 : newCount;
      } else if (operation === "decrement") {
        newCount = newCount > 0 ? newCount - 1 : 0;
      }

      const updatedGuests = {
        ...currentGuests,
        [type]: newCount,
      };

      if (
        (updatedGuests.pets > 0 ||
          updatedGuests.infants > 0 ||
          updatedGuests.children) &&
        updatedGuests.adults < 1
      ) {
        updatedGuests.adults = 1;
      }

      return updatedGuests;
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
    <ul className="flex flex-row gap-2 mx-auto  p-4 rounded-full text-charcoal">
      <li className="flex my-auto clear-start hover:cursor-pointer relative">
        <MdOutlineSearch />
        <input
          ref={inputRef}
          type="text"
          placeholder="Where to"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
          className="ml-2 outline-none cursor-pointer placeholder-charcoal"
        />

        {isInputFocused && filterVenues.length > 0 && (
          <ul className="absolute top-11 left-1/2 transform -translate-x-1/2 text-charcoal flex flex-col w-64 bg-white z-50 p-2">
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
      <li className="flex my-auto hover:cursor-pointer">
        <MdOutlineDateRange />
        <ReactDatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Check-in"
          className="cursor-pointer placeholder-charcoal"
        />
      </li>
      <li className=" flex my-auto hover:cursor-pointer">
        <MdOutlineDateRange />
        <ReactDatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={
            checkInDate ? add(new Date(checkInDate), { days: 1 }) : new Date()
          }
          dateFormat="dd/MM/yyyy"
          placeholderText="Check-out"
          className=" flexml-2 outline-none cursor-pointer placeholder-charcoal"
        />
      </li>
      <li className="flex items-center relative">
        <MdOutlinePermIdentity />
        <button ref={buttonRef} onClick={toggleGuestsDropdown} className="ml-2">
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
                      onClick={() => handleParticipantChange(type, "decrement")}
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
