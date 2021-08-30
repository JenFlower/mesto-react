export const openPopup = popupName => {
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
}

export const closePopup = popupName => {
  popupName.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
}

const escHandler = (evt) => {
  if(evt.key === "Escape") {
    // нашли открытый попап
    // console.log('esc')
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup)
  }
}

export const setPopupsEventListeners = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {

      if (evt.target.classList.contains('popup_is-opened')) {
        // console.log('close by popup')
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        // console.log('close by btn')
        closePopup(popup)
      }
  })
  })

}

