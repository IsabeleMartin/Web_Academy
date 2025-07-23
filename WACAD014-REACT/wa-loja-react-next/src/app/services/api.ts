import axios from "axios"

 const produtosApi = axios.create({
    baseURL: "https://renekapi.origamid.dev/json/api",
});

export default produtosApi