import Axios from 'axios'

const api = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type" : "Application/json",
        "Authorization": "Bearer" + localStorage.getItem("usuario-gufos")
    }
});

export default api;