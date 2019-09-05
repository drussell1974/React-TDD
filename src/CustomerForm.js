import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit, fetch }) => {
    
    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber});
    
    const handleSubmit = () => {
        onSubmit(customer);
        fetch('/customers', {
            body: JSON.stringify(customer),
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'}
        })
    }

    const handleChanged = ({target}) => 
        setCustomer(customer => ({
            ...customer,
            [target.name]: target.value
        }));

    return (
        <form id="customer" 
            onSubmit={handleSubmit}
            >
            <label htmlFor="firstName">First name</label>
            <input 
                type="text" 
                name="firstName"
                id="firstName" 
                value={firstName}
                onChange={handleChanged}/>
            <label htmlFor="lastName">Last name</label>
            <input 
                type="text" 
                name="lastName"
                id="lastName" 
                value={lastName}
                onChange={handleChanged}/>
                <label htmlFor="lastName">Last name</label>
            <input 
                type="text" 
                name="phoneNumber"
                id="phoneNumber" 
                value={phoneNumber}
                onChange={handleChanged}/>
            <input type="submit" value="Add" 
                onSubmit={handleSubmit} 
                />
        </form>
    )
};

CustomerForm.defaultProps = {
    firstName:"", 
    lastName:"", 
    phoneNumber:"",
    onSubmit: async () => {},
    fetch: async () => {}
}