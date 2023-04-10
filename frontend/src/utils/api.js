class Api {

  constructor(config) {
    this._baseURL = config.baseURL;
    this._headers = config.headers;
  }

  _checkError(err) {
    if(err.ok) {
      return err.json();
    }
    return Promise.reject(`Ошибка: ${err.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkError);
  }

  getInitialCard() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkError);
  }

  likeCardStatus(id, isLiked) {
    if (isLiked) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkError)
    } else {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkError)
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkError)
  }

  editUser(dataUser) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      })
    })
    .then(this._checkError);
  }

  editAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
    .then(this._checkError);
  }

  postCreateCard(dataCard) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    })
    .then(this._checkError);
  }
  /*postCreateCard(dataCard) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    })
    .then(this._checkError);
  }

  editUser(dataUser) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.profession
      })
    })
    .then(this._checkError);
  }

  editAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarURL
      })
    })
    .then(this._checkError);
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkError)
  }

  addLike(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkError)
  }

  deleteLike(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkError)
  }*/

}

const api = new Api({
  baseURL: `https://mesto.nomoreparties.co/v1/cohort-56`,
  headers:{
    authorization: `a5031a5c-1ebc-4267-88e0-f43b05516ede`,
    "Content-Type": "application/json"
  }
});

export default api
