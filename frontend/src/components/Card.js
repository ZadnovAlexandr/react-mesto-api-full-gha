import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.cards.owner._id === currentUser._id;
  const isLiked = props.cards.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `place__button-like ${
    isLiked && "place__button-like_active"
  }`;

  const handleClick = () => {
    props.onCardClick(props.cards);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.cards);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.cards);
  };

  return (
    <li className="place">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="place__button-delete"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="place__image"
        src={props.cards.link}
        alt={props.cards.name}
        onClick={handleClick}
      />
      <h2 className="place__title">{props.cards.name}</h2>
      <div className="place__like-conteiner">
        <button
          type="button"
          aria-label="Лайк"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
        <p className="place__likes-counter">{props.cards.likes.length}</p>
      </div>
    </li>
  );
}

export default Card;