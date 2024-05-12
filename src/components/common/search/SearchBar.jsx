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

import BackgroundButton from "../buttons/BackgroundButton.jsx";

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

  const guestSummary = Object.keys(guests)
    .reduce((summary, key) => {
      const count = guests[key];
      if (count > 0) {
        const name = key.charAt(0).toUpperCase() + key.slice(1);
        summary.push(`${count} ${name}${count > 1 ? "" : ""}`);
      }
      return summary;
    }, [])
    .join(", ");

  return (
    <ul className="flex flex-row justify-around border bg-cloud border-deepsea rounded-full w-full py-2 px-4  text-deepsea font-button">
      <li className="flex my-auto  hover:cursor-pointer relative">
        <MdOutlineSearch size={20} className="ml-2 my-auto" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Where to"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
          className="ml-2 outline-none bg-cloud cursor-pointer placeholder-deepsea"
        />

        {isInputFocused && filterVenues.length > 0 && (
          <ul className="absolute top-10 rounded-3xl border-b border-deepsea   text-deepsea flex flex-col w-60 bg-cloud z-50 p-4">
            {filterVenues.map((loc) => (
              <li
                key={loc}
                onClick={() => handleLocationSelect(loc)}
                className="p-2 hover:bg-deepsea hover:text-white hover:rounded-3xl cursor-pointer"
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </li>
      <div className="h-6 my-auto  border border-midnightteal/40"></div>
      <li className="flex  my-auto justify-around hover:cursor-pointer relative bg-cloud w-full max-w-40 rounded-full  py-3">
        <span className="flex">
          <MdOutlineDateRange size={20} className="my-auto" />
          <ReactDatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            showPopperArrow={false}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-in"
            popperPlacement="bottom-end"
            className="ml-2 cursor-pointer placeholder-deepsea max-w-20 bg-cloud"
          />
        </span>
      </li>{" "}
      <div className="h-6 my-auto  border border-midnightteal/40"></div>{" "}
      <li className="flex  my-auto justify-around hover:cursor-pointer relative bg-cloud w-full max-w-40   rounded-full  py-3">
        <span className="flex">
          <MdOutlineDateRange size={20} className="my-auto" />

          <ReactDatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            showPopperArrow={false}
            popperPlacement="bottom-start"
            minDate={
              checkInDate ? add(new Date(checkInDate), { days: 1 }) : new Date()
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-out"
            className=" ml-2 cursor-pointer placeholder-deepsea max-w-20 bg-cloud"
          />
        </span>
      </li>
      <div className="h-6 my-auto  border border-midnightteal/40"></div>
      <li className="flex items-center relative">
        <MdOutlinePermIdentity size={20} className="ml-2 my-auto" />
        <button
          ref={buttonRef}
          onClick={toggleGuestsDropdown}
          className="mx-2 w-full flex flex-row justify-start"
        >
          {guestSummary || "Who?"}
        </button>
        {isGuestsOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-14 rounded-3xl border-b border-deepsea   text-deepsea flex flex-col w-60 bg-cloud z-50 p-4"
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
      <li className="my-auto">
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
