import React from "react";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup popup_type_infoTooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_infoTooltip">
        <button
          type="button"
          aria-label="Закрыть форму"
          className="popup__button-close"
          onClick={props.onClose}
        />
        <img
          className="popup__image_type_infoTooltip"
          src={props.image}
          alt={props.status}
        />
        <p className="popup__title_type_infoTooltip">{props.text}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
