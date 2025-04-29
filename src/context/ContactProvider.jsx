import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateContactApi, updateImage } from "../service/ContactService";
import { getContacts } from "../service/ContactService";
import { getContactById } from "../service/ContactService";

export const ContactContext = createContext();

export function ContactProvider({ children }) {

    //estado global de contactos
    const [contacts, setContacts] = useState([]);
    const [file, setFile] = useState(undefined)

    const navigate = useNavigate();

    const fetchContacts = async (pageIndex = 1, pageSize = 10) => {
        try {

            const res = await getContacts(pageIndex, pageSize);

            setContacts(res.data.data.items)

        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchContactById = async (id) => {
        const res = await getContactById(id)
        const data = res.data;
        console.log(data);
        
        return data
    }

    const addContact = async (contact, event) => {
        event.preventDefault();
        try {
            const { data } = await addContact(contact);

            const formData = new FormData();

            formData.append("file", file, file.name);
            formData.append("id", data.id)

            await updateImage(formData);

            setFile(undefined)

            navigate("/")

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    const updateContact = async (contact) => {
        await updateContactApi(contact)
        const res = await fetchContactById(contact.id)
        toast.success("Contacto actualizado correctamente!");
        console.log(res);
    }

    const updatePhoto = async (file, id) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', id);

        const res = await updateImage(formData);
        //fetchContactById(id)
        
        toast.success("Foto actualizada correctamente");

        return res.data
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <ContactContext.Provider
            value={{
                contacts,
                setContacts,
                fetchContacts,
                fetchContactById,
                addContact,
                updateContact,
                updatePhoto,
                getContactById,
                setFile
            }}
        >
            {children}
        </ContactContext.Provider>
    );

}