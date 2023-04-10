import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <label className="form__field">
        <input
          name="name"
          type="text"
          placeholder="Имя"
          className="form__input form__input_theme_name"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="form__error form__input-error-name"></span>
      </label>
      <label className="form__field">
        <input
          name="profession"
          type="text"
          placeholder="Вид деятельности"
          className="form__input form__input_theme_profession"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="form__error form__input-error-profession"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
