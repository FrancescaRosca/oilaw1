import React, { useState , useEffect} from "react";
import AdminView from "./components/AdminView";
import UserView from "./components/UserView";



function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [requests, setRequests] = useState([]);

  const handleAddRequest = (newRequest) => {
    setRequests((state) => [...state, newRequest]);
  };

  const handleChangeView = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

 const updateRequests= (results) =>{
   setRequests(results)
 };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(json => {
        // upon success, update users
        console.log(json);
        setRequests(json);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error)
      });
  }, []);

  return (
    <div className="container">
      <button className={`btn ${isAdmin ? 'btn-outline-danger' : ''}`} onClick={() => handleChangeView(true)}>ATTORNEY</button>
      <button className={`btn ${!isAdmin ? 'btn-outline-danger' : ''}`} onClick={() => handleChangeView(false)}>CLIENT</button>

      {
        isAdmin ? <AdminView requests= {requests} updateRequests={updateRequests} /> : <UserView addRequest={(newRequest) => handleAddRequest(newRequest)} />
        
      }

    </div>
  );
}

export default App;

