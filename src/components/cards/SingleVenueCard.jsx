import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import BackgroundButton from "../common/buttons/BackgroundButton";

const SingleVenueCard = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = data.attributes.Media.data;

  const formattedPrice = formatCurrency(data.attributes.Price);
  const imageUrl = `http://localhost:1337${data.attributes.Media.data[0].attributes.url}`; // TODO: REMOVE LOCALHOST WHEN GOING TO PROD, THE CORRECT URL IS FETCHED FROM PROD API...

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
    <div className="w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8">
      <div className="border rounded-lg shadow-md col-span-4 pc:col-span-3 flex flex-col pb-2">
        <img
          className=" w-full h-[271px] object-cover"
          src={imageUrl}
          alt={data.attributes.Title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/hotel6.jpg";
          }}
        />
        <div className="p-8">
          <h1 className="text-xl mb-2">{data.attributes.Title}</h1>
          <p>{data.attributes.Description}</p>
          <p className="text-tigerlily mt-2">
            Price per night: {formattedPrice}
          </p>
        </div>
        {images.slice(1).map((img, index) => (
          <img
            key={img.id}
            src={`http://localhost:1337${img.attributes.url}`}
            className="w-24 h-24 mr-2 object-cover"
            onClick={() => openModal(index)}
          ></img>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative bg-white p-4">
            <BackgroundButton text={"Close"} onClick={closeModal} />
            <BackgroundButton text={"Previous"} onClick={prevImage} />
            <img
              src={`http://localhost:1337${images[currentImageIndex].attributes.url}`}
              className="w-64 h-64"
              alt="Modal Content"
            />
            <BackgroundButton text={"Next"} onClick={nextImage} />
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
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Price: PropTypes.number.isRequired,
      Media: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            attributes: PropTypes.shape({
              url: PropTypes.string.isRequired,
            }),
          })
        ).isRequired,
      }),
    }),
  }).isRequired,
};