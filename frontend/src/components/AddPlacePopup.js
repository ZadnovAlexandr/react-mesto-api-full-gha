import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleAddPlaceSubmit}
    >
      <label className="form__field">
        <input
          name="mestoName"
          type="text"
          placeholder="Название"
          className="form__input form__input_theme_mestoName"
          minLength="2"
          maxLength="30"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="form__error form__input-error-mestoName"></span>
      </label>
      <label className="form__field">
        <input
          name="mestoURL"
          type="url"
          placeholder="Ссылка на картинку"
          className="form__input form__input_theme_mestoURL"
          required
          value={link || ""}
          onChange={handleChangeLink}
        />
        <span className="form__error form__input-error-mestoURL"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
