import "./style.css";

const Card = ({ title, image, size = "medium" }) => {
  return (
    <div className={`Card Card__${size}`}>
      <p className="Card__title">{title.toUpperCase()}</p>
      <div>
        <img className="Card__image" src={image} alt="" />
      </div>
    </div>
  );
};

export default Card;
