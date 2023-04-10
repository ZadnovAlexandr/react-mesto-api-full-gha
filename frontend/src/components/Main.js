import { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="Информация о профиле">
        <div
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Открыть форму"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="places" aria-label="Места России">
        <ul className="places__list">
          {props.cards.map((card) => {
            return (
              <Card
                cards={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
