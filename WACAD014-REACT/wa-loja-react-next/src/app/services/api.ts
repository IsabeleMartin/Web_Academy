import axios from "axios"

 const produtosApi = axios.create({
    baseURL: "https://ranekapi.origamid.dev/json/api",
});

export default produtosApi