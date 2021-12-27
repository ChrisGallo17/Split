import React, { useState } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Add } from '@material-ui/icons';
import { TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button } from "@material-ui/core";
 
function Create(props) {
  const [personName, setPersonName] = useState('');
  const [personPosition, setPersonPosition] = useState('');
  const [personLevel, setPersonLevel] = useState('');

  const handleChange = (position) => {
    if (position === "Intern") {
      console.log(position)
      setPersonLevel("Intern")
    } else if (position === "Junior") {
      console.log(position)
      setPersonLevel("Junior")
    } else {
      console.log(position)
      setPersonLevel("Senior")
    }
  };
 
	// This function will handle the submission.
	const handleSubmit = (e) => {
    e.preventDefault();
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: personName,
      person_position: personPosition,
      person_level: personLevel,
    };
		console.log(newperson);
 
    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
		setPersonName("");
		setPersonPosition("");
		setPersonLevel("");
  }
 
  // This following section will display the form that takes the input from the user.
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              style={{color: "white", marginBottom: 15}}
              label="Name of the person:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              value={personName}
              onChange={e => setPersonName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              style={{color: "white", marginBottom: 15}}
              label="Person's position:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              value={personPosition}
              onChange={e => setPersonPosition(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Position</FormLabel>
              <RadioGroup onChange={ e => handleChange(e.target.value)} defaultValue="Intern" aria-label="position" name="customized-radios">
                <FormControlLabel value="Intern" control={<Radio />} label="Intern" />
                <FormControlLabel value="Junior" control={<Radio />} label="Junior" />
                <FormControlLabel value="Senior" control={<Radio />} label="Senior" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="form-group">
            <Button 
              style={{marginTop: '15px'}}
              variant="contained" 
              type="submit"
              value="Create person"
              className="btn btn-primary"
              startIcon={<Add />}>
              Create Person
            </Button>
          </div>
        </form>
      </div>
    );
}

export default Create;