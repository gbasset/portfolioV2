import React, { useState, useEffect, useContext } from "react";
import './NavigationAdmin.css';
import { IoMdLogOut } from 'react-icons/io';
import { useHistory } from "react-router-dom";

export default function NavigationAdmin({ setAuthenticated, activeLink, setActiveLink, authBody }) {
    const disconnectAdmin = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem('authenticated', false);
        window.sessionStorage.setItem('authBody', null);
        setAuthenticated(false)
    }
    const resturnToWebSite = () => {
        setTimeout(() => {
            history.push("/home");
        }, 500);
    }
    const history = useHistory();
    return (
        <div>
            <nav className="container-navigation-user">
                <header>
                    <div className="container-user-infos">
                        Bonjour DIEUX !
                        <div className="container-name-user">
                            <span>{authBody && authBody.email} <IoMdLogOut className="item-admin"
                                onClick={disconnectAdmin}
                            /> </span>
                        </div>
                    </div>
                </header>
                <ul>
                    <li onClick={(e) => setActiveLink(1)}
                        className={activeLink === 1 ? "isActive" : ""}
                    >Mes projets</li>
                    <li onClick={(e) => setActiveLink(2)}
                        className={activeLink === 2 ? "isActive" : ""}
                    >Languages / Tags</li>
                    <li onClick={(e) => setActiveLink(3)}
                        className={activeLink === 3 ? "isActive" : ""}
                    >Images</li>
                    <li onClick={resturnToWebSite}
                    >Return to website</li>
                </ul>
            </nav>
        </div>
    )
}
