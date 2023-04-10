import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const { onSubmit } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = {
        email,
        password,
      };
      onSubmit(formData);
    },
    [email, password, onSubmit]
  );

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth__button-submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};
export default Register;
