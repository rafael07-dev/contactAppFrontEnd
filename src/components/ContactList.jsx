import { useEffect } from "react";
import Contact from "./Contact";
import { useContact } from "../hooks/useContact";

export default function ContactList() {

    const {contacts, fetchContacts} = useContact();

    useEffect(()=>{
        fetchContacts()
    }, [fetchContacts]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Contactos ({contacts.length})</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {contacts.map((c) => (
                    <Contact key={c.id} contact={c} />
                ))}
            </ul>
        </div>
    )
}