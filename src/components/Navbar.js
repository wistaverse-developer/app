import { ConnectWallet } from "@thirdweb-dev/react";
import {Link} from "react-router-dom";
import logo from "../resourses/img/logo.svg"
export default function Navbar() {
    return (
        <header className="header">
                <div className="header__inner">
                    <Link to='/'><img className="header__logo" src={logo} alt="logo" /></Link>
                    <ConnectWallet className="header__btn btn"/>
                </div>
        </header>
    )
}