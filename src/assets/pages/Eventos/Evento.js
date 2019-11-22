import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';
import Cabecalho from '../../componentes/Cabecalho/Cabecalho';

class Evento extends Component {
    constructor() {
        super();
        this.state = {
            lista: [],
            titulo: "",
            dataEvento: "",
            acessoLivre: "",
            categoria: ""


        }
        this.cadastrarEvento = this.cadastrarEvento.bind(this);

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
    cadastrarEvento(event) {
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.titulo);
        console.log(this.state.dataEvento);
        console.log(this.state.acessoLivre);
        console.log(this.state.categoria);
        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            body: JSON.stringify({ titulo: this.state.nome }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => console.log(error))

    }
    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    render() {
        return (
            <div className="Evento">
                <Cabecalho/>

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
                            <form onSubmit={this.cadastrarEvento}>
                                <div class="container">
                                    <input
                                        type="text"
                                        id="evento__titulo"
                                        placeholder="título do evento"
                                        onChange={this.atualizaNome.bind(this)}

                                    />
                                    <input type="Date" id="evento__data" placeholder="dd/MM/yyyy" onChange={this.atualizaNome.bind(this)} />
                                    <select id="option__acessolivre">
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>
                                    <select id="option__tipoevento" >
                                        <option value="0" disabled>Tipo do Evento</option>
                                        <option></option>
                                    </select>
                                </div>
                            </form>
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
