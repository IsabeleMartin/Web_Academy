import axios from "axios";

export async function get(endpoint: string) {
   
    try{
        const response = await axios.get(`${process.env.DB_URL}/${endpoint}`);
        return response.data;
    }catch (err) {
        console.log(err);
    }

    
}

export async function post(endpoint:string, data: any) {
    try{
        const response = await axios.post(`${process.env.DB_URL}/${endpoint}`, data)
        return response;
    }catch(err){
        console.log(err);
    }
}

export async function put(endpoint: string, data: any) {
  try {
    const response = await axios.put(`${process.env.DB_URL}/${endpoint}`, data);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function del(endpoint: string) {
  try {
    const response = await axios.delete(`${process.env.DB_URL}/${endpoint}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}


