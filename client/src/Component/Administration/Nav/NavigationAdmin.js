import React, { useState, useEffect, useContext } from "react";
import './NavigationAdmin.css';
import { IoMdLogOut } from 'react-icons/io';
import { useHistory } from "react-router-dom";
import { RootContext } from '../../../Context/RootContext';
export default function NavigationAdmin({ authBody }) {
    const {
        setAuthenticated,
        setAuthBody
    } = useContext(RootContext)
    const history = useHistory();
    const [activeLink, setActiveLink] = useState();
    const disconnectAdmin = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem('authenticated', false);
        window.sessionStorage.setItem('authBody', null);
        setAuthenticated(false);
        setTimeout(() => {
            history.push("/login");
        }, 500);
    }
    const resturnToWebSite = () => {
        setTimeout(() => {
            history.push("/home");
        }, 500);
    }
    const goToSection = (section) => {
        history.push(`/${section}`);
        setActiveLink(`/${section}`)
    }
    useEffect(() => {
        setActiveLink(history.location.pathname)
    }, [history])
    console.log(activeLink);
    return (
        <div>
            <nav className="container-navigation-user">
                <header>
                    <div className="container-user-infos">
                        👼🏻 Bonjour DIEU !
                        <div className="container-name-user">
                            <span>{authBody && authBody.email} <IoMdLogOut className="item-admin"
                                onClick={disconnectAdmin}
                            /> </span>
                        </div>
                    </div>
                </header>
                <ul>
                    <li onClick={(e) => goToSection('dashboard/projects')}
                        className={activeLink === '/dashboard/projects' || activeLink && activeLink.includes('project') ? "isActive" : ""}
                    >Mes projets</li>
                    <li onClick={(e) => goToSection('dashboard/languages')}
                        className={activeLink === '/dashboard/languages' ? "isActive" : ""}
                    >Languages / Tags</li>
                    <li onClick={(e) => goToSection('dashboard/images')}
                        className={activeLink === '/dashboard/images' ? "isActive" : ""}
                    >Images</li>
                    <li onClick={resturnToWebSite}
                    >Return to website</li>
                </ul>
            </nav>
        </div>
    )
}
