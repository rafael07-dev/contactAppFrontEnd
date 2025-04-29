import { useContext } from "react";
import { ContactContext } from "../context/ContactProvider";

export function useContact() {
    const context = useContext(ContactContext)
    return context
}