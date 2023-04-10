import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <label className="form__field">
        <input
          name="avatarURL"
          type="url"
          placeholder="Ссылка на аватар"
          className="form__input form__input_theme_avatarURL"
          required
          ref={avatarRef}
        />
        <span className="form__error form__input-error-avatarURL"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;