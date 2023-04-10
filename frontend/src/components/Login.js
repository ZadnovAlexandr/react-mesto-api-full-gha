import React, { useCallback, useState } from "react";

const Login = (props) => {
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
      <h1 className="auth__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </section>
  );
};
export default Login;
