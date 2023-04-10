const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть форму"
          className="popup__button-close"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`form form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            aria-label="Создать"
            className="form__button-save"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
