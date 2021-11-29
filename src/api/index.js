import axios from 'axios'

export const url = 'http://127.0.0.1:8000'

const Api = axios.create({
    baseURL: url+'/api',
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authUser'))?.token
    }
})

export default Api