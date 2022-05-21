import React, { useState } from "react";
import "./AdminView.css";

function AdminView(props) {
  const [project, setProject] = useState({
    url: "",
    title: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setProject((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form button clicked!");
    // pass data back up to parent using props.addProject();
    // don't forget to accept the props in the arguments of the function AdminView
    props.addProject(project);
    setProject({
      url: "",
      title: "",
      description: "",
    })
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label> Project Title</label>
              <input
              name="title"
              value={project.title}
              onChange={handleInputChange}
              className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label> Image URL </label>
              <input
              name="url"
              value={project.url}
              onChange={handleInputChange}
              className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label> Project Description </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}



export default AdminView;
