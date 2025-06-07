import axios from "aixios"

async function get(endpoint: string) = {
    const response = await axios.get(`${process.env.DB_URL}/${endpoint})
} 