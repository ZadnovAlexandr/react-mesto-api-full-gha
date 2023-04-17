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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(this._checkError);
  }

  signIn(data) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(this._checkError);
  }

  checkAuth() {
    return fetch(`${this._baseURL}/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkError);
  }

  signout = () => {
    return fetch(`${this._baseURL}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkError);
  };
}

const auth = new Auth({
  baseURL: 'https://api.a.zhadnov.nomoredomains.monster',
});

export default auth;
