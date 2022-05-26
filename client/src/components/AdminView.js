import React, {useState, useEffect} from "react";
import "./AdminView.css";


function AdminView({requests,updateRequests}) {
  const [request, setRequest] = useState({
    first_name: "",
    last_name: "",
    email:"",
    tel_number: "",
    contact_preference: "",
    request: "",
    complete: "",
    user_id: "",
  });
  
    useEffect(() => {
      fetch("http://localhost:3000/api/users")
        .then(res => res.json())
        .then(json => {
          // upon success, update users
          console.log(json);
          setRequest(json);
        })
        .catch(error => {
          // upon failure, show error message
          console.log(error)
        });
    }, []);
  
    const handleComplete = (user) => {
      updateComplete(user);
    }

    const updateComplete = (user) =>  {
      fetch(`/api/users/${user.id}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
      })
      // Continue fetch request here
      .then(res => res.json())
      .then(json => {
        const old_requests = requests;
       requests = [...old_requests, json];
       updateRequests(json);
     })
      .catch(e => console.error(e))
    }


  return (
    <div className="container">
      <table className="table">
              <thead>
                  <tr>
                      <th>#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Mobile number</th>
                      <th scope="col">Contact preference</th>
                      <th scope="col">Request/Question</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
              {
                  requests.map((user, index)=>{
                      return(
                          <tr key={index}>
                            <th scope="row"> {index+1} </th>
                              <td>{user.first_name}</td>
                              <td>{user.last_name}</td>
                              <td>{user.email}</td>
                              <td>{user.tel_number}</td>
                              <td>{user.contact_preference}</td>
                              <td>{user.request}</td>
                              <td>{user.complete===0 ? 'Incomplete' : 'Complete'}</td>
                              <td><button onClick={(e)=> handleComplete(user)}> Complete </button></td>
                          </tr>
                      )
                  })
              }
              </tbody>
          </table>
    </div>
  );
}



export default AdminView;
