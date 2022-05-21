import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email:"",
    tel_number: "",
    contact_preference: "",
    request: ""
  });



  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(json => {
        // upon success, update users
        console.log(json);
        setUser(json);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error)
      });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addUser();
  }

  const addUser = () => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( user )
    })
    // Continue fetch request here
    .then(res => res.json())
    .then(json => setUser(json))
    .catch(e => console.error(e))
  }


  return (
    <div>
      <h1>Request form</h1>
      <form onSubmit={e => handleSubmit(e)}>
      <label>
        First name
        <input
          type="text"
          name="first_name"
          value={user.first_name || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name
        <input
          type="text"
          name="last_name"
          value={user.last_name || ''} 
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile number
        <input
          type="text"
          name="tel_number"
          value={user.tel_number || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact Preference
        <input
          type="text"
          name="contact_preference"
          value={user.contact_preference || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Request/Question
        <input
          type="text"
          name="request"
          value={user.request || ''}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}


