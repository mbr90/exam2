import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { add, differenceInCalendarDays } from "date-fns";
import {
  useSearchActions,
  useSearchStoreState,
} from "../../stores/useSearchStore";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import BackgroundButton from "../common/buttons/BackgroundButton";
import { formatCurrency } from "../../utils/formatCurrency";
import { useMutation } from "@tanstack/react-query";
import postEnquiry from "../../api/post/postEnquiry";
import { capitalizeKeys } from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
  })
  .required();

export default function EnquiryForm(data) {
  const { setCheckInDate, setCheckOutDate, setGuests } = useSearchActions();
  const { checkInDate, checkOutDate, guests } = useSearchStoreState();
  const [isGuestsOpen, setGuestsOpen] = useState(false);
  const enquireMutation = useMutation({
    mutationFn: postEnquiry,
    onSuccess: () => {
      alert(
        "Your reservation has been sent, you will recieve an email upon confirmation!"
      );
      navigate("/");
    },
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: guests.adults || 0,
      children: guests.children || 0,
      pets: guests.pets || 0,
    },
  });

  const onSubmit = (formData) => {
    const submissionData = {
      ...capitalizeKeys(formData),
      CheckIn: checkInDate.toISOString(),
      CheckOut: checkOutDate.toISOString(),
      Guests: guests,
      Venue: {
        connect: { id: data.data.id },
      },
    };

    enquireMutation.mutate(submissionData);
    reset();
  };

  const openGuests = () => {
    setGuestsOpen(true);
  };

  const closeGuests = () => {
    setGuestsOpen(false);
  };

  const handleParticipantChange = (type, operation) => {
    const maxValue = 20;
    setGuests((currentGuests) => {
      let newCount = currentGuests[type];

      if (operation === "increment" && newCount < maxValue) {
        newCount++;
      } else if (operation === "decrement" && newCount > 0) {
        newCount--;
      }

      const updatedGuests = {
        ...currentGuests,
        [type]: newCount,
      };

      if (
        (updatedGuests.pets > 0 ||
          updatedGuests.infants > 0 ||
          updatedGuests.children > 0) &&
        updatedGuests.adults < 1
      ) {
        updatedGuests.adults = 1;
      }

      return updatedGuests;
    });
  };

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

  const price = data.data.attributes.Price;
  const nights = differenceInCalendarDays(checkOutDate, checkInDate);

  function calcTotalPrice() {
    const totalPrice = nights * price;
    if (nights) return totalPrice;
  }

  return (
    <div className="mt-4 pb-40 max-w-96 mx-auto">
      <ul className="flex flex-col gap-4">
        <li className="flex my-auto justify-around hover:cursor-pointer relative bg-cloud w-full rounded-full border border-deepsea py-3 shadow-md">
          <span className="flex">
            <ReactDatePicker
              selected={checkInDate}
              onChange={setCheckInDate}
              showPopperArrow={false}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Check-in"
              popperPlacement="bottom-end"
              className="ml-2 cursor-pointer placeholder-deepsea max-w-20 bg-cloud"
            />
          </span>
          <div className="h-6 my-auto border border-midnightteal/40"></div>
          <span className="flex">
            <ReactDatePicker
              selected={checkOutDate}
              onChange={setCheckOutDate}
              showPopperArrow={false}
              popperPlacement="bottom-start"
              minDate={checkInDate ? add(checkInDate, { days: 1 }) : new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Check-out"
              className="ml-2 cursor-pointer placeholder-deepsea max-w-20 bg-cloud"
            />
          </span>
        </li>
        <li
          className={`${
            isGuestsOpen
              ? "flex my-auto hover:cursor-pointer relative bg-cloud w-full rounded-full border-deepsea p-3"
              : "flex my-auto hover:cursor-pointer relative bg-cloud w-full rounded-full border border-deepsea p-3 shadow-md"
          }`}
          onClick={openGuests}
        >
          <span className="ml-2 w-full flex justify-start">
            {guestSummary || "Who?"}
          </span>
          {isGuestsOpen && (
            <div className="absolute top-0 w-full right-0 bg-cloud border border-deepsea rounded-3xl p-2 shadow-md">
              <button
                className="absolute top-0 right-3 mt-2 mr-2 text-white bg-tigerlily font-bold py-1 px-3 rounded-3xl hover:bg-deepsea "
                onClick={(event) => {
                  event.stopPropagation();
                  closeGuests();
                }}
              >
                Done
              </button>
              <h1 className="flex mt-1">
                <span className="ml-2">Who?</span>
              </h1>

              {Object.keys(guests).map((type) => (
                <div
                  key={type}
                  className="flex justify-between items-center ml-4 my-1"
                >
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleParticipantChange(type, "decrement")}
                      className="p-1"
                    >
                      <MdRemoveCircleOutline size={24} />
                    </button>
                    <span className="mx-2">{guests[type]}</span>
                    <button
                      onClick={() => handleParticipantChange(type, "increment")}
                      className="p-1"
                    >
                      <MdAddCircleOutline size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
        {!isNaN(nights) && (
          <div className="flex gap-2 text-deepsea font-button">
            <p>{formatCurrency(price)}</p>
            <span>x</span>
            <p>{nights} nights</p>
          </div>
        )}
      </ul>
      <div className="mt-10 flex flex-col gap-2 border-t border-midnightteal pt-4">
        {!isNaN(nights) && (
          <div className="flex justify-between first-line:font-text text-deepsea font-semibold mb-4">
            <p>Total:</p> <span>{formatCurrency(calcTotalPrice())}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className="flex flex-col gap-3 items-center justify-center font-button text-xl"
            disabled={enquireMutation.isLoading}
          >
            {enquireMutation.isError && (
              <div className="text-red-500">
                {enquireMutation.error.message}
              </div>
            )}
            <input
              placeholder="Name"
              className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
              {...register("name")}
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
            <input
              placeholder="Email"
              className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
              {...register("email")}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
            <BackgroundButton
              text={enquireMutation.isLoading ? "RESERVING..." : "RESERVE"}
              type="submit"
              disabled={enquireMutation.isLoading}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
