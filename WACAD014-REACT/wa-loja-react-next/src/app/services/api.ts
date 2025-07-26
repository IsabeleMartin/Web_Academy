import axios from "axios"

 const produtosApi = axios.create({
    baseURL: "https://ranekapi.origamid.dev/json/api",
});

const apiFavoritos = axios.create({
    baseURL: "https://favoritos-json-server-pi.vercel.app/"
})



export  {produtosApi, apiFavoritos}