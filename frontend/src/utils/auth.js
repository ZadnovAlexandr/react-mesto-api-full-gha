class Auth {
  constructor(config) {
    this._baseURL = config.baseURL;
  }

  _checkError(err) {
    if (err.ok) {
      return err.json();
    }
    return Promise.reject(`Ошибка: ${err.status}`);
  }

  signUp(data) {
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkError);
  }

  signIn(data) {
    return fetch(`${this._baseURL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkError);
  }

  checkAuth(token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkError);
  }
}

const auth = new Auth({
  baseURL: "https://auth.nomoreparties.co.",
});

export default auth;
