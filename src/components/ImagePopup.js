export default function ImagePopup(props) {
  return (
    <section className={`popup popup-${props.name} ${props.card ? 'popup_is-opened' : ''}`}>
      <div className="preview">
        <img className={`preview__image`} src={props.card ? props.card.target.currentSrc : ''} alt={props.card ? props.card.target.name : ''}/>
        <button className="popup__close-button popup__close-button-preview popup__close-button_card" type="button" onClick={props.onClose}></button>
        <p className="preview__text">{props.card ? props.card.target.alt : ''}</p>
      </div>
    </section>
  )
}