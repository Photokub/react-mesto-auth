import React from "react";


export function Login() {
    return (
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" method="post">
                    <input type="email" className="login__form_input login__form_type_email" name="email" defaultValue="" placeholder="Email" required/>
                    <input type="password" className="login__form_input login__form_type_password" name="password" defaultValue="" placeholder="Пароль" minLength="5" required/>
                    <button className="login__submit-btn">Войти</button>
                </form>
            </section>
    )
}