import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api.js';

import auth from '../utils/auth';

import UnionOk from '../images/UnionOk.svg';
import UnionErr from '../images/UnionErr.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  useEffect(() => {
    auth
      .checkAuth()
      .then((res) => {
        if (res.authorized === false) {
          setIsLoggedIn(false);
        } else if (res.authorized === true) {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err.message);
      });
  }, []);

  const getInfo = () =>
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsUserEmail(userInfo.email);
      })
      .catch((err) => {
        console.log(err);
      });

  const getCards = () =>
    api
      .getInitialCard()
      .then((Cards) => {
        setCards(Cards);
      })
      .catch((err) => {
        setCards(err);
      });

  useEffect(() => {
    if (isLoggedIn) {
      getInfo();
      getCards();
    }
  }, [isLoggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleUpdateUser = (userData) => {
    api
      .editUser(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCard = ({ name, link }) => {
    api
      .postCreateCard({ name, link })
      .then((newCard) => {
        setCards((cards) => [newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignIn = useCallback(
    (data) => {
      auth
        .signIn(data)
        .then(() => {
          setIsLoggedIn(true);
          setIsUserEmail(data.email);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setIsStatus('failed');
        });
    },
    [navigate]
  );
  const handleRegister = useCallback(
    (data) => {
      auth
        .signUp(data)
        .then(() => {
          setIsInfoTooltipOpen(true);
          setIsStatus('success');
          navigate('/sign-in');
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setIsStatus('error');
        });
    },
    [navigate]
  );

  const handleSignExit = () => {
    auth.signout().then(() => {
      setIsLoggedIn(false);
      navigate('/sign-in');
    });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isUserEmail={isUserEmail} onSignExit={handleSignExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onSubmit={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onSubmit={handleSignIn} />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />

        <ImagePopup
          name="open-card"
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={() => {
            setIsInfoTooltipOpen(false);
            setIsStatus('');
          }}
          status={isStatus}
          image={isStatus === 'success' ? UnionOk : UnionErr}
          text={
            isStatus === 'success'
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
