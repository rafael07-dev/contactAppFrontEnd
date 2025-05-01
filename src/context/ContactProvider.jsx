import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateContactApi, updateImage, addContact, delContact, 
    getContactById, getContacts } from "../service/ContactService";

export const ContactContext = createContext();

export function ContactProvider({ children }) {

    //estado global de contactos
    const [contacts, setContacts] = useState([]);
    const [file, setFile] = useState(undefined)
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchContacts = async (pageIndex, pageSize = 10) => {
        try {

            const res = await getContacts(pageIndex, pageSize);

            setContacts(res.data.data.items)
            setTotalPages(res.data.data.totalPages)
            setPageIndex(pageIndex)

        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchContactById = async (id) => {
        try{

            const res = await getContactById(id)
            const data = res.data;
            console.log(data);
            
            return data
        }catch(error){
            console.log(error.message);
        }
    }

    const saveContact = async (contact) => {

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
        try{
            await updateContactApi(contact)
            const res = await fetchContactById(contact.id)
            toast.success("Contacto actualizado correctamente!");
            console.log(res);
        }catch(error){
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const deleteContact = async (id) => {
        try{
            await delContact(id)
            //const res = await fetchContactById(id)
            toast.success("Contacto eliminado correctamente!");
        }catch(error){
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const updatePhoto = async (file, id) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', id);

        try{
            const res = await updateImage(formData);
            //fetchContactById(id)
            
            toast.success("Foto actualizada correctamente");
    
            return res.data
        }catch(e){
            console.log(e.message);
        }

    }

    /*useEffect(() => {
        console.log("soy el effect del provider");
        
        fetchContacts()
    }, [])*/

    return (
        <ContactContext.Provider
            value={{
                contacts,
                setContacts,
                fetchContacts,
                fetchContactById,
                saveContact,
                updateContact,
                updatePhoto,
                deleteContact,
                getContactById,
                setFile,
                pageIndex,
                totalPages,
                setPageIndex
            }}
        >
            {children}
        </ContactContext.Provider>
    );

}