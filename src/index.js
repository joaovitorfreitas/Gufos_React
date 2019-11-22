import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './assets/pages/Home/App';

// importou a pagina Categorias
import Categoria from './assets/pages/Categoria/Categoria';
import * as serviceWorker from './serviceWorker';

import Notfound from './assets/pages/Notfound/Notfound';

// importou a biblioteca react-router-dom
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Evento from './assets/pages/Eventos/Evento';
import login from './assets/pages/login/login';

//importamos nosso css padrão
import './assets/css/flexbox.css'
import './assets/css/reset.css'
import './assets/css/style.css'
import Login from './assets/pages/login/login';
// realizar a criaçao das rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Categoria" component={() => <Categoria titulo_pagina=" Categorias - Gufos" />} />
                <Route path="/Evento" component={() => <Evento titulo_pagina="Evento - Gufos" />} />
                {/* <Route path="/Login" component={() => <Login titulo_pagina="login - Gufos" />} /> */}
                 <Route path="/Login" component={login}/>
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
