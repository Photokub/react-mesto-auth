import React from "react";
import {Link} from "react-router-dom";

export function Register() {
    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" method="post">
                <input type="email" className="login__form_input register__form_type_email" name="email" defaultValue="" placeholder="Email" required/>
                <input type="password" className="login__form_input register__form_type_password" name="password" defaultValue="" placeholder="Пароль" minLength="5" required/>
                <button className="login__submit-btn">Зарегистрироваться</button>
            </form>
           <span className="register__subtitle">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></span>
        </section>
    )
}