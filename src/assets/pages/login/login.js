import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';
import '../../css/login.css';
import Axios from 'axios' // importando axios
import {parseJwt} from '../../../services/auth'
import api from '../../../services/api';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading: false
        }
    }
    //atualiza estado genérico, para que seja uma só vez
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    realizarLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '' })

        //Define que uma requisição está em andamento
        this.setState({ isLoading: true })

        // let config = {
        //     headers: {
        //         "Content-Type": "application/JSON",
        //         "Access-Control-Allow-Origin": "*"//Cors
        //     }
        // }
        // Axios.post("http://localhost:5000/api/login", {
        //     email: this.state.email,
        //     senha: this.state.senha
        // }, config)
        let usuario = {
        email:this.state.email,
        Senha:this.state.senha  
        }
        api.post("/login", usuario)
        
            .then(response => {
                // console.log("Retorno do login: ", response)
                // console.log("Retorno do login: ", response.statusText)

                //Exibe no console somente o token
                //caso a requisição retorne um status code 200
                //salva o token no localstorage
                //e define que a requisição terminou
                if (response.status === 200) {
                    localStorage.setItem('usuario-gufos', response.data.token)
                    this.setState({ isLoading: false })

                    //exibe no console o token
                    console.log("Meu token é :" + response.data.token)

                    //define base64 recebendo a payload do token
                    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

                    //exibe no console o valor de base64
                    console.log(base64)

                    //exibe no console o valor do payload convertido para string
                    console.log(window.atob(base64))

                    //exibe no console o valor do paload convertido para JSON
                    console.log(JSON.parse(window.atob(base64)))

                    //exibe no console o tipo de usuario logado
                    console.log(parseJwt().Role)

                    if(parseJwt().Role === 'Administrador' ){
                        this.props.history.push('/categoria')
                    }else{
                        this.props.history.push('/evento')
                    }
                }
            })
            //Caso ocorra algum erro, define o state erroMensagem como 'E-mail' ou invalidos
            // e define que a requisição terminou
            .catch(erro => {
                console.log("Erro:", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválidos!' })
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <div className="Login">
                <section class="container flex">
                    <div class="img__login"><div class="img__overlay"></div></div>

                    <div class="item__login">
                        <div class="row">
                            {/* <div class="item">
            <img src="./assets/img/icon-login.png" class="icone__login" />
          </div> */}
                            <div class="item" id="item__title">
                                <p class="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.
            </p>
                            </div>
                            <form onSubmit={this.realizarLogin}>
                                <div class="item">
                                    <input
                                        class="input__login"
                                        placeholder="username"
                                        type="text"
                                        name="email" //Deve ser igual ao nome da variavel no state pra que o atualizaEstado funcione
                                        value={this.setState.email}
                                        onChange={this.atualizaEstado}
                                        id="login__email"
                                    />
                                </div>
                                <div class="item">
                                    <input
                                        class="input__login"
                                        placeholder="password"
                                        type="password"
                                        name="senha"
                                        value={this.state.senha}
                                        onChange={this.atualizaEstado}
                                        id="login__password"
                                    />
                                </div>
                                <div>
                                    <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>
                                </div>
                                {/* <div class="item">
                                    <button type="submit" class="btn btn__login" id="btn__login">
                                        Login
              </button>
                                </div> */}
                                {
                                    this.state.isLoading === true &&
                                    <div className="item">
                                        <button type="submit" className="btn btn_login" disabled> Loading ...</button>
                                    </div>
                                }
                                {
                                    this.state.isLoading === false &&
                                    <div className="item">
                                        <button type="submit" className="btn btn_login" > Login </button>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </section>

                {/* <script>
      // console.log(document);
      // id
      // console.log(document.getElementById("login__email"));
      // classe
      // console.log(document.getElementsByClassName("input__login"));

      // var a = 10;
      // var b = "Texto";

      // // buscar a referencia do botao
      // var btnLogin = document.querySelector("#btn__login");

      // btnLogin.addEventListener("click", function(event) {
      //   event.preventDefault();
      //   // console.log("Hello World!");
      //   console.log(document.querySelector("#login__email").value);
      // });

      var inputSenha = document.querySelector("#login__password");

      inputSenha.addEventListener("keyup", function() {
        // caso a senha tenha menos do que 6 caracteres, fica vermelho, querido
        if (inputSenha.value.length < 6) {
          inputSenha.style.borderBottomColor = "red";
        } else {
          inputSenha.style.borderBottomColor = "green";
        }
      });
      </script> */}

                <Footer />
            </div>
        );
    }
}

