import { useEffect, useState } from "react"
import { getContactNumber } from "../service/ContactService"

export default function Header() {

    const [lengthContacts, setLengthContacts] = useState(0)

    useEffect(()=>{
        const fetchData = async () => { 
            setLengthContacts(getContactNumber());
        }

        fetchData();
    }, [])

    return (
        <header>
            <h3>Contact List({lengthContacts})</h3>
            <button>Add new contact</button>
        </header>
    )
}