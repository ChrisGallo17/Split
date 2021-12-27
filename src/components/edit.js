import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function Edit(props) {
  const [personName, setPersonName] = useState('');
  const [personPosition, setPersonPosition] = useState('');
  const [personLevel, setPersonLevel] = useState('');
  const { id } = useParams()

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    axios
      .get("http://localhost:5000/record/" + id)
      .then((response) => {
        setPersonName(response.data.person_name);
        setPersonPosition(response.data.person_position);
        setPersonLevel(response.data.person_level);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
 
  // This function will handle the submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEditedperson = {
      person_name: personName,
      person_position: personPosition,
      person_level: personLevel,
    };
    console.log(newEditedperson);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + id,
        newEditedperson
      )
      .then((res) => console.log(res.data));
 
    // props.history.push("/");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            // value={this.state.person_name}
            value={personName}
            onChange={e => setPersonName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
          <input
            type="text"
            className="form-control"
            // value={this.state.person_position}
            value={personPosition}
            onChange={e => setPersonPosition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={personLevel === "Intern"}
              onChange={e => setPersonLevel(e.target.value)}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={personLevel === "Junior"}
              onChange={e => setPersonLevel(e.target.value)}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={personLevel === "Senior"}
              onChange={e => setPersonLevel(e.target.value)}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.