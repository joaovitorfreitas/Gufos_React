import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';

class Evento extends Component {
    constructor() {
        super();
        this.state = {
            lista: [
                // { eventoId: 1, titulo: "Design", categoriaId: 2, acessoLivre: false, dataEvento: "2019-08-07" },
            ]
        }
    }
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando");
    }
    componentDidMount() {
        console.log("Carregado");
        this.listaAtualizada();
    }
    componentDidUpdate() {
        console.log("Atualizando");
    }
    componentWillUnmount() {
        console.log("Saindo");
    }

    listaAtualizada = () => {
        fetch("http://localhost:5000/api/Evento")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }));
    }

    render() {
        return (

            <div className="Evento">
                <Link to="/">Voltar</Link>

                <main class="conteudoPrincipal">
                    <section class="conteudoPrincipal-cadastro">
                        <h1 class="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div class="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo"></tbody>{
                                    this.state.lista.map(function (evento) {
                                        return (
                                            <tr key={evento.eventoId}>
                                                <td>{evento.eventoId}</td>
                                                <td>{evento.titulo}</td>
                                                <td>{evento.dataEvento}</td>
                                                <td>{evento.acessoLivre}</td>
                                                <td>{evento.categoria.titulo}</td>
                                            </tr>

                                        );
                                    })
                                }
                            </table>
                        </div>

                        <div class="container" id="conteudoPrincipal-cadastro">
                            <h2 class="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div class="container">
                                <input
                                    type="text"
                                    id="evento__titulo"
                                    placeholder="título do evento"
                                />
                                <input type="text" id="evento__data" placeholder="dd/MM/yyyy" />
                                <select id="option__acessolivre">
                                    <option value="1">Livre</option>
                                    <option value="0">Restrito</option>
                                </select>
                                <select id="option__tipoevento">
                                    <option value="0" disabled>Tipo do Evento</option>
                                </select>
                            </div>
                            <button
                                class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                onclick="cadastrarEvento()"
                            >
                                Cadastrar
          </button>
                        </div>
                    </section>
                </main>


                <Footer />
            </div>
        );
    }
}

export default Evento;
