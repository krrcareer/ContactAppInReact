import React, {useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

function ContactList(props){

    const searchInput = useRef("");
    
    function handleDeleteContact(id){
        props.deleteContact(id);
    }
    function handleSearchBar(){
        
        props.searchContact(searchInput.current.value);
    }
    const renderContact = props.contacts.map((contact) =>{
        return(
            <div key={contact.cId}>
                <ContactCard contact={contact} getContactId={handleDeleteContact}/>
            </div>
        );
    })
    return (
        <div className="main">
            <h2>Contact List</h2>
            <Link to="/addContact">
                <button className="ui button blue right">Add Contact</button>
            </Link>
            <div className="ui search">
                <div className="ui icon input">
                    <input className="prompt" style={{marginTop:"5px"}} ref={searchInput} type="text" placeholder="Search Contact" onChange={handleSearchBar}/>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContact.length===0 ? 'No Contacts Found' : renderContact}</div>
        </div>
    );
}

export default ContactList;