import PropTypes from "prop-types";

function BackgroundButton({ text, ...props }) {
  return (
    <button
      {...props}
      className="bg-tigerlily text-cloud font-semibold py-2 px-10 border-2 border-tigerlily rounded-full hover:bg-tigerlily focus:outline-none focus:ring-2 focus:ring-tigerlily focus:ring-opacity-50 shadow-md"
    >
      {text}
    </button>
  );
}

BackgroundButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BackgroundButton;
