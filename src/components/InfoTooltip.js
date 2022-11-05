import React from "react";
import sucсess from "../images/sucсess.svg"
import failure from "../images/failure.svg"


export function InfoTooltip({isOpen,onClose, loggedIn}) {
    return(
        <section className={`popup popup_infoTooltip  ${isOpen ? 'popup_opened' : ''}`}
                 aria-label="попап">
            <div className={`popup__container popup__container-infoTooltip`}>
                <img src={loggedIn ? sucсess : failure} alt={loggedIn ? "Успех" : "Неудача"} className="popup__icon"/>
                <h3 className="popup__title popup__infoTooltip_title">{loggedIn ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!\n" +
                    "Попробуйте ещё раз."}</h3>
                <button className="popup__close" type="button" onClick={onClose}/>

            </div>
        </section>
    )
}