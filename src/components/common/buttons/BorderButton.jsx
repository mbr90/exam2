import PropTypes from "prop-types";

function BorderButton({ text, ...props }) {
  return (
    <button
      {...props}
      className="bg-white text-deepsea font-semibold py-2 px-5 border border-tigerlily rounded-full hover:bg-tigerlily focus:outline-none focus:ring-2 focus:ring-tigerlily focus:ring-opacity-50 shadow-xl"
    >
      {text}
    </button>
  );
}

BorderButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BorderButton;
