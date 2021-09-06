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


  patchUserData({name, about}) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  updateAvatar(avatar) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar
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

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.putLike(cardId)
  }

  postCard({name, link}) {
    return fetch(`${this._address}/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
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
  token: "467f7176-aa4d-4071-89a4-64f50b1d729d",
  groupId: "cohort-26"
})