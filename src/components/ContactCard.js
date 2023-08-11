import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

export default function ContactCard(props){
    const {cId, cName, cEmail} = props.contact;
    
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link to={`/contactDetails/${cId}`} state={{contact : props.contact}}>
                    <div className="header">{cName}</div>
                    <div>{cEmail}</div>
                </Link>
            </div>
            <Link to={`/editContact/${cId}`} state={{contact : props.contact}}>
                <i className="edit alternate outline icon" style={{color:'green', marginTop:"10px"}}></i>
            </Link>
            <i className="trash alternate outline icon" style={{color:'red', marginTop:"7px"}} onClick={() => props.getContactId(cId)}></i>
            
        </div>
    );
}