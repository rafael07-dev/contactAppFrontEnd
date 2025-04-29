import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContact } from "../hooks/useContact";

export default function ContactDetails() {

    const { id } = useParams();
    const [contact, setContact] = useState({
        "id": "0",
        "name": "",
        "email": "",
        "phone": "",
        "address": "",
        "city": "",
        "photoUrl": ""
    });

    const { updatePhoto, updateContact, fetchContactById } = useContact();

    const updateLocalContact = async (id) => {
        const res = await fetchContactById(id)

        setContact(res);
    }

    useEffect(() => {
        if (id) {
            updateLocalContact(id);
        }
    }, [id]);


    const inputRef = useRef();

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const onSubmitContact = (e) => {
        e.preventDefault();
        updateContact(contact)
    }

    const onSubmitPhoto = async (e) => {

        const res = await updatePhoto(e.target.files[0], id)
        console.log(res)
        if (res && res.url) {
            setContact(prev => ({
                ...prev,
                photoUrl: res.url
            }));
        }
    }

    const selectImage = () => {
        inputRef.current.click();
    }

    // Comprobamos si `contact` no está disponible aún
    if (!contact) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <ToastContainer />
            <Link to="/" className="text-gray-600 font-semibold hover:text-gray-800 mb-4 inline-block">
                Volver al listado
            </Link>
            <div className="flex gap-5 items-start justify-center">
                {/* Perfil del contacto */}
                <div className="flex text-center mb-8 p-8 rounded-lg shadow-lg bg-gray-200">
                    {contact.photoUrl ? (
                        <img
                            src={`https://localhost:7021${contact.photoUrl}?${new Date().getTime()}`}
                            alt={`Foto de perfil de ${contact.name}`}
                            className="mx-auto mb-4 mr-4 w-24 h-24 border-2 border-blue-500"
                            loading="lazy"
                        />
                    ) : (
                        <div className="mx-auto mb-4 mr-4 w-24 h-24 border-2 border-gray-400 flex items-center justify-center bg-white text-gray-500">
                            Sin foto
                        </div>
                    )}

                    <div>
                        <p className="text-xl font-semibold text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-500 mb-4">JPG, GIF o PNG. Tamaño máximo 10MB</p>
                        <button
                            onClick={selectImage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i> Cambiar Foto
                        </button>
                    </div>
                </div>

                {/* Formulario de edición */}
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Contacto</h2>
                    <form onSubmit={onSubmitContact}>
                        {/* Input oculto para el ID de contacto */}
                        <input type="hidden" defaultValue={contact.id} />

                        <div className="flex gap-10">
                            <div>
                                {/* Nombre */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nombre</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={contact.name}
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
                                        value={contact.email}
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
                                        value={contact.phone}
                                        onChange={onChange}
                                        name="phone"
                                        required
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                {/* Dirección */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="address">Dirección</label>
                                    <input
                                        id="address"
                                        type="text"
                                        value={contact.address}
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
                                        value={contact.city}
                                        onChange={onChange}
                                        name="city"
                                        required
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Botón de submit */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={onSubmitPhoto} name='file' accept='image/*' />
            </form>
        </>
    );
}