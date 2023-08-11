import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditContact(props){

    const location = useLocation();
    const {cId, cName, cEmail} = location.state.contact;

    const navigate = useNavigate();
    const {updateContact} = props;
    console.log(props);
    const [contactDetail, setContactDetail] = useState({cId:cId, cName:cName, cEmail:cEmail});

    function handleChange(event){

        const {name, value} = event.target;
        setContactDetail((preVal) =>{
            return (
                {
                    ...preVal,
                    [name] : value,
                }
            )
        });
        
    }
    function handleSubmit(event){
        updateContact(contactDetail);
        event.preventDefault();
        console.log('inside submit');
        console.log(props);
        navigate('/');
    }

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="cName" value={contactDetail.cName} placeholder="Name" onChange={handleChange}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="cEmail" value={contactDetail.cEmail} placeholder="Email" onChange={handleChange}/>
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}