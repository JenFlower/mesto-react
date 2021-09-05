export default function PopupWithForm(props) {
    return (
      <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_is-opened' : ''} `}>
        <form className={`popup__form popup__form-${props.name}`} name={`popup${props.name}`} onSubmit={props.onSubmit}>
          <button className={`popup__close-button popup__close-button-${props.name}`} type="button" onClick={props.onClose}></button>
          <h3 className="popup__title popup__title_form">{props.title}</h3>
          {props.children}
          <button type="submit" className="popup__submit-button popup__submit-button_form">{props.buttonText}</button>
        </form>
      </section>
    )
}