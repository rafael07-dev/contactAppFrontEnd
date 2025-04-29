import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold text-gray-800">Contact List</h3>
            <Link to="/contact/add" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Add new contact
            </Link>
        </header>
    )
}
