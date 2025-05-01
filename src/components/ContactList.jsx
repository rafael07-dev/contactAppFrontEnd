import { useEffect } from "react";
import Contact from "./Contact";
import { useContact } from "../hooks/useContact";

export default function ContactList() {

    const { contacts, fetchContacts, totalPages, 
        pageIndex, setPageIndex, deleteContact } = useContact();

    const onDeleteContact = async (id) => {
        await deleteContact(id)
        await fetchContacts(pageIndex)
    }

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchContacts(page)
            
            setPageIndex(page)
        }
    }

    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-1 rounded border ${i === pageIndex ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    useEffect(() => {
        fetchContacts(pageIndex)
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Contactos ({contacts.length})</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {contacts.map((c) => (
                    <Contact deleteContact={onDeleteContact} key={c.id} contact={c} />
                ))}
            </ul>

            <div className="flex justify-center my-4 gap-2">
                <button
                    onClick={() => goToPage(pageIndex - 1)}
                    disabled={pageIndex === 1}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                {renderPageButtons()}

                <button
                    onClick={() => goToPage(pageIndex + 1)}
                    disabled={pageIndex === totalPages}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>

        </div>
    )
}