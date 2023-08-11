import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import api from './api/contacts';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import {v4 as uuid } from 'uuid';
import ContactDetails from './components/ContactDetails';
import EditContact from './components/EditContact';

function App() {

  //const LOCAL_STORAGE_KEY = 'MY_CONTACTS_KEY';

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterContacts, setFilterContacts] = useState([]);

  const retrivedContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  useEffect(() => {
    // const retrivedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log('localStorage');
    // console.log(retrivedContacts);
    const getAllContacts = async () => {
      const allContacts = await retrivedContacts();
      if(allContacts){
        console.log(allContacts);
        setContacts(allContacts);
      }
    };
    //getAllContacts();
    
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  async function AddContacts(contactDetail){
    console.log('In App...');
    console.log(contactDetail);
    const tempContact = {
      "cId" : uuid(),
      ...contactDetail,
    }
    
    //const responseContact = await api.post("/contacts", tempContact);
    console.log('post....')
    //console.log(responseContact.data);
    setContacts([...contacts, tempContact]);
  }

  function UpdateContact(contactDetail){
    console.log('In Update...');
    console.log(contactDetail);
    const {cId, cName, cEmail} = contactDetail;
    setContacts(contacts.map((contact) => {
      return contact.cId === cId ? {...contact, cName:cName, cEmail:cEmail} : contact;
    })
    );
    //const responseContact = await api.post("/contacts", tempContact);
    // console.log('post....')
    // console.log(responseContact.data);
    // setContacts([...contacts, responseContact.data]);
    //setContacts([...contacts, tempContact]);
  }

  async function DeleteContact(id){
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => {
      return contact.cId !== id;
    });
    setContacts(newContacts);
  }

  function searchContact(st){
    setSearchTerm(st);
    console.log('inside search contact...');
    console.log(searchTerm);
    if(st !== ''){
      const filteredContact = contacts.filter((contact) => {
        return Object.values(contact).join(' ').toLowerCase().includes(st.toLowerCase());
      });
      setFilterContacts(filteredContact);
    }else{
      setFilterContacts(contacts);
    }
  }
  
  return (
    <div className="ui container">

      <Router>
        <Routes>
          <Route path='/' element={<ContactList contacts={searchTerm.length === 0 ? contacts : filterContacts} deleteContact={DeleteContact} searchContact={searchContact}/>}/>
          <Route path='/addContact' element={<AddContact AddContacts={AddContacts}/>}/>
          <Route path='/contactDetails/:id' element={<ContactDetails />}/>
          <Route path='/editContact/:id' element={<EditContact updateContact={UpdateContact}/>}/>
        </Routes>
      </Router>
      {/* <AddContact AddContacts={AddContacts}/>
      <ContactList contacts={contacts} deleteContact={DeleteContact}/> */}
      
    </div>
  );
}

export default App;
