export default function Card(props) {
    return (
        <li className="card">
            <button className="card__trush card__trush-hidden" type="submit" aria-label="Delete"/>
            <img className="card__image" src={props.card.link} onClick={props.onClick} alt={props.card.name}/>
            <div className="card__content">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like">
                <button className="card__like-button" type="button" aria-label="Like"></button>
                <span className="card__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}