import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import BackgroundButton from "../common/buttons/BackgroundButton.jsx";
import { LuDot } from "react-icons/lu";
import EnquiryForm from "../forms/EnquiryForm.jsx";

const amenitiesMapping = {
  AirConditioning: "Air Conditioning",
  Balcony: "Balcony",
  Dryer: "Dryer",
  Fireplace: "Fireplace",
  FreeParking: "Free Parking",
  Kitchen: "Kitchen",
  Tv: "TV",
  WashingMachine: "Washing Machine",
  WirelessNetwork: "Wireless Internet",
  PetFriendly: "Pet Friendly",
};

const SingleVenueCard = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = data.attributes.Media.data || [];

  const renderAmenities = (attributes) => {
    return Object.keys(amenitiesMapping)
      .map((key) => {
        if (attributes[key]) {
          return (
            <li className="flex" key={key}>
              <LuDot size={24} />
              {amenitiesMapping[key]}
            </li>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  const formattedPrice = formatCurrency(data.attributes.Price || 0);

  const petFriendly = data.attributes.PetFriendly;

  const imageUrl =
    images.length > 0 ? `${images[0].attributes.url}` : "/images/hotel6.jpg";

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-col pc:mt-10">
      <h1 className="tablet:mx-auto text-deepsea font-header font-bold text-3xl ">
        {data.attributes.Title || "Unnamed Venue"}
      </h1>

      <div className=" mx-auto w-full max-w-96 flex flex-col pb-2">
        <img
          className="w-full h-[271px] object-cover rounded-3xl hover:cursor-pointer"
          src={imageUrl}
          alt={data.attributes.Title || "Default Venue"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
          onClick={() => openModal(0)}
        />
        <div className="p-4">
          <h1 className="text-2xl font-header text-deepsea mb-2">
            {data.attributes.Location}
          </h1>
          <ul className="flex flex-wrap mb-2 text-[11px] col-span-full mx-auto w-full">
            <li className=" flex font-header font-bold text-deepsea ">
              <LuDot className="my-auto" size={16} />
              {data.attributes.NumberOfBedrooms} BEDROOM
            </li>
            <li className="flex font-header font-bold text-deepsea px-1">
              <LuDot className="my-auto" size={16} />
              {data.attributes.NumberOfBeds} BEDS
            </li>
            <li className="flex font-header font-bold text-deepsea px-1">
              <LuDot className="my-auto" size={16} />
              {data.attributes.NumberOfBathrooms} BATHS
            </li>
            <li className="flex font-header font-bold text-deepsea px-1">
              {petFriendly && (
                <>
                  <LuDot className="my-auto" size={16} />
                  PET-FRIENDLY
                </>
              )}
            </li>
          </ul>

          <p className="font-button text-sm border-b border-tigerlily pb-4 ">
            {data.attributes.Description || "No description available."}
          </p>

          <div className="py-4 border-b border-tigerlily ">
            <h1 className="font-header text-deepsea text-xl font-semibold">
              Amenities:
            </h1>
            <ul>{renderAmenities(data.attributes)}</ul>
          </div>
          <p className="text-tigerlily font-button mt-2">
            {formattedPrice} <span className="text-charcoal">/Night</span>
          </p>
          <EnquiryForm data={data} />
        </div>

        {images.slice(1).map((img, index) => (
          <img
            key={img.id}
            src={`${img.attributes.url}`}
            className=" hidden w-24 h-24 mr-2 object-cover"
            alt={`Additional Image ${index + 1}`}
            onClick={() => openModal(index + 1)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75">
          <span className="absolute top-1/2 left-[20%]">
            {" "}
            <BackgroundButton text="Previous" onClick={prevImage} />
          </span>
          <span className="absolute top-5 right-5">
            <BackgroundButton
              text="Close"
              onClick={closeModal}
              className="absolute right-4 top-4"
            />
          </span>
          <span className="absolute top-1/2 right-[20%]">
            <BackgroundButton text="Next" onClick={nextImage} />
          </span>

          <img
            src={`${images[currentImageIndex].attributes.url}`}
            className="max-w-full max-h-full w-auto h-auto mx-auto p-4"
            alt="Modal Content"
          />
        </div>
      )}
    </div>
  );
};

export default SingleVenueCard;

SingleVenueCard.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      Price: PropTypes.number,
      PetFriendly: PropTypes.bool,
      Location: PropTypes.string,
      NumberOfBedrooms: PropTypes.number,
      NumberOfBeds: PropTypes.number,
      NumberOfBathrooms: PropTypes.number,
      Media: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            attributes: PropTypes.shape({
              url: PropTypes.string.isRequired,
            }),
          })
        ),
      }),
    }),
  }).isRequired,
};
