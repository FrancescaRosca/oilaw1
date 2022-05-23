import React, { useEffect, useState } from "react";
import "./UserView.css";

function UserView() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email:"",
    tel_number: "",
    contact_preference: "",
    request: "",
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
    <div class="container">
      <h1>Request Form</h1>
      <form onSubmit={e => handleSubmit(e)}>
        
        <div class="form-row">

          <div class = "form-group col-md-6">
            <label for="first_name"> First name </label>
            <input
            id="first_name"
            class="form-control"
            type="text"
            name="first_name"
            placeholder="First name"
            value={user.first_name || ''}
            onChange={handleChange}
            />
          </div>

          <div class = "form-group col-md-6">
            <label for="last_name"> Last name </label>
            <input
            id="last_name"
            class="form-control"
            type="text"
            name="last_name"
            placeholder="Last name"
            value={user.last_name || ''}
            onChange={handleChange}
            />
           </div>

        </div>

        <div class="form-row">

          <div class = "form-group col-md-6">
            <label for= "email"> Email </label>
            <input
                  id="email"
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email || ''}
                  onChange={handleChange}
                />
          </div>
        

          <div class = "form-group col-md-6">
          <label for="tel_number"> Mobile number </label>
            <input
              id="tel_number"
              class="form-control"
              type="text"
              name="tel_number"
              placeholder="Mobile number"
              value={user.tel_number || ''}
              onChange={handleChange}
            />
          </div>
        </div>
    


        <div form-group>
          <label for="contact_preference"> Contact Preference</label>
            <input
              id="contact_preference"
              class="form-control"
              type="text"
              name="contact_preference"
              placeholder="Contact Preference"
              value={user.contact_preference || ''}
              onChange={handleChange}
            />
        </div>

        <div class="form-group">
          <label for="request"> Request/Question </label>
            <input
              id="request"
              class="form-control"
              type="text"
              name="request"
              value={user.request || ''}
              onChange={handleChange}
            />
          
        </div>

        <div class="form-group">
          <button class="form-control" type="submit">Submit</button>
        </div>
    </form>
    </div>
  );

}

export default UserView;