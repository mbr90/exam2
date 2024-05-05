import { useState, useEffect, useRef } from "react";
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

export default function SearchBar() {
  const { setLocation, setCheckInDate, setCheckOutDate, setGuests } =
    useSearchActions();
  const { location, checkInDate, checkOutDate, guests } = useSearchStoreState();
  const [isGuestsOpen, setGuestsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleGuestsDropdown = () => {
    setGuestsOpen((prev) => !prev);
  };

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
        !buttonRef.current.contains(event.target)
      ) {
        setGuestsOpen(false);
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
        <li className="flex clear-start hover:cursor-pointer">
          <MdOutlineSearch />
          <input
            type="text"
            placeholder="Where to"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="ml-2 outline-none cursor-pointer"
          />
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
      </ul>
    </div>
  );
}
