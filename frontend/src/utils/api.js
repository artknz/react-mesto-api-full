export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _statusResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._statusResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._statusResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
    .then(this._statusResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._statusResponse);
  }
}

export const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//art.knz.students.nomoreparties.xyz'}`,
  headers: {
    // authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json"
  }
})
