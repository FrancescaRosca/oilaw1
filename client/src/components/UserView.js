import React, {useState} from "react";
import "./UserView.css";

function UserView({projects}) {
    const [featured, setFeatured] = useState({
      url: "https://cdn.pixabay.com/photo/2022/01/07/07/13/chicago-6921297_960_720.jpg",
      title: "Chicago",
      description: "First city I visited first abroad",
    })

    const handleClick = project => {
      setFeatured(project);
    }

    return (
    <div>
      <div id= "featured" >
        <div className="row"> 
          <div className="col-4">
            <img src={featured.url} width="200" height="200" className="img"/>
          </div>
          <div className= "col-8">
            <h3> {featured.title} </h3>
            <p> {featured.description} </p>
          </div>
        </div>
      </div>
      <div className="container"> 
        <div className="row" >
          {
              projects.map((project, index) => {
                return <div id={index} className = "col-lg-3" > 
                  <img onClick = {() => handleClick(project)} src= {project.url} className = "img img-responsive" width="200" height="200" />
                </div>
              })
          }
        </div>
      </div>
    </div>
  );
}

export default UserView;

//https://picsum.photos/200/300