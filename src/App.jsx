import './App.css'
import Header from "./components/Header";
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import { Routes, Route } from 'react-router-dom';
import ContactAddForm from './components/ContactAddForm';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<ContactList />}/>
        <Route path="/contact/:id" element={<ContactDetails/>} />
        <Route path="/contact/add" element={<ContactAddForm/>} />
      </Routes>
    </>
  )
}

export default App
