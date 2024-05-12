import PropTypes from "prop-types";

function BackgroundButton({ text, ...props }) {
  return (
    <button
      {...props}
      className="bg-tigerlily text-cloud  py-2 px-10  w-full rounded-full focus:bg-deepsea hover:bg-deepsea shadow-md font-text"
    >
      {text}
    </button>
  );
}

BackgroundButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BackgroundButton;
