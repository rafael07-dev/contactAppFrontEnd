import axios from "axios";

const API_URl = 'https://localhost:7021/api/Contact';

export async function getContacts(pageIndex, pageSize){
    const url_size = `https://localhost:7021/api/Contact?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return await axios.get(url_size)
}

export async function addContact(contact) {
    console.log(contact);
    
    return axios.post(API_URl, contact)
}

export async function delContact(id) {
    
    return axios.delete(`${API_URl}/${id}`)
}

export async function getContactNumber() {
    const res = await axios.get(API_URl);
    return res.data.length;
}

export async function getContactById(id) {
    return await axios.get(`https://localhost:7021/api/Contact/${id}`);
}

export async function updateContactApi(contact) {
    return await axios.put(`https://localhost:7021/api/Contact/${contact.id}`, contact);
}

export async function updateImage(formData) {
    return await axios.post(`https://localhost:7021/api/Contact/upload/${formData.get('id')}`, formData);
}