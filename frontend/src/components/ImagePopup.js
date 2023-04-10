const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          type="button"
          className="popup__button-close popup__button-close_type-card"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
