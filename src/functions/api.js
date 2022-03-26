import axios from "axios"

const API_URL = "http://localhost:3001/";


export async function postRequest(path, data) {
    try {
        let token = localStorage.getItem("token")
        const response = await axios.post(API_URL + path, data,
            {
                headers: { token }
            }
        );
        return response
    } catch (e) {
        return e.response
    }

}