import logo from "../images/logo.svg";
import {Link} from "react-router-dom";


export function Header({btnEnter, btnReg}) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого Mesto"/>
            {btnEnter && <Link className="header__link" to="/sign-in">Войти</Link>}
            {btnReg && <Link className="header__link" to="/sign-up">Регистрация</Link>}
        </header>
    )
}
