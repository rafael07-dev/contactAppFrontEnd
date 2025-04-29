import React from "react";
import { Link } from "react-router-dom";

export default function Contact({ contact }) {
    const baseUrl = `https://localhost:7021${contact.photoUrl}`;
    
    return (
        <Link to={`/Contact/${contact.id}`} className="list-none p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-200 flex flex-col gap-4 w-full max-w-sm">
            {/* Header: foto y nombre */}
            <div className="flex items-center gap-4">
                <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                    src={baseUrl}
                    alt={contact.name}
                />
                <div>
                    <h4 className="text-lg font-bold text-gray-800">{contact.name}</h4>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 text-gray-700 text-sm mt-2">
                <div className="flex items-center gap-2">
                    <i className="fas fa-envelope text-blue-600"></i>
                    <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fas fa-phone-alt text-blue-600"></i>
                    <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-blue-600"></i>
                    <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fas fa-city text-blue-600"></i>
                    <span>{contact.city}</span>
                </div>
            </div>
        </Link>
    );
}
