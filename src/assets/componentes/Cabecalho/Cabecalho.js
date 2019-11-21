import React, { Component } from 'react';
import Logo from '../../img/icon-login.png';
import '../../css/cabecalho.css';
//para utilizar o link é necessario importar
import {Link} from 'react-router-dom';

export default class Cabecalho extends Component {
    render() {
        return (
            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src= {Logo} alt="Logo do site" />

                    <nav className="cabecalhoPrincipal-nav">
                        {/* Referenciando links */}
                        <Link to="/">Home</Link>
                        <Link to="/Evento">Eventos</Link>
                        <Link to="/categoria">Categorias</Link>
                        <Link to="Login"className="cabecalhoPrincipal-nav-login">Login</Link>
                    </nav>
                </div>
            </header>
        );
    }
} 