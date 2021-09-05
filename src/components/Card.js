import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    // console.log('user id', currentUser._id)
    const isOwn = props.card.owner._id === currentUser._id;
    console.log('props.card.owner._id', props.card.owner._id)
    const cardDeleteButtonClassName = (
        `${isOwn ? 'card__trush' : 'card__trush-hidden'}`
      ); 
    return (
        <li className="card">
            <button className={`${cardDeleteButtonClassName}`} type="submit" aria-label="Delete"/>
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