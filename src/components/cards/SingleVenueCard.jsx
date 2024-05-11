import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import BackgroundButton from "../common/buttons/BackgroundButton";
import { LuDot } from "react-icons/lu";

const SingleVenueCard = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = data.attributes.Media.data || [];

  const formattedPrice = formatCurrency(data.attributes.Price || 0);

  const petFriendly = data.attributes.PetFriendly;

  // const imageUrl =
  //   images.length > 0
  //     ? `http://localhost:1337${images[0].attributes.url}` // TODO: remove local host before going to prod
  //     : "/images/default-image.jpg";

  const imageUrl =
    images.length > 0
      ? `${images[0].attributes.url}` // TODO: remove local host before going to prod
      : "/images/default-image.jpg";

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

  console.log(data);

  return (
    <div className="w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8">
      <h1 className="col-span-full text-deepsea font-header font-bold text-3xl ">
        {data.attributes.Title || "Unnamed Venue"}
      </h1>

      <div className=" col-span-4 pc:col-span-3 flex flex-col pb-2">
        <img
          className="w-full h-[271px] object-cover rounded-3xl"
          src={imageUrl}
          alt={data.attributes.Title || "Default Venue"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
        />
        <div className="p-4">
          <h1 className="text-2xl font-header text-deepsea mb-2">
            {data.attributes.Location}
          </h1>
          <ul className="flex flex-wrap  text-[11px] col-span-full mx-auto w-full">
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

          <p className="font-button text-sm ">
            {data.attributes.Description || "No description available."}
          </p>
          <p className="text-tigerlily font-button mt-2">
            {formattedPrice} <span className="text-charcoal">/Night</span>
          </p>
        </div>
        {images.slice(1).map((img, index) => (
          <img
            key={img.id}
            src={`http://localhost:1337${img.attributes.url}`}
            className="w-24 h-24 mr-2 object-cover"
            alt={`Additional Image ${index + 1}`}
            onClick={() => openModal(index + 1)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative bg-white p-4">
            <BackgroundButton text="Close" onClick={closeModal} />
            <BackgroundButton text="Previous" onClick={prevImage} />
            <img
              src={`http://localhost:1337${images[currentImageIndex].attributes.url}`}
              className="w-64 h-64"
              alt="Modal Content"
            />
            <BackgroundButton text="Next" onClick={nextImage} />
          </div>
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
