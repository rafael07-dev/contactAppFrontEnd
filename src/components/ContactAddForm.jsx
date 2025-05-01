import { Link } from "react-router-dom";
import { useContact } from "../hooks/useContact";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ContactAddForm() {

    const [contact, setContact] = useState({
        "id": "0",
        "name": "",
        "email": "",
        "phone": "",
        "address": "",
        "city": "",
        "photoUrl": ""
    });

    const {saveContact, setFile} = useContact();

    const onSubmit = (e)=>{
        e.preventDefault();
        saveContact(contact);
    }

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <Link to="/" className="text-gray-600 font-semibold hover:text-gray-800 mb-4 inline-block">
                Volver al listado
            </Link>
            <div className="flex gap-5 items-start justify-center">
                {/* Formulario de edición */}
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Agregar Contacto</h2>
                    <form onSubmit={onSubmit}>
                        {/* Input oculto para el ID de contacto */}
                        <input type="hidden" />


                        {/* Nombre */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                onChange={onChange}
                                name="name"
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Correo electrónico */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                onChange={onChange}
                                name="email"
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Teléfono</label>
                            <input
                                id="phone"
                                type="text"
                                onChange={onChange}
                                name="phone"
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        {/* Dirección */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Dirección</label>
                            <input
                                id="address"
                                type="text"
                                onChange={onChange}
                                name="address"
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Ciudad */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Ciudad</label>
                            <input
                                id="city"
                                type="text"
                                onChange={onChange}
                                name="city"
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-6">
                            <input type='file' onChange={(event) => setFile(event.target.files[0])} name='photo' accept='image/*' />
                        </div>

                        {/* Botón de submit */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <i className="fa-solid fa-floppy-disk mr-2"></i>

                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}