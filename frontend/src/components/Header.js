import logo from "../images/Logo.svg";
import { Routes, Route, Link } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className="header__links">
        <Routes>
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{props.isUserEmail}</p>
                <Link
                  to="/sign-in"
                  className="header__link"
                  onClick={props.onSignExit}
                >
                  Выйти
                </Link>
              </>
            }
          />
        </Routes>
      </nav>
    </header>
  );
};

export default Header;
