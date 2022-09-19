import React from "react";
import Avatar from '../../Assets/images/TROY.jpg';
import LogoUno from '../../Assets/images/Logo-Bici-Pal.jpeg'
import LogoDos from '../../Assets/images/Logo-Bici-Pal-Blanco-Palabra.jpeg'
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function Topbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <Link to="/">
                <img className="img-profile" src={LogoUno} alt="logo Bicipal Uno" width="60" />
                <img className="img-profile" src={LogoDos} alt="logo Bicipal Dos" width="60" />            
            </Link>
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
                        <i className="fas fa-bell fa-fw"></i>
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">TROY POLAMALU</span>
                        <img className="img-profile rounded-circle" src={Avatar} alt="Jordan Walke - Creador de React" width="60" />
                    </a>
                </li>

            </ul>

        </nav>
    )
}

export default Topbar;