import axios from "axios";

const API_URl = 'https://localhost:7021/api/Contact';

export async function getContacts(){
    return await axios.get(API_URl)
}

export async function getContactNumber() {
    const res = await axios.get(API_URl);
    return res.data.length;
}