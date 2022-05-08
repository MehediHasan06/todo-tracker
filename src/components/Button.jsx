import PropTypes from "prop-types";

const Button = (props) =>{
  const {text, color, clickFunc} = props;
  return (
    <button 
      onClick={clickFunc} 
      style={{
        backgroundColor : color,
        cursor: "pointer",
      }}
      className="btn"
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: "blue"
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  clickFunc: PropTypes.func,
};

export default Button;
