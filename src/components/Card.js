import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    
    const cardDeleteButtonClassName = (
        `${isOwn ? 'card__trush' : 'card__trush-hidden'}`
    ); 

    const cardLikeClassName = (
        `${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    )

    function handleLike() {
        props.onCardLike(props.card)
    }

    function handleDelete() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="card">
            <button className={`${cardDeleteButtonClassName}`} type="submit" aria-label="Delete" onClick={handleDelete}/>
            <img className="card__image" src={props.card.link} onClick={props.onClick} alt={props.card.name}/>
            <div className="card__content">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like"> 
                    <button className={`${cardLikeClassName}`} type="button" aria-label="Like" onClick={handleLike}></button>
                    <span className="card__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}