import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './assets/pages/Home/App';

// importou a pagina Categorias
import Categoria from './assets/pages/Categoria/Categoria';
import * as serviceWorker from './serviceWorker';

import Notfound from './assets/pages/Notfound/Notfound';

// importou a biblioteca react-router-dom
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Evento from './assets/pages/Eventos/Evento';
import login from './assets/pages/login/login';

//importamos nosso css padrão
import './assets/css/flexbox.css'
import './assets/css/reset.css'
import './assets/css/style.css'
import { usuarioAutenticado, parseJwt } from '../src/services/auth';

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props => usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        }
    />
)

const PermissaoAluno = ({ component: Component }) => (
    <Route
        render={props => usuarioAutenticado() && parseJwt().Role === "Aluno" ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        }
    />
)
// realizar a criaçao das rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <PermissaoAdmin path="/Categoria" component={Categoria} />
                <Route exact patch="/login" component={login}/>
                <PermissaoAluno path="/Evento" component={Evento} />
                {/*<Route path="/Login" component={() => <Login titulo_pagina="login - Gufos" />} />*/}
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();