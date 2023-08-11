import React from "react";
import userDetails from '../images/edit_icon.jpg';
import { Link, useLocation } from "react-router-dom";

export default function ContactDetails(props){

    const location = useLocation();

    const {cName, cEmail} = location.state.contact;

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={userDetails} alt="UserDetails"/>
                </div>
                <div className="content">
                    <div className="header">{cName}</div>
                    <div className="description">{cEmail}</div>
                    <Link to="/">
                        <button className="ui button blue right" style={{marginTop:"10px"}}>Done</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}