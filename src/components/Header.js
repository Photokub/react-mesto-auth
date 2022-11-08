import logo from "../images/logo.svg";
import {Link, Redirect} from "react-router-dom";
import {useState} from "react";

export function Header({atPage, onClick}) {

    const [bntText, setBntText] = useState("Войти")

    // if(!atPage){setBntText("Регистрация")}
    if(!atPage){console.log("Регистрация")}


    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого Mesto"/>
            <Link className="header__link" to={`${atPage ? "/sign-in" : "/sign-up"}`}  onClick={onClick}>{bntText}</Link>
            {/*{loggedIn ? <Redirect to="/mesto-react"/> : <Redirect to="/sign-up"/>}*/}
            {/*<Link className="header__link"  to={`${atPage} ? "/sign-up" : "/sign-in" `} onClick={onClick}>{bntText}</Link>*/}
            {/*<Link className="header__link"  to={"/sign-up"} >FFFFFF</Link>*/}
        </header>
    )
}
