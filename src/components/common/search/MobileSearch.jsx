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
import { IoMdClose } from "react-icons/io";

import {
  useSearchActions,
  useSearchStoreState,
} from "../../../stores/useSearchStore";

import BackgroundButton from "../buttons/BackgroundButton.jsx";

export default function MobileSearch({ venues }) {
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
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleGuestsDropdown = () => {
    setGuestsOpen((prev) => !prev);
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setIsInputFocused(false);
  };

  const mobileLocations = Array.from(
    new Set(venues?.data.map((venue) => venue.attributes?.Location))
  );

  const mobileVenues = mobileLocations.filter((loc) =>
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
    <div>
      <button
        className="text-deepsea py-3 flex  jus border w-64   border-deepsea rounded-full "
        onClick={() => {
          openModal();
        }}
      >
        <span className="flex ml-4">
          <MdOutlineSearch className="my-auto" size={26} />
          <h1 className=" ml-1 text-sm my-auto font-semibold  w-full">
            Where to?
          </h1>
        </span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-[5%] bottom-[15%] top-[10%]    bg-cloud  flex justify-center align-middle border border-deepsea rounded-3xl ">
          <div className="flex flex-col  w-full h-full items-center relative">
            <span className="absolute top-3 right-3">
              <IoMdClose
                size={28}
                className="text-deepsea hover:cursor-pointer hover:border-4 border-2 border-deepsea rounded-full"
                onClick={() => closeModal()}
              />
            </span>
            <ul className="flex flex-col gap-3 mx-auto mt-10  p-4 rounded-full text-deepsea font-text font-semibold w-full text-sm max-w-96">
              <div className="w-full flex flex-col">
                <li className="flex  my-auto  hover:cursor-pointer relative bg-cloud w-full rounded-full border border-deepsea p-3 shadow-md">
                  <MdOutlineSearch size={20} className="ml-2 my-auto" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Where to?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsInputFocused(false), 300)
                    }
                    className="ml-2 outline-none cursor-pointer placeholder-deepsea bg-cloud z-20"
                  />
                </li>

                {isInputFocused && mobileVenues.length > 0 && (
                  <ul className="transform -translate-y-14  flex flex-col w-full bg-cloud border border-deepsea rounded-3xl  py-2 pt-12 shadow-md">
                    {mobileVenues.map((loc) => (
                      <li
                        key={loc}
                        onClick={() => handleLocationSelect(loc)}
                        className="p-3 hover:bg-deepsea hover:text-white cursor-pointer rounded-3xl max-w-60 ml-8"
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <li className="flex  my-auto justify-around hover:cursor-pointer relative bg-cloud w-full rounded-full border border-deepsea py-3 shadow-md">
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
                <div className="h-6 my-auto  border border-midnightteal/40"></div>
                <span className="flex">
                  <MdOutlineDateRange size={20} className="my-auto" />

                  <ReactDatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    showPopperArrow={false}
                    popperPlacement="bottom-start"
                    minDate={
                      checkInDate
                        ? add(new Date(checkInDate), { days: 1 })
                        : new Date()
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Check-out"
                    className=" ml-2 cursor-pointer placeholder-deepsea max-w-20 bg-cloud"
                  />
                </span>
              </li>

              <li
                className={`${
                  isGuestsOpen
                    ? "flex  my-auto  hover:cursor-pointer relative bg-cloud w-full rounded-full  border-deepsea p-3"
                    : "flex  my-auto  hover:cursor-pointer relative bg-cloud w-full rounded-full border  border-deepsea p-3 shadow-md"
                }`}
              >
                <MdOutlinePermIdentity size={20} className="ml-2 my-auto" />
                <button
                  ref={buttonRef}
                  onClick={toggleGuestsDropdown}
                  className="ml-2 w-full flex justify-start"
                >
                  Who?
                </button>
                {isGuestsOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-0 w-full right-0 bg-cloud border border-deepsea rounded-3xl p-2 shadow-md"
                  >
                    <h1 className="flex mt-1">
                      {" "}
                      <MdOutlinePermIdentity
                        size={20}
                        className="my-auto ml-3"
                      />
                      <span className="ml-2"> Who?</span>
                    </h1>
                    {Object.keys(guests).map((type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center ml-4 my-1"
                      >
                        <span>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
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

                          <span className="mx-2 w-2">{guests[type]}</span>
                          <button
                            onClick={() =>
                              handleParticipantChange(type, "increment")
                            }
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
              <li className=" flex w-full justify-between mt-4">
                <span className="w-30">
                  <BackgroundButton
                    text={"Search"}
                    onClick={() => closeModal()}
                  />
                </span>
                <button
                  className="underline underline-offset-4 hover:font-bold w-24"
                  onClick={() => clearSearchStore()}
                >
                  CLEAR ALL
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

MobileSearch.propTypes = {
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
