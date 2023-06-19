import { ConnectWallet } from "@thirdweb-dev/react";

import logo from "../resourses/img/logo.svg"

export default function Navbar() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <img className="header__logo" src={logo} alt="logo" />
                    <ConnectWallet className="header__btn btn"/>
                </div>
            </div>
        </header>
    )
}