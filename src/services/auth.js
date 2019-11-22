//Define a constante usuarioAutenticado
//que verifica se há um token no localstorage
export const usuarioAutenticado = () => localStorage.getItem('usuario-gufos') !== null

//Define a constante parseJwt
export const parseJwt = () => {
    //que define a variável base64, que recebe o payload do token
    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]
    
    //retorna o paylod convertido de base64 para string e de string para Json
    return JSON.parse(window.atob(base64))
}