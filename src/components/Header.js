import logo from "../images/logo.svg";

export function Header() {
    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="лого Mesto" />
            {/*<img className="header__logo" src="<%=require('./images/logo.svg')%>" alt="лого Mesto" />*/}
        </header>
    )
}
