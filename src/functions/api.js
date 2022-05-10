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

export async function getRequest(...path) {
    try {
        let token = localStorage.getItem("token");
        const response = path.length == 1 ? await axios.get(
            API_URL + path[0], {
                headers : { token }
            }
        ) : await axios.all(path.map( path => {
            axios.get(
                path, {
                    headers :  { token }
                }
            )
        }))
        return response;
    } catch (e) {
        return e.response;
    }
}

export async function putRequest(path, data) {
    try {
        let token = localStorage.getItem('token');
        const response = await axios.put( API_URL + path, data,
            {
                headers : {token}
            });
        return response;
    } catch (e) {
        return e.response;
    }
}

export async function deleteRequest(path) {
    try{
        let token = localStorage.getItem('token');
        const response = await axios.delete(API_URL + path,
            {
                headers : {token}
            });
        return response;
    } catch (e) {
        return e.response;
    }
}