import logo from "../images/logo.svg";
import {Link} from "react-router-dom";


export function Header({btnEnter, btnReg ,loggedIn, logOut, userData}) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого Mesto"/>
            {btnEnter && <Link className="header__link" to="/sign-in">Войти</Link>}
            {btnReg && <Link className="header__link" to="/sign-up">Регистрация</Link>}
            {loggedIn &&
                <>
                <p className="header__userData">{userData}</p>
                    <Link className="header__link" to="/sign-up" onClick={logOut}>Выйти</Link>
                </>
                }
        </header>
    )
}
