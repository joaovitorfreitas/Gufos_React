import React, { Component } from 'react';
import Logo from '../../img/icon-login.png';
import '../../css/cabecalho.css';
//para utilizar o link é necessario importar
import { Link, withRouter } from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from '../../../services/auth';


class Cabecalho extends Component {
    logout = () => {

        // Remove o token do localstorage
        localStorage.removeItem("usuario-gufos");

        // Redireciona para endereco
        this.props.history.push("/");
    }

    render() {
        return (
            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={Logo} alt="Logo do site" />

                    <nav className="cabecalhoPrincipal-nav">
                        <Link to="/">Home</Link>

                        {usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                            //condição de verdade
                                <React.Fragment>    
                                    <Link to="/categoria">Categorias</Link>
                                    <a onClick={this.logout}>Sair</a>
                                </React.Fragment>
                            
                        ) : (
                                usuarioAutenticado() && parseJwt().Role === "Aluno" ? (
                                    //se o usuario for aluno
                                    <React.Fragment>
                                        <Link to="/eventos"></Link>
                                        <a onClick={this.logout}>Sair</a>
                                    </React.Fragment>
                                ) : (
                                        //se o usuario não estiiver logado
                                        <React.Fragment>
                                            <Link to="/login" className="cabecalhoPrincipal-nav-login">Login</Link>
                                        </React.Fragment>
                                    )
                            )}
                        {/*  ? == IF */}
                        {/* : == ELSE */}
                        {/* Referenciando links */}
                    </nav>
                </div>
            </header>
        );
    }
} 
export default withRouter(Cabecalho);