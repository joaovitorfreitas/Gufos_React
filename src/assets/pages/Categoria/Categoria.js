import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';
//importamos o Mob Reacct
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//import da blibioteca Material Design
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class Categoria extends Component {

  //usado para criar nossos states
  constructor() {

    // Usado Para Poder manipular os States, que são herdados de Component
    super();

    //State é estado oque é alterado!!
    this.state = {

      //Definimos uma lista inicial vazia
      lista: [],

      //Pegar input de form de Cadastro
      nome: "",

      //MDB
      modal: false,

      //usamos para armazenar os dados a serem alterados
      editarModal: {
        categoriaId: "",
        titulo: ""
      },
      //criando um estado para verificar carregamento 
      loading: false,

      erroMsg: ""

    }
    //Damos o bind no quando não usamos arrow function 
    this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  UNSAFE_componentWillMount() {
    document.title = this.props.titulo_pagina
    console.log("Carregando");
  }
  componentDidMount() {
    console.log("Carregado");
    console.log(this.state.lista);
    this.listaAtualizada();
  }
  componentDidUpdate() {
    console.log("Atualizando");
  }
  componentWillUnmount() {
    console.log("Saindo");
  }
  //GET - Listar
  listaAtualizada = () => {

    this.setState({ loading: true });

    fetch("http://localhost:5000/api/Categoria")
      .then(response => response.json())
      .then(data => this.setState({ lista: data }))

    //desabilita o icone de carregando apos 2 segundo
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  //POST - Cadastrar
  cadastrarCategoria(event) {
    //impede que a página seja recarregada
    event.preventDefault();
    console.log("Cadastrando");
    console.log(this.state.nome);

    fetch("http://localhost:5000/api/Categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ titulo: this.state.nome })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.listaAtualizada();
        this.setState(() => ({ lista: this.state.lista }))
      })
      .catch(error => console.log(error))
  }
  // DELETE - Deletar Categoria
  deletarCategoria = (id) =>{
        
    this.setState({ erroMsg : "" })
    
    console.log("Excluindo");
    
    fetch("http://localhost:5000/api/categoria/"+id, {
       method : "DELETE",
       headers : { 
           "Content-Type" : "application/json"
       }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        this.listaAtualizada();
        this.setState( () => ({ lista: this.state.lista }));
    })
    .catch(error => {
        console.log(error)
        this.setState({ erroMsg : "Não foi possível excluir, verifique se não há eventos cadastrados nesta Categoria" })
    })
}

    //Acionado quando Clicamos no botao Editar para capturar
    //e salvar no state os dados atuais
    alterarCategoria = (categoria) => {
      console.log(categoria);

      this.setState({
        editarModal: {
          categoriaId: categoria.categoriaId,
          titulo: categoria.titulo
        }
      });

      //abrir modal
      this.toggle();
    }
    //UPDATE - Atualiza a Categoria
    salvarAlteracoes = (event) => {
      //previni que a página seja recarregada
      event.preventDefault();

      fetch("http://localhost:5000/api/Categoria/" + this.state.editarModal.categoriaId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.editarModal)
      })

        .then(response => response.json())
        .catch(error => console.log(error))

      //Atraso na requisição,pois as request possuem intervalo muitos próximos
      setTimeout(() => {
        this.listaAtualizada();
      }, 1000);

      //Fechar modal
      this.toggle();
    }
    //utilizamos para poder alterar o input de cadastro
    atualizaNome(input)
    {
      this.setState({ nome: input.target.value })

    }
    //Utilizamos para atualizar os states dos inputs dentro do modal
    atualizaEditarModalTitulo(input)
    {
      this.setState({
        editarModal: { categoriaId: this.state.editarModal.categoriaId, titulo: input.target.value }
      })
    }
    render()
    {
      let instituicao = "SENAI";
      return (
        <div>
          <main className="conteudoPrincipal">
            <section className="conteudoPrincipal-cadastro">
              <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
              <div className="container" id="conteudoPrincipal-lista">
                <table id="tabela-lista">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody id="tabela-lista-corpo">
                    {
                      //Percorrer a lista de Categoria
                      this.state.lista.map(function (Categoria) {
                        return (
                          //Colocamos "key" pois cada linha em Jsx precisa de um ID único
                          <tr key={Categoria.categoriaId}>
                            <td>{Categoria.categoriaId}</td>
                            <td>{Categoria.titulo}</td>
                            <td>
                              <button onClick={e => this.alterarCategoria(Categoria)}>alterar</button>
                              <button onClick={e => this.deletarCategoria(Categoria.categoriaId)}>Excluir</button>
                            </td>
                          </tr>
                        )
                        //usamos para vincular todo o contexto de map
                      }.bind(this))
                    }

                  </tbody>
                </table>
                {/*verifica e casa haja uma mensagem de erro ele mostra abaixo da  */}
                {this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}
                {/* verifica se o estado de loading está como true e mostra o ícone como carregando */}
                {this.state.loading && <i className="fas fa-spinner fa-spin fa-2x blue-text"></i>}
              </div>

              <div className="container" id="conteudoPrincipal-cadastro">
                <h2 className="conteudoPrincipal-cadastro-titulo">
                  Cadastrar Tipo de Evento
            </h2>
                <form onSubmit={this.cadastrarCategoria}>
                  <div className="container">
                    <input
                      type="text"
                      id="nome-tipo-evento"
                      placeholder="tipo do evento" value={this.state.nome}
                      onChange={this.atualizaNome.bind(this)}
                    />
                    <button
                      className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                    >
                      Cadastrar
                </button>
                  </div>
                </form>
                {/* Utlizamos o Modal da Bibliotece para fazer um update */}
                <MDBContainer>
                  {/* Abraçamos os inputs do container com um form */}
                  <form onSubmit={this.salvarAlteracoes}>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                      <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo}</MDBModalHeader>
                      <MDBModalBody>

                        <MDBInput label="Categoria" value={this.state.editarModal.titulo} onChange={this.atualizaEditarModalTitulo.bind(this)} />

                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Sair</MDBBtn>
                        {/* Incluimos o tipo do botão submit no botão para enviar o formulario */}
                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>
                  </form>
                </MDBContainer>

              </div>
            </section>
          </main>

          <Footer escola={instituicao} />
        </div>
      );
    }
  }
  
  export default Categoria;

