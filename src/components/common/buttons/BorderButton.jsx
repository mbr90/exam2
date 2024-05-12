import PropTypes from "prop-types";

function BorderButton({ text, ...props }) {
  return (
    <button
      {...props}
      className="bg-white text-deepsea font-text py-2 px-10 border border-tigerlily rounded-full hover:bg-deepsea hover:border-deepsea hover:text-white focus:outline-none focus:ring-2 shadow-md"
    >
      {text}
    </button>
  );
}

BorderButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BorderButton;
