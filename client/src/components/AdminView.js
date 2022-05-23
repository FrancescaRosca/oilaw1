import React, {useState, useEffect} from "react";
import "./AdminView.css";

function AdminView({requests}) {
  const [request, setRequest] = useState({
    first_name: "",
    last_name: "",
    email:"",
    tel_number: "",
    contact_preference: "",
    request: "",
    complete: "",
  });
  
    useEffect(() => {
      fetch("http://localhost:5000/api/users")
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
  
    // const handleComplete = (id) =>  


  return (
    <table className="container">
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Mobile number</th>
                    <th>Contact preference</th>
                    <th>Request/Question</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {
                requests.map((user, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.tel_number}</td>
                            <td>{user.contact_preference}</td>
                            <td>{user.request}</td>
                            <td>{user.complete}</td>
                            <button> Complete </button>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
  );
}



export default AdminView;
