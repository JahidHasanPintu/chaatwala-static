import axios from "axios";
import { base_url } from "./baseUrl";



export const postPublicApi = async (url,data) => {
    const api_url = base_url+''+url;
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return await axios.post(api_url,data,config).then(async (response) => {
       return response.data;
    }).catch((error) => {
        console.log('Error:', 'Network connection failed!', 'error');
    });
}

export const postApi = async (url,data,token) => {
    const api_url = base_url+''+url;
    const config = {
        headers: {
            "authorization" : `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return await axios.post(api_url,data,config).then(async (response) => {
       return response.data;
    }).catch((error) => {
        console.log('Error:', 'Network connection failed!', 'error');
    });
}

export const getApi = async (url, data=null, config={}) => {
    const api_url = base_url+''+url;
    return await axios.get(api_url, data,config).then(async (response) => {
        return response.data
    }).catch((error) => {
        console.log('Error:', 'Network connection failed!', 'error');
    });
}



