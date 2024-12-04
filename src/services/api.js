import axios from "axios"

export const getApi = () => {
    return axios.create({
        baseURL: 'https://backapi-1.onrender.com/api',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}