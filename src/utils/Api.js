class Api  {
  constructor({address, token, groupId}) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  _checkResponse(res) {
    return res ? res.json() : Promise.reject(`Error: ${res.status}`)
  }

  getCards() {
    return fetch(`${this._address}/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      },
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'

      }
    })
    .then(this._checkResponse)
  }


  patchUserData({inputName, inputJob}) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputName,
        about: inputJob
      })
    })
    .then(this._checkResponse)
  }

  updateAvatar(inputData) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputData
      })
    })
    .then(this._checkResponse)
  }

  putLike(cardId) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse)
  }


  deleteLike(cardId) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  postCard({inputCardName, inputCardLink}) {
    return fetch(`${this._address}/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: inputCardName,
        link: inputCardLink
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }

    })
    .then(this._checkResponse)
  }
}

export const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "96259e94-a15e-4621-85d4-6e77b73cb408",
  groupId: "cohort-25"
})